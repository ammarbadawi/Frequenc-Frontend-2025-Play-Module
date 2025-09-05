import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BookingsService } from './bookings.service';

@Controller()
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @MessagePattern('bookings.get-user-bookings')
  async getUserBookings(
    @Payload() data: { userId: string; page?: number; limit?: number },
  ) {
    return this.bookingsService.getUserBookings(
      data.userId,
      data.page,
      data.limit,
    );
  }

  @MessagePattern('bookings.create')
  async createBooking(@Payload() data: { userId: string; bookingData: any }) {
    return this.bookingsService.createBooking(data.userId, data.bookingData);
  }

  @MessagePattern('bookings.update')
  async updateBooking(@Payload() data: { bookingId: string; updateData: any }) {
    return this.bookingsService.updateBooking(data.bookingId, data.updateData);
  }

  @MessagePattern('bookings.cancel')
  async cancelBooking(@Payload() data: { bookingId: string }) {
    return this.bookingsService.cancelBooking(data.bookingId);
  }

  @MessagePattern('bookings.get-time-slots')
  async getTimeSlots(@Payload() data: { bookingId: string; date?: string }) {
    return this.bookingsService.getTimeSlots(data.bookingId, data.date);
  }

  @MessagePattern('bookings.check-availability')
  async checkAvailability(
    @Payload()
    data: {
      courtId: string;
      date: string;
      startTime: string;
      endTime: string;
    },
  ) {
    return this.bookingsService.checkAvailability(
      data.courtId,
      data.date,
      data.startTime,
      data.endTime,
    );
  }

  @MessagePattern('bookings.confirm')
  async confirmBooking(@Payload() data: { bookingId: string }) {
    return this.bookingsService.confirmBooking(data.bookingId);
  }

  @MessagePattern('bookings.add-invites')
  async addInvites(
    @Payload() data: { bookingId: string; playerIds: string[] },
  ) {
    return this.bookingsService.addInvites(data.bookingId, data.playerIds);
  }
}
