import { NextRequest, NextResponse } from 'next/server';
import type { ApiResponse, ICalEvent } from '@blumsylt/shared';

// Helper to parse iCal data (simplified)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function parseICalData(icalData: string): ICalEvent[] {
  const events: ICalEvent[] = [];
  const lines = icalData.split('\n').map(line => line.trim());
  
  let currentEvent: Partial<ICalEvent> | null = null;
  
  for (const line of lines) {
    if (line === 'BEGIN:VEVENT') {
      currentEvent = {};
    } else if (line === 'END:VEVENT' && currentEvent) {
      if (currentEvent.uid && currentEvent.start && currentEvent.end) {
        events.push(currentEvent as ICalEvent);
      }
      currentEvent = null;
    } else if (currentEvent) {
      if (line.startsWith('UID:')) {
        currentEvent.uid = line.substring(4);
      } else if (line.startsWith('DTSTART')) {
        const dateStr = line.split(':')[1];
        currentEvent.start = parseICalDate(dateStr);
      } else if (line.startsWith('DTEND')) {
        const dateStr = line.split(':')[1];
        currentEvent.end = parseICalDate(dateStr);
      } else if (line.startsWith('SUMMARY:')) {
        currentEvent.summary = line.substring(8);
      } else if (line.startsWith('DESCRIPTION:')) {
        currentEvent.description = line.substring(12);
      }
    }
  }
  
  return events;
}

function parseICalDate(dateStr: string): Date {
  // Handle basic iCal date format: YYYYMMDD or YYYYMMDDTHHMMSSZ
  if (dateStr.length === 8) {
    const year = parseInt(dateStr.substring(0, 4));
    const month = parseInt(dateStr.substring(4, 6)) - 1;
    const day = parseInt(dateStr.substring(6, 8));
    return new Date(year, month, day);
  }
  
  // Extended format
  const year = parseInt(dateStr.substring(0, 4));
  const month = parseInt(dateStr.substring(4, 6)) - 1;
  const day = parseInt(dateStr.substring(6, 8));
  const hour = parseInt(dateStr.substring(9, 11)) || 0;
  const minute = parseInt(dateStr.substring(11, 13)) || 0;
  const second = parseInt(dateStr.substring(13, 15)) || 0;
  
  return new Date(Date.UTC(year, month, day, hour, minute, second));
}

function generateICalFeed(propertyId: string, events: ICalEvent[]): string {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Blum Sylt Hotels//Booking Calendar//DE',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:Blum Sylt Hotels - ${propertyId}`,
  ];

  for (const event of events) {
    const dtstart = formatICalDate(event.start);
    const dtend = formatICalDate(event.end);
    
    lines.push(
      'BEGIN:VEVENT',
      `UID:${event.uid}`,
      `DTSTART;VALUE=DATE:${dtstart}`,
      `DTEND;VALUE=DATE:${dtend}`,
      `SUMMARY:${event.summary}`,
      event.description ? `DESCRIPTION:${event.description}` : '',
      'END:VEVENT'
    );
  }

  lines.push('END:VCALENDAR');
  
  return lines.filter(Boolean).join('\r\n');
}

function formatICalDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
}

// Mock blocked dates as iCal events
const mockBookings: Record<string, ICalEvent[]> = {
  'property-1': [
    {
      uid: 'booking-1@blumsylthotels.de',
      start: new Date('2024-12-25'),
      end: new Date('2024-12-27'),
      summary: 'Reserviert',
    },
    {
      uid: 'booking-2@blumsylthotels.de',
      start: new Date('2024-12-31'),
      end: new Date('2025-01-02'),
      summary: 'Reserviert',
    },
  ],
  'property-2': [
    {
      uid: 'booking-3@blumsylthotels.de',
      start: new Date('2024-12-24'),
      end: new Date('2024-12-26'),
      summary: 'Reserviert',
    },
  ],
};

// GET: Export iCal feed for a property
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const propertyId = searchParams.get('propertyId');
  
  if (!propertyId) {
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Missing propertyId parameter',
    }, { status: 400 });
  }

  const events = mockBookings[propertyId] || [];
  const icalContent = generateICalFeed(propertyId, events);

  return new NextResponse(icalContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="${propertyId}-calendar.ics"`,
    },
  });
}

// POST: Import iCal feed from external source
export async function POST(request: NextRequest) {
  try {
    const { propertyId, icalUrl } = await request.json();
    
    if (!propertyId || !icalUrl) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Missing propertyId or icalUrl',
      }, { status: 400 });
    }

    // In production, we would fetch and parse the external iCal feed
    // For now, we'll simulate this
    
    // Simulated response
    return NextResponse.json<ApiResponse<{ imported: number; message: string }>>({
      success: true,
      data: {
        imported: 0,
        message: 'iCal sync configured. Events will be imported on next sync cycle.',
      },
    });

  } catch (error) {
    console.error('iCal import error:', error);
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Failed to process iCal import',
    }, { status: 500 });
  }
}
