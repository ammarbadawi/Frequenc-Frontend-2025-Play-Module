import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { VenuesService } from './venues.service';

@Controller()
export class VenuesController {
  constructor(private readonly venuesService: VenuesService) {}

  @MessagePattern('venues.get-all')
  async getAllVenues(@Payload() data: { filters?: any; page?: number; limit?: number }) {
    return this.venuesService.getAllVenues(data.filters, data.page, data.limit);
  }

  @MessagePattern('venues.get-by-id')
  async getVenueById(@Payload() data: { id: string }) {
    return this.venuesService.getVenueById(data.id);
  }

  @MessagePattern('venues.search')
  async searchVenues(@Payload() data: { query: string; filters?: any }) {
    return this.venuesService.searchVenues(data.query, data.filters);
  }

  @MessagePattern('venues.get-availability')
  async getAvailability(@Payload() data: { venueId: string; date: string; courtId?: string }) {
    return this.venuesService.getAvailability(data.venueId, data.date, data.courtId);
  }

  @MessagePattern('venues.get-courts')
  async getVenueCourts(@Payload() data: { venueId: string }) {
    return this.venuesService.getVenueCourts(data.venueId);
  }

  @MessagePattern('venues.get-reviews')
  async getVenueReviews(@Payload() data: { venueId: string; page?: number; limit?: number }) {
    return this.venuesService.getVenueReviews(data.venueId, data.page, data.limit);
  }

  @MessagePattern('venues.add-review')
  async addVenueReview(@Payload() data: { venueId: string; userId: string; reviewData: any }) {
    return this.venuesService.addVenueReview(data.venueId, data.userId, data.reviewData);
  }

  @MessagePattern('venues.upload-image')
  async uploadVenueImage(@Payload() data: { venueId: string; imageFile: any }) {
    return this.venuesService.uploadVenueImage(data.venueId, data.imageFile);
  }
} 