import { IsString, IsNumber, IsOptional, IsEnum, IsDateString, IsBoolean, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

export enum GameType {
  SINGLES = 'singles',
  DOUBLES = 'doubles',
  MIXED = 'mixed',
}

export class CreateBookingDto {
  @ApiProperty({ example: 'court-123' })
  @IsString()
  courtId: string;

  @ApiProperty({ example: '2024-02-15' })
  @IsDateString()
  date: string;

  @ApiProperty({ example: '14:00' })
  @IsString()
  startTime: string;

  @ApiProperty({ example: '16:00' })
  @IsString()
  endTime: string;

  @ApiProperty({ example: 2 })
  @IsNumber()
  duration: number;

  @ApiProperty({ enum: GameType })
  @IsEnum(GameType)
  gameType: GameType;

  @ApiProperty({ example: 'Tennis match with friends' })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiProperty({ example: ['player-1', 'player-2'] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  playerIds?: string[];

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  isPublic?: boolean;
}

export class UpdateBookingDto {
  @ApiProperty({ example: '2024-02-15' })
  @IsDateString()
  @IsOptional()
  date?: string;

  @ApiProperty({ example: '14:00' })
  @IsString()
  @IsOptional()
  startTime?: string;

  @ApiProperty({ example: '16:00' })
  @IsString()
  @IsOptional()
  endTime?: string;

  @ApiProperty({ example: 2 })
  @IsNumber()
  @IsOptional()
  duration?: number;

  @ApiProperty({ enum: GameType })
  @IsEnum(GameType)
  @IsOptional()
  gameType?: GameType;

  @ApiProperty({ example: 'Tennis match with friends' })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiProperty({ example: ['player-1', 'player-2'] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  playerIds?: string[];

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  isPublic?: boolean;
}

export class BookingDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ example: 'court-123' })
  courtId: string;

  @ApiProperty({ example: 'user-123' })
  userId: string;

  @ApiProperty({ example: '2024-02-15' })
  date: string;

  @ApiProperty({ example: '14:00' })
  startTime: string;

  @ApiProperty({ example: '16:00' })
  endTime: string;

  @ApiProperty({ example: 2 })
  duration: number;

  @ApiProperty({ example: 50.0 })
  totalPrice: number;

  @ApiProperty({ enum: BookingStatus })
  status: BookingStatus;

  @ApiProperty({ enum: GameType })
  gameType: GameType;

  @ApiProperty({ example: 'Tennis match with friends' })
  notes?: string;

  @ApiProperty({ example: ['player-1', 'player-2'] })
  playerIds?: string[];

  @ApiProperty({ example: true })
  isPublic: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  court: {
    id: string;
    name: string;
    sportType: string;
    surface: string;
    type: string;
    hourlyRate: number;
  };

  @ApiProperty()
  venue: {
    id: string;
    name: string;
    address: string;
  };

  @ApiProperty()
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export class TimeSlotDto {
  @ApiProperty({ example: '09:00' })
  time: string;

  @ApiProperty({ example: true })
  available: boolean;

  @ApiProperty({ example: 25.0 })
  price: number;

  @ApiProperty({ example: 'booking-123' })
  bookingId?: string;
}

export class AvailabilityDto {
  @ApiProperty({ example: '2024-02-15' })
  date: string;

  @ApiProperty({ example: 'court-123' })
  courtId: string;

  @ApiProperty({ type: [TimeSlotDto] })
  timeSlots: TimeSlotDto[];
} 