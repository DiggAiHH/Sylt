import type { Availability, AvailabilityCalendar, ICalEvent } from '@sylt/types';

/**
 * Availability Service for managing room availability
 */
export class AvailabilityService {
  /**
   * Generate availability calendar for a date range
   */
  generateAvailabilityCalendar(
    roomId: string,
    startDate: Date,
    endDate: Date,
    basePrice: number,
    blockedDates: Date[] = []
  ): AvailabilityCalendar {
    const availability: Availability[] = [];
    const current = new Date(startDate);

    while (current <= endDate) {
      const dateString = this.formatDate(current);
      const isBlocked = blockedDates.some(
        (d) => this.formatDate(d) === dateString
      );

      availability.push({
        roomId,
        date: dateString,
        available: !isBlocked,
        price: isBlocked ? undefined : this.calculateDynamicPrice(current, basePrice),
        minStay: this.getMinimumStay(current),
      });

      current.setDate(current.getDate() + 1);
    }

    return { roomId, availability };
  }

  /**
   * Calculate dynamic pricing based on date
   */
  private calculateDynamicPrice(date: Date, basePrice: number): number {
    const month = date.getMonth();
    const dayOfWeek = date.getDay();

    // High season (June-August): +30%
    // Shoulder season (April-May, September-October): +15%
    // Low season (November-March): base price
    let seasonMultiplier = 1;
    if (month >= 5 && month <= 7) {
      seasonMultiplier = 1.3;
    } else if ((month >= 3 && month <= 4) || (month >= 8 && month <= 9)) {
      seasonMultiplier = 1.15;
    }

    // Weekend premium (Friday & Saturday): +10%
    const weekendMultiplier = dayOfWeek === 5 || dayOfWeek === 6 ? 1.1 : 1;

    return Math.round(basePrice * seasonMultiplier * weekendMultiplier);
  }

  /**
   * Get minimum stay requirement based on date
   */
  private getMinimumStay(date: Date): number {
    const month = date.getMonth();
    const dayOfWeek = date.getDay();

    // High season: minimum 5 nights
    if (month >= 5 && month <= 7) {
      return 5;
    }

    // Weekend: minimum 2 nights
    if (dayOfWeek === 5 || dayOfWeek === 6) {
      return 2;
    }

    // Default: 1 night
    return 1;
  }

  /**
   * Check if dates are available
   */
  checkDatesAvailable(
    calendar: AvailabilityCalendar,
    checkIn: Date,
    checkOut: Date
  ): boolean {
    const checkInStr = this.formatDate(checkIn);
    const checkOutStr = this.formatDate(checkOut);

    // Find all dates in range
    const datesInRange = calendar.availability.filter((a) => {
      return a.date >= checkInStr && a.date < checkOutStr;
    });

    // All dates must be available
    return datesInRange.length > 0 && datesInRange.every((a) => a.available);
  }

  /**
   * Calculate total price for stay
   */
  calculateTotalPrice(
    calendar: AvailabilityCalendar,
    checkIn: Date,
    checkOut: Date
  ): number {
    const checkInStr = this.formatDate(checkIn);
    const checkOutStr = this.formatDate(checkOut);

    return calendar.availability
      .filter((a) => a.date >= checkInStr && a.date < checkOutStr && a.price)
      .reduce((sum, a) => sum + (a.price || 0), 0);
  }

  /**
   * Block dates from iCal events
   */
  blockDatesFromEvents(events: ICalEvent[]): Date[] {
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

  /**
   * Get available check-in dates
   */
  getAvailableCheckInDates(
    calendar: AvailabilityCalendar,
    minStay: number = 1
  ): string[] {
    const availableDates: string[] = [];

    for (let i = 0; i < calendar.availability.length - minStay; i++) {
      const startDate = calendar.availability[i];
      if (!startDate.available) continue;

      // Check if minimum stay is possible
      let canCheckIn = true;
      for (let j = 0; j < minStay; j++) {
        if (!calendar.availability[i + j]?.available) {
          canCheckIn = false;
          break;
        }
      }

      if (canCheckIn) {
        availableDates.push(startDate.date);
      }
    }

    return availableDates;
  }

  /**
   * Format date to ISO string (YYYY-MM-DD)
   */
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
