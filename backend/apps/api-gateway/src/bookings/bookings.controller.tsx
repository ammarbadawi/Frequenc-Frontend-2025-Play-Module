// @ts-nocheck
import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@ApiTags('Bookings')
@Controller('bookings')
export class BookingsController {
  constructor(
    @Inject('BOOKINGS_SERVICE') private readonly bookingsService: ClientProxy,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get user bookings' })
  @ApiResponse({ status: 200, description: 'Bookings retrieved successfully' })
  @ApiBearerAuth()
  async getUserBookings(@Req() req: any, @Query() query: any): Promise<any> {
    return firstValueFrom(
      this.bookingsService.send('bookings.get-user-bookings', { 
        userId: req.user.id,
        ...query 
      }),
    );
  }

  @Post()
  @ApiOperation({ summary: 'Create new booking' })
  @ApiResponse({ status: 201, description: 'Booking created successfully' })
  @ApiBearerAuth()
  async createBooking(@Req() req: any, @Body() bookingData: any): Promise<any> {
    return firstValueFrom(
      this.bookingsService.send('bookings.create', { 
        userId: req.user.id,
        ...bookingData 
      }),
    );
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update booking' })
  @ApiResponse({ status: 200, description: 'Booking updated successfully' })
  @ApiBearerAuth()
  async updateBooking(@Param('id') id: string, @Body() updateData: any): Promise<any> {
    return firstValueFrom(
      this.bookingsService.send('bookings.update', { 
        bookingId: id,
        ...updateData 
      }),
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Cancel booking' })
  @ApiResponse({ status: 200, description: 'Booking cancelled successfully' })
  @ApiBearerAuth()
  async cancelBooking(@Param('id') id: string): Promise<any> {
    return firstValueFrom(
      this.bookingsService.send('bookings.cancel', { bookingId: id }),
    );
  }

  @Get(':id/time-slots')
  @ApiOperation({ summary: 'Get time slots for booking' })
  @ApiResponse({ status: 200, description: 'Time slots retrieved successfully' })
  async getTimeSlots(@Param('id') id: string, @Query() query: any): Promise<any> {
    return firstValueFrom(
      this.bookingsService.send('bookings.get-time-slots', { 
        bookingId: id,
        ...query 
      }),
    );
  }

  @Post('check-availability')
  @ApiOperation({ summary: 'Check booking availability' })
  @ApiResponse({ status: 200, description: 'Availability checked successfully' })
  async checkAvailability(@Body() availabilityData: any): Promise<any> {
    return firstValueFrom(
      this.bookingsService.send('bookings.check-availability', availabilityData),
    );
  }
} 