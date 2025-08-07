import { Controller, Get, Post, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@ApiTags('Games')
@Controller('games')
export class GamesController {
  constructor(
    @Inject('GAMES_SERVICE') private readonly gamesService: ClientProxy,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get available games' })
  @ApiResponse({ status: 200, description: 'Games retrieved successfully' })
  async getAvailableGames(): Promise<any> {
    return firstValueFrom(
      this.gamesService.send('games.get-available', {}),
    );
  }

  @Post()
  @ApiOperation({ summary: 'Create new game' })
  @ApiResponse({ status: 201, description: 'Game created successfully' })
  @ApiBearerAuth()
  async createGame(@Req() req: any, @Body() gameData: any): Promise<any> {
    return firstValueFrom(
      this.gamesService.send('games.create', { 
        userId: req.user.id,
        ...gameData 
      }),
    );
  }

  @Post(':id/join')
  @ApiOperation({ summary: 'Join a game' })
  @ApiResponse({ status: 200, description: 'Joined game successfully' })
  @ApiBearerAuth()
  async joinGame(@Param('id') id: string, @Req() req: any): Promise<any> {
    return firstValueFrom(
      this.gamesService.send('games.join', { 
        gameId: id,
        userId: req.user.id 
      }),
    );
  }

  @Delete(':id/leave')
  @ApiOperation({ summary: 'Leave a game' })
  @ApiResponse({ status: 200, description: 'Left game successfully' })
  @ApiBearerAuth()
  async leaveGame(@Param('id') id: string, @Req() req: any): Promise<any> {
    return firstValueFrom(
      this.gamesService.send('games.leave', { 
        gameId: id,
        userId: req.user.id 
      }),
    );
  }

  @Get(':id/participants')
  @ApiOperation({ summary: 'Get game participants' })
  @ApiResponse({ status: 200, description: 'Participants retrieved successfully' })
  async getGameParticipants(@Param('id') id: string): Promise<any> {
    return firstValueFrom(
      this.gamesService.send('games.get-participants', { gameId: id }),
    );
  }
} 