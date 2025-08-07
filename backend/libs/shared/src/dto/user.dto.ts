import { IsEmail, IsString, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum UserRole {
  PLAYER = 'player',
  VENUE_OWNER = 'venue_owner',
  ADMIN = 'admin',
}

export enum SkillLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  PROFESSIONAL = 'professional',
}

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+1234567890' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ enum: UserRole, default: UserRole.PLAYER })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @ApiProperty({ example: 'New York, NY' })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiProperty({ example: 'Passionate tennis player' })
  @IsString()
  @IsOptional()
  bio?: string;
}

export class UpdateUserDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: '+1234567890' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: 'New York, NY' })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiProperty({ example: 'Passionate tennis player' })
  @IsString()
  @IsOptional()
  bio?: string;

  @ApiProperty({ enum: SkillLevel })
  @IsEnum(SkillLevel)
  @IsOptional()
  skillLevel?: SkillLevel;

  @ApiProperty({ example: 'https://example.com/avatar.jpg' })
  @IsString()
  @IsOptional()
  avatarUrl?: string;
}

export class UserProfileDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: '+1234567890' })
  phone?: string;

  @ApiProperty({ enum: UserRole })
  role: UserRole;

  @ApiProperty({ example: 'New York, NY' })
  location?: string;

  @ApiProperty({ example: 'Passionate tennis player' })
  bio?: string;

  @ApiProperty({ enum: SkillLevel })
  skillLevel?: SkillLevel;

  @ApiProperty({ example: 'https://example.com/avatar.jpg' })
  avatarUrl?: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  stats: {
    gamesPlayed: number;
    gamesWon: number;
    friends: number;
    rating: number;
  };
} 