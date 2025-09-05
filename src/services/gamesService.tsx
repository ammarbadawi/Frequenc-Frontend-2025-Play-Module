// @ts-nocheck
import api from './api';

class GamesService {
  // Get available games
  async getAvailableGames(filters = {}) {
    try {
      const response = await api.get('/games', { params: filters });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch games');
    }
  }

  // Create a new game
  async createGame(gameData) {
    try {
      const response = await api.post('/games', gameData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create game');
    }
  }

  // Create game from an existing booking
  async createGameFromBooking(bookingId, payload = {}) {
    try {
      const response = await api.post(`/games/from-booking/${bookingId}`, payload);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create game from booking');
    }
  }

  // Join a game
  async joinGame(gameId) {
    try {
      const response = await api.post(`/games/${gameId}/join`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to join game');
    }
  }

  // Leave a game
  async leaveGame(gameId) {
    try {
      const response = await api.delete(`/games/${gameId}/leave`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to leave game');
    }
  }

  // Get game participants
  async getGameParticipants(gameId) {
    try {
      const response = await api.get(`/games/${gameId}/participants`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch participants');
    }
  }

  // Get game details
  async getGameDetails(gameId) {
    try {
      const response = await api.get(`/games/${gameId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch game details');
    }
  }

  // Update game status
  async updateGameStatus(gameId, status) {
    try {
      const response = await api.put(`/games/${gameId}/status`, { status });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update game status');
    }
  }
}

export default new GamesService(); 