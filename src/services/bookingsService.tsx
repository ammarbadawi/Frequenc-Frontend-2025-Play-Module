// @ts-nocheck
import api from './api';

class BookingsService {
  // Get user bookings
  async getUserBookings(page = 1, limit = 10) {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString()
      });

      const response = await api.get(`/bookings?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch bookings');
    }
  }

  // Create new booking
  async createBooking(bookingData) {
    try {
      const response = await api.post('/bookings', bookingData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create booking');
    }
  }

  // Update booking
  async updateBooking(bookingId, updateData) {
    try {
      const response = await api.put(`/bookings/${bookingId}`, updateData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update booking');
    }
  }

  // Cancel booking
  async cancelBooking(bookingId) {
    try {
      const response = await api.delete(`/bookings/${bookingId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to cancel booking');
    }
  }

  // Get time slots for a court
  async getTimeSlots(courtId, date) {
    try {
      const params = new URLSearchParams({ date });
      const response = await api.get(`/bookings/${courtId}/time-slots?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch time slots');
    }
  }

  // Check availability
  async checkAvailability(courtId, date, startTime, endTime) {
    try {
      const response = await api.post('/bookings/check-availability', {
        courtId,
        date,
        startTime,
        endTime
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to check availability');
    }
  }

  // Confirm booking
  async confirmBooking(bookingId) {
    try {
      const response = await api.post(`/bookings/${bookingId}/confirm`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to confirm booking');
    }
  }
}

export default new BookingsService(); 