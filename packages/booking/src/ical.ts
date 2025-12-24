import type { ICalEvent, ICalSync, BookingSource } from '@sylt/types';

/**
 * iCal Service for calendar synchronization
 * Supports Booking.com, Airbnb, and other iCal sources
 */
export class ICalService {
  /**
   * Parse iCal format string into events
   */
  parseICalString(icalString: string): ICalEvent[] {
    const events: ICalEvent[] = [];
    const lines = icalString.split(/\r?\n/);

    let currentEvent: Partial<ICalEvent> | null = null;

    for (const line of lines) {
      if (line === 'BEGIN:VEVENT') {
        currentEvent = {};
      } else if (line === 'END:VEVENT' && currentEvent) {
        if (currentEvent.uid && currentEvent.dtstart && currentEvent.dtend) {
          events.push(currentEvent as ICalEvent);
        }
        currentEvent = null;
      } else if (currentEvent) {
        const [key, ...valueParts] = line.split(':');
        const value = valueParts.join(':');

        switch (key.split(';')[0]) {
          case 'UID':
            currentEvent.uid = value;
            break;
          case 'SUMMARY':
            currentEvent.summary = value;
            break;
          case 'DTSTART':
            currentEvent.dtstart = this.parseICalDate(value);
            break;
          case 'DTEND':
            currentEvent.dtend = this.parseICalDate(value);
            break;
          case 'DESCRIPTION':
            currentEvent.description = value;
            break;
        }
      }
    }

    return events;
  }

  /**
   * Parse iCal date format
   */
  private parseICalDate(dateString: string): Date {
    // Handle both formats: 20241225 and 20241225T120000Z
    if (dateString.length === 8) {
      const year = parseInt(dateString.substring(0, 4), 10);
      const month = parseInt(dateString.substring(4, 6), 10) - 1;
      const day = parseInt(dateString.substring(6, 8), 10);
      return new Date(year, month, day);
    }

    // Full datetime format
    const year = parseInt(dateString.substring(0, 4), 10);
    const month = parseInt(dateString.substring(4, 6), 10) - 1;
    const day = parseInt(dateString.substring(6, 8), 10);
    const hour = parseInt(dateString.substring(9, 11), 10) || 0;
    const minute = parseInt(dateString.substring(11, 13), 10) || 0;
    const second = parseInt(dateString.substring(13, 15), 10) || 0;

    if (dateString.endsWith('Z')) {
      return new Date(Date.UTC(year, month, day, hour, minute, second));
    }

    return new Date(year, month, day, hour, minute, second);
  }

  /**
   * Generate iCal string from events
   */
  generateICalString(events: ICalEvent[], calendarName: string = 'Sylt Bookings'): string {
    const lines: string[] = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//BLUM Sylt Hotels//Booking Calendar//DE',
      `X-WR-CALNAME:${calendarName}`,
    ];

    for (const event of events) {
      lines.push(
        'BEGIN:VEVENT',
        `UID:${event.uid}`,
        `DTSTART:${this.formatICalDate(event.dtstart)}`,
        `DTEND:${this.formatICalDate(event.dtend)}`,
        `SUMMARY:${event.summary}`,
      );

      if (event.description) {
        lines.push(`DESCRIPTION:${event.description}`);
      }

      lines.push('END:VEVENT');
    }

    lines.push('END:VCALENDAR');
    return lines.join('\r\n');
  }

  /**
   * Format date to iCal format
   */
  private formatICalDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  }

  /**
   * Detect booking source from iCal content
   */
  detectBookingSource(icalString: string): BookingSource {
    if (icalString.includes('booking.com') || icalString.includes('Booking.com')) {
      return 'booking.com';
    }
    if (icalString.includes('airbnb.com') || icalString.includes('Airbnb')) {
      return 'airbnb';
    }
    if (icalString.includes('expedia.com') || icalString.includes('Expedia')) {
      return 'expedia';
    }
    return 'direct';
  }

  /**
   * Create sync configuration
   */
  createSyncConfig(
    propertyId: string,
    roomId: string,
    source: BookingSource,
    icalUrl: string
  ): ICalSync {
    return {
      propertyId,
      roomId,
      source,
      icalUrl,
      lastSync: new Date(),
      events: [],
    };
  }

  /**
   * Get blocked dates from events
   */
  getBlockedDates(events: ICalEvent[]): Date[] {
    const blockedDates: Date[] = [];

    for (const event of events) {
      const current = new Date(event.dtstart);
      const end = new Date(event.dtend);

      while (current < end) {
        blockedDates.push(new Date(current));
        current.setDate(current.getDate() + 1);
      }
    }

    return blockedDates;
  }
}
