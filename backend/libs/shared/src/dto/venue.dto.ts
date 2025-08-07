import { IsString, IsNumber, IsOptional, IsArray, IsEnum, IsBoolean, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum SportType {
  TENNIS = 'tennis',
  GOLF = 'golf',
  BASKETBALL = 'basketball',
  SOCCER = 'soccer',
  SWIMMING = 'swimming',
  BADMINTON = 'badminton',
  SQUASH = 'squash',
  TABLE_TENNIS = 'table_tennis',
}

export enum CourtSurface {
  HARD = 'hard',
  CLAY = 'clay',
  GRASS = 'grass',
  CARPET = 'carpet',
  CONCRETE = 'concrete',
}

export enum CourtType {
  INDOOR = 'indoor',
  OUTDOOR = 'outdoor',
}

export class CreateVenueDto {
  @ApiProperty({ example: 'Central Park Tennis Center' })
  @IsString()
  name: string;

  @ApiProperty({ example: '123 Tennis Court Ave, New York, NY' })
  @IsString()
  address: string;

  @ApiProperty({ example: 40.7589 })
  @IsNumber()
  latitude: number;

  @ApiProperty({ example: -73.9851 })
  @IsNumber()
  longitude: number;

  @ApiProperty({ example: 'Premier tennis facility in Central Park' })
  @IsString()
  description: string;

  @ApiProperty({ example: '+1-555-123-4567' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: 'info@centralparktennis.com' })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: 'https://example.com/venue.jpg' })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({ example: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  gallery?: string[];

  @ApiProperty({ example: ['parking', 'shower', 'locker_room'] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  amenities?: string[];

  @ApiProperty({ example: '09:00' })
  @IsString()
  openingTime: string;

  @ApiProperty({ example: '22:00' })
  @IsString()
  closingTime: string;

  @ApiProperty({ example: 4.5 })
  @IsNumber()
  @IsOptional()
  rating?: number;

  @ApiProperty({ example: 150 })
  @IsNumber()
  @IsOptional()
  reviewCount?: number;
}

export class UpdateVenueDto {
  @ApiProperty({ example: 'Central Park Tennis Center' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: '123 Tennis Court Ave, New York, NY' })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ example: 40.7589 })
  @IsNumber()
  @IsOptional()
  latitude?: number;

  @ApiProperty({ example: -73.9851 })
  @IsNumber()
  @IsOptional()
  longitude?: number;

  @ApiProperty({ example: 'Premier tennis facility in Central Park' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: '+1-555-123-4567' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: 'info@centralparktennis.com' })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: 'https://example.com/venue.jpg' })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({ example: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  gallery?: string[];

  @ApiProperty({ example: ['parking', 'shower', 'locker_room'] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  amenities?: string[];

  @ApiProperty({ example: '09:00' })
  @IsString()
  @IsOptional()
  openingTime?: string;

  @ApiProperty({ example: '22:00' })
  @IsString()
  @IsOptional()
  closingTime?: string;
}

export class CreateCourtDto {
  @ApiProperty({ example: 'Tennis Court 1' })
  @IsString()
  name: string;

  @ApiProperty({ enum: SportType })
  @IsEnum(SportType)
  sportType: SportType;

  @ApiProperty({ enum: CourtSurface })
  @IsEnum(CourtSurface)
  surface: CourtSurface;

  @ApiProperty({ enum: CourtType })
  @IsEnum(CourtType)
  type: CourtType;

  @ApiProperty({ example: 25.0 })
  @IsNumber()
  hourlyRate: number;

  @ApiProperty({ example: true })
  @IsBoolean()
  isAvailable: boolean;

  @ApiProperty({ example: 'Professional tennis court with excellent lighting' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: ['https://example.com/court1.jpg'] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];
}

export class VenueDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ example: 'Central Park Tennis Center' })
  name: string;

  @ApiProperty({ example: '123 Tennis Court Ave, New York, NY' })
  address: string;

  @ApiProperty({ example: 40.7589 })
  latitude: number;

  @ApiProperty({ example: -73.9851 })
  longitude: number;

  @ApiProperty({ example: 'Premier tennis facility in Central Park' })
  description: string;

  @ApiProperty({ example: '+1-555-123-4567' })
  phone?: string;

  @ApiProperty({ example: 'info@centralparktennis.com' })
  email?: string;

  @ApiProperty({ example: 'https://example.com/venue.jpg' })
  imageUrl?: string;

  @ApiProperty({ example: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'] })
  gallery?: string[];

  @ApiProperty({ example: ['parking', 'shower', 'locker_room'] })
  amenities?: string[];

  @ApiProperty({ example: '09:00' })
  openingTime: string;

  @ApiProperty({ example: '22:00' })
  closingTime: string;

  @ApiProperty({ example: 4.5 })
  rating?: number;

  @ApiProperty({ example: 150 })
  reviewCount?: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  courts: CourtDto[];
}

export class CourtDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ example: 'Tennis Court 1' })
  name: string;

  @ApiProperty({ enum: SportType })
  sportType: SportType;

  @ApiProperty({ enum: CourtSurface })
  surface: CourtSurface;

  @ApiProperty({ enum: CourtType })
  type: CourtType;

  @ApiProperty({ example: 25.0 })
  hourlyRate: number;

  @ApiProperty({ example: true })
  isAvailable: boolean;

  @ApiProperty({ example: 'Professional tennis court with excellent lighting' })
  description?: string;

  @ApiProperty({ example: ['https://example.com/court1.jpg'] })
  images?: string[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
} 