import api from './api';

class VenuesService {
  // Get all venues with filters
  async getVenues(filters = {}) {
    try {
      const params = new URLSearchParams();
      
      if (filters.sport) params.append('sport', filters.sport);
      if (filters.location) params.append('location', filters.location);
      if (filters.rating) params.append('rating', filters.rating);
      if (filters.page) params.append('page', filters.page);
      if (filters.limit) params.append('limit', filters.limit);

      const response = await api.get(`/venues?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch venues');
    }
  }

  // Get venue by ID
  async getVenue(id) {
    try {
      const response = await api.get(`/venues/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch venue');
    }
  }

  // Search venues
  async searchVenues(query, filters = {}) {
    try {
      const params = new URLSearchParams({ q: query });
      
      if (filters.lat) params.append('lat', filters.lat);
      if (filters.lng) params.append('lng', filters.lng);
      if (filters.radius) params.append('radius', filters.radius);
      if (filters.sport) params.append('sport', filters.sport);

      const response = await api.get(`/venues/search?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to search venues');
    }
  }

  // Get venue availability
  async getAvailability(venueId, date, courtId = null) {
    try {
      const params = new URLSearchParams({ date });
      if (courtId) params.append('courtId', courtId);

      const response = await api.get(`/venues/${venueId}/availability?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get availability');
    }
  }

  // Get venue courts
  async getVenueCourts(venueId) {
    try {
      const response = await api.get(`/venues/${venueId}/courts`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch courts');
    }
  }

  // Get venue reviews
  async getVenueReviews(venueId, page = 1, limit = 10) {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString()
      });

      const response = await api.get(`/venues/${venueId}/reviews?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch reviews');
    }
  }

  // Add venue review
  async addVenueReview(venueId, reviewData) {
    try {
      const response = await api.post(`/venues/${venueId}/reviews`, reviewData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to add review');
    }
  }

  // Upload venue image
  async uploadVenueImage(venueId, imageFile) {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);

      const response = await api.post(`/venues/${venueId}/upload-image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to upload image');
    }
  }
}

export default new VenuesService(); 