import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GamesService } from './games.service';

@Controller()
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @MessagePattern('games.get-available')
  async getAvailableGames(@Payload() data: { filters?: any }) {
    return this.gamesService.getAvailableGames(data.filters);
  }

  @MessagePattern('games.create')
  async createGame(@Payload() data: { userId: string; gameData: any }) {
    return this.gamesService.createGame(data.userId, data.gameData);
  }

  @MessagePattern('games.join')
  async joinGame(@Payload() data: { gameId: string; userId: string }) {
    return this.gamesService.joinGame(data.gameId, data.userId);
  }

  @MessagePattern('games.leave')
  async leaveGame(@Payload() data: { gameId: string; userId: string }) {
    return this.gamesService.leaveGame(data.gameId, data.userId);
  }

  @MessagePattern('games.get-participants')
  async getGameParticipants(@Payload() data: { gameId: string }) {
    return this.gamesService.getGameParticipants(data.gameId);
  }

  @MessagePattern('games.update-status')
  async updateGameStatus(@Payload() data: { gameId: string; status: string }) {
    return this.gamesService.updateGameStatus(data.gameId, data.status);
  }

  @MessagePattern('games.get-details')
  async getGameDetails(@Payload() data: { gameId: string }) {
    return this.gamesService.getGameDetails(data.gameId);
  }

  @MessagePattern('games.create-from-booking')
  async createFromBooking(
    @Payload()
    data: {
      userId: string;
      bookingId: string;
      isPublic?: boolean;
      maxPlayers?: number;
    },
  ) {
    return this.gamesService.createGameFromBooking(
      data.userId,
      data.bookingId,
      data.isPublic,
      data.maxPlayers,
    );
  }

  @MessagePattern('games.sync-from-booking-invites')
  async syncFromBookingInvites(
    @Payload() data: { userId: string; bookingId: string },
  ) {
    return this.gamesService.syncInvitesFromBooking(
      data.userId,
      data.bookingId,
    );
  }
}
