import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsNumber, IsOptional, IsDateString, IsArray } from 'class-validator';

export enum GameStatus {
  OPEN = 'OPEN',
  FULL = 'FULL',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export enum PlayerRole {
  ORGANIZER = 'ORGANIZER',
  PLAYER = 'PLAYER',
  SPECTATOR = 'SPECTATOR'
}

export class CreateGameDto {
  @ApiProperty()
  @IsString()
  venueId: string;

  @ApiProperty()
  @IsString()
  courtId: string;

  @ApiProperty()
  @IsDateString()
  date: string;

  @ApiProperty()
  @IsString()
  startTime: string;

  @ApiProperty()
  @IsString()
  endTime: string;

  @ApiProperty()
  @IsEnum(['TENNIS', 'BASKETBALL', 'SOCCER', 'VOLLEYBALL', 'BADMINTON'])
  sportType: string;

  @ApiProperty()
  @IsEnum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'PROFESSIONAL'])
  skillLevel: string;

  @ApiProperty()
  @IsNumber()
  maxPlayers: number;

  @ApiProperty()
  @IsEnum(['SINGLES', 'DOUBLES', 'TEAM'])
  gameType: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  players?: string[];
}

export class GameDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  venueId: string;

  @ApiProperty()
  courtId: string;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  startTime: string;

  @ApiProperty()
  endTime: string;

  @ApiProperty()
  sportType: string;

  @ApiProperty()
  skillLevel: string;

  @ApiProperty()
  maxPlayers: number;

  @ApiProperty()
  gameType: string;

  @ApiProperty()
  status: GameStatus;

  @ApiProperty()
  createdBy: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class GameParticipantDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  gameId: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  role: PlayerRole;

  @ApiProperty()
  joinedAt: Date;

  @ApiProperty()
  user?: any;
} 