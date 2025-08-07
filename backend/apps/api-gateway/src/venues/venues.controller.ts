import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CreateVenueDto, UpdateVenueDto, VenueDto, CreateCourtDto, CourtDto } from '@frequenc/shared';

@ApiTags('Venues')
@Controller('venues')
export class VenuesController {
  constructor(
    @Inject('VENUES_SERVICE') private readonly venuesService: ClientProxy,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all venues' })
  @ApiResponse({ status: 200, description: 'Venues retrieved successfully', type: [VenueDto] })
  async getAllVenues(@Query() query: { page?: number; limit?: number; sportType?: string }) {
    return firstValueFrom(
      this.venuesService.send('venues.get-all', query)
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get venue by ID' })
  @ApiResponse({ status: 200, description: 'Venue retrieved successfully', type: VenueDto })
  async getVenue(@Param('id') id: string) {
    return firstValueFrom(
      this.venuesService.send('venues.get-by-id', { id })
    );
  }

  @Get('search')
  @ApiOperation({ summary: 'Search venues' })
  @ApiResponse({ status: 200, description: 'Venues found successfully', type: [VenueDto] })
  async searchVenues(@Query() searchDto: { query: string; location?: string; sportType?: string }) {
    return firstValueFrom(
      this.venuesService.send('venues.search', searchDto)
    );
  }

  @Get(':id/courts')
  @ApiOperation({ summary: 'Get venue courts' })
  @ApiResponse({ status: 200, description: 'Courts retrieved successfully', type: [CourtDto] })
  async getVenueCourts(@Param('id') id: string) {
    return firstValueFrom(
      this.venuesService.send('venues.get-courts', { venueId: id })
    );
  }

  @Get(':id/availability')
  @ApiOperation({ summary: 'Get venue availability' })
  @ApiResponse({ status: 200, description: 'Availability retrieved successfully' })
  async getAvailability(@Param('id') id: string, @Query() query: { date: string; courtId?: string }) {
    return firstValueFrom(
      this.venuesService.send('venues.get-availability', { venueId: id, ...query })
    );
  }

  @Get(':id/reviews')
  @ApiOperation({ summary: 'Get venue reviews' })
  @ApiResponse({ status: 200, description: 'Reviews retrieved successfully' })
  async getVenueReviews(@Param('id') id: string, @Query() query: { page?: number; limit?: number }) {
    return firstValueFrom(
      this.venuesService.send('venues.get-reviews', { venueId: id, ...query })
    );
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create venue' })
  @ApiResponse({ status: 201, description: 'Venue created successfully', type: VenueDto })
  async createVenue(@Body() createVenueDto: CreateVenueDto) {
    return firstValueFrom(
      this.venuesService.send('venues.create', createVenueDto)
    );
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update venue' })
  @ApiResponse({ status: 200, description: 'Venue updated successfully', type: VenueDto })
  async updateVenue(@Param('id') id: string, @Body() updateVenueDto: UpdateVenueDto) {
    return firstValueFrom(
      this.venuesService.send('venues.update', { id, ...updateVenueDto })
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete venue' })
  @ApiResponse({ status: 200, description: 'Venue deleted successfully' })
  async deleteVenue(@Param('id') id: string) {
    return firstValueFrom(
      this.venuesService.send('venues.delete', { id })
    );
  }

  @Post(':id/courts')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add court to venue' })
  @ApiResponse({ status: 201, description: 'Court added successfully', type: CourtDto })
  async addCourt(@Param('id') venueId: string, @Body() createCourtDto: CreateCourtDto) {
    return firstValueFrom(
      this.venuesService.send('venues.add-court', { venueId, ...createCourtDto })
    );
  }

  @Post(':id/reviews')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add venue review' })
  @ApiResponse({ status: 201, description: 'Review added successfully' })
  async addVenueReview(@Param('id') venueId: string, @Body() reviewDto: { rating: number; comment: string }) {
    return firstValueFrom(
      this.venuesService.send('venues.add-review', { venueId, ...reviewDto })
    );
  }
} 