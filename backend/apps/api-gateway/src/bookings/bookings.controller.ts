import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import {
  CreateBookingDto,
  UpdateBookingDto,
  BookingDto,
} from '@frequenc/shared';

@ApiTags('Bookings')
@Controller('bookings')
export class BookingsController {
  constructor(
    @Inject('BOOKINGS_SERVICE') private readonly bookingsService: ClientProxy,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user bookings' })
  @ApiResponse({
    status: 200,
    description: 'Bookings retrieved successfully',
    type: [BookingDto],
  })
  async getUserBookings(
    @Request() req,
    @Query() query: { page?: number; limit?: number; status?: string },
  ) {
    return firstValueFrom(
      this.bookingsService.send('bookings.get-user-bookings', {
        userId: req.user.id,
        ...query,
      }),
    );
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create booking' })
  @ApiResponse({
    status: 201,
    description: 'Booking created successfully',
    type: BookingDto,
  })
  async createBooking(
    @Request() req,
    @Body() createBookingDto: CreateBookingDto,
  ) {
    return firstValueFrom(
      this.bookingsService.send('bookings.create', {
        userId: req.user.id,
        ...createBookingDto,
      }),
    );
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update booking' })
  @ApiResponse({
    status: 200,
    description: 'Booking updated successfully',
    type: BookingDto,
  })
  async updateBooking(
    @Request() req,
    @Param('id') id: string,
    @Body() updateBookingDto: UpdateBookingDto,
  ) {
    return firstValueFrom(
      this.bookingsService.send('bookings.update', {
        id,
        userId: req.user.id,
        ...updateBookingDto,
      }),
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cancel booking' })
  @ApiResponse({ status: 200, description: 'Booking cancelled successfully' })
  async cancelBooking(@Request() req, @Param('id') id: string) {
    return firstValueFrom(
      this.bookingsService.send('bookings.cancel', { id, userId: req.user.id }),
    );
  }

  @Get('time-slots')
  @ApiOperation({ summary: 'Get available time slots' })
  @ApiResponse({
    status: 200,
    description: 'Time slots retrieved successfully',
  })
  async getTimeSlots(
    @Query() query: { venueId: string; courtId: string; date: string },
  ) {
    return firstValueFrom(
      this.bookingsService.send('bookings.get-time-slots', query),
    );
  }

  @Post('check-availability')
  @ApiOperation({ summary: 'Check booking availability' })
  @ApiResponse({
    status: 200,
    description: 'Availability checked successfully',
  })
  async checkAvailability(
    @Body()
    availabilityDto: {
      venueId: string;
      courtId: string;
      date: string;
      timeSlot: string;
    },
  ) {
    return firstValueFrom(
      this.bookingsService.send('bookings.check-availability', availabilityDto),
    );
  }

  @Post(':id/confirm')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Confirm booking' })
  @ApiResponse({ status: 200, description: 'Booking confirmed successfully' })
  async confirmBooking(@Request() req, @Param('id') id: string) {
    return firstValueFrom(
      this.bookingsService.send('bookings.confirm', {
        id,
        userId: req.user.id,
      }),
    );
  }

  @Post(':id/invites')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add invited players to a booking' })
  @ApiResponse({ status: 200, description: 'Invites added successfully' })
  async addInvites(
    @Request() req,
    @Param('id') id: string,
    @Body() body: { playerIds: string[] },
  ) {
    return firstValueFrom(
      this.bookingsService.send('bookings.add-invites', {
        bookingId: id,
        userId: req.user.id,
        playerIds: body.playerIds || [],
      }),
    );
  }
}
