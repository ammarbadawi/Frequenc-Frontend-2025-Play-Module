import api from './api';

class UsersService {
  // Get user profile
  async getProfile() {
    try {
      const response = await api.get('/users/profile');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch profile');
    }
  }

  // Update user profile
  async updateProfile(profileData) {
    try {
      const response = await api.put('/users/profile', profileData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update profile');
    }
  }

  // Get user friends
  async getFriends() {
    try {
      const response = await api.get('/users/friends');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch friends');
    }
  }

  // Search users
  async searchUsers(query, filters = {}) {
    try {
      const response = await api.get('/users/search', { 
        params: { query, ...filters } 
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to search users');
    }
  }

  // Add friend
  async addFriend(friendId) {
    try {
      const response = await api.post('/users/friends', { friendId });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to add friend');
    }
  }

  // Remove friend
  async removeFriend(friendId) {
    try {
      const response = await api.delete(`/users/friends/${friendId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to remove friend');
    }
  }

  // Get user favorites
  async getFavorites() {
    try {
      const response = await api.get('/users/favorites');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch favorites');
    }
  }

  // Add to favorites
  async addToFavorites(venueId) {
    try {
      const response = await api.post('/users/favorites', { venueId });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to add to favorites');
    }
  }

  // Remove from favorites
  async removeFromFavorites(venueId) {
    try {
      const response = await api.delete(`/users/favorites/${venueId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to remove from favorites');
    }
  }

  // Get user stats
  async getUserStats() {
    try {
      const response = await api.get('/users/stats');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user stats');
    }
  }

  // Get user achievements
  async getUserAchievements() {
    try {
      const response = await api.get('/users/achievements');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch achievements');
    }
  }
}

export default new UsersService(); 