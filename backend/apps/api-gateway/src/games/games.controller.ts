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
import { CreateGameDto, GameDto } from '@frequenc/shared';

@ApiTags('Games')
@Controller('games')
export class GamesController {
  constructor(
    @Inject('GAMES_SERVICE') private readonly gamesService: ClientProxy,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get available games' })
  @ApiResponse({
    status: 200,
    description: 'Games retrieved successfully',
    type: [GameDto],
  })
  async getAvailableGames(
    @Query() query: { venueId?: string; sportType?: string; date?: string },
  ) {
    return firstValueFrom(this.gamesService.send('games.get-available', query));
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create game' })
  @ApiResponse({
    status: 201,
    description: 'Game created successfully',
    type: GameDto,
  })
  async createGame(@Request() req, @Body() createGameDto: CreateGameDto) {
    return firstValueFrom(
      this.gamesService.send('games.create', {
        userId: req.user.id,
        ...createGameDto,
      }),
    );
  }

  @Post('from-booking/:bookingId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create game from a booking' })
  @ApiResponse({
    status: 201,
    description: 'Game created successfully',
    type: GameDto,
  })
  async createGameFromBooking(
    @Request() req,
    @Param('bookingId') bookingId: string,
    @Body() body: { isPublic?: boolean; maxPlayers?: number },
  ) {
    return firstValueFrom(
      this.gamesService.send('games.create-from-booking', {
        userId: req.user.id,
        bookingId,
        ...body,
      }),
    );
  }

  @Post('from-booking/:bookingId/sync-invites')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Sync invited booking players into existing game' })
  @ApiResponse({ status: 200, description: 'Invites synced successfully' })
  async syncInvitesFromBooking(
    @Request() req,
    @Param('bookingId') bookingId: string,
  ) {
    return firstValueFrom(
      this.gamesService.send('games.sync-from-booking-invites', {
        userId: req.user.id,
        bookingId,
      }),
    );
  }

  @Post(':id/join')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Join game' })
  @ApiResponse({ status: 200, description: 'Joined game successfully' })
  async joinGame(@Request() req, @Param('id') id: string) {
    return firstValueFrom(
      this.gamesService.send('games.join', { gameId: id, userId: req.user.id }),
    );
  }

  @Delete(':id/leave')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Leave game' })
  @ApiResponse({ status: 200, description: 'Left game successfully' })
  async leaveGame(@Request() req, @Param('id') id: string) {
    return firstValueFrom(
      this.gamesService.send('games.leave', {
        gameId: id,
        userId: req.user.id,
      }),
    );
  }

  @Get(':id/participants')
  @ApiOperation({ summary: 'Get game participants' })
  @ApiResponse({
    status: 200,
    description: 'Participants retrieved successfully',
  })
  async getGameParticipants(@Param('id') id: string) {
    return firstValueFrom(
      this.gamesService.send('games.get-participants', { gameId: id }),
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get game details' })
  @ApiResponse({
    status: 200,
    description: 'Game details retrieved successfully',
    type: GameDto,
  })
  async getGameDetails(@Param('id') id: string) {
    return firstValueFrom(
      this.gamesService.send('games.get-details', { gameId: id }),
    );
  }

  @Put(':id/status')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update game status' })
  @ApiResponse({ status: 200, description: 'Game status updated successfully' })
  async updateGameStatus(
    @Request() req,
    @Param('id') id: string,
    @Body() statusDto: { status: string },
  ) {
    return firstValueFrom(
      this.gamesService.send('games.update-status', {
        gameId: id,
        userId: req.user.id,
        ...statusDto,
      }),
    );
  }
}
