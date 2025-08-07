import { IsString, IsNumber, IsOptional, IsEnum, IsArray, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum PaymentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

export enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
  BANK_TRANSFER = 'bank_transfer',
  DIGITAL_WALLET = 'digital_wallet',
}

export enum Currency {
  USD = 'usd',
  EUR = 'eur',
  GBP = 'gbp',
}

export class CreatePaymentDto {
  @ApiProperty({ example: 50.0 })
  @IsNumber()
  amount: number;

  @ApiProperty({ enum: Currency, default: Currency.USD })
  @IsEnum(Currency)
  @IsOptional()
  currency?: Currency;

  @ApiProperty({ example: 'booking-123' })
  @IsString()
  bookingId: string;

  @ApiProperty({ example: 'user-123' })
  @IsString()
  userId: string;

  @ApiProperty({ enum: PaymentMethod })
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @ApiProperty({ example: 'Tennis court booking payment' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'stripe_payment_method_123' })
  @IsString()
  @IsOptional()
  paymentMethodId?: string;
}

export class PaymentDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ example: 50.0 })
  amount: number;

  @ApiProperty({ enum: Currency })
  currency: Currency;

  @ApiProperty({ example: 'booking-123' })
  bookingId: string;

  @ApiProperty({ example: 'user-123' })
  userId: string;

  @ApiProperty({ enum: PaymentStatus })
  status: PaymentStatus;

  @ApiProperty({ enum: PaymentMethod })
  paymentMethod: PaymentMethod;

  @ApiProperty({ example: 'Tennis court booking payment' })
  description?: string;

  @ApiProperty({ example: 'stripe_payment_intent_123' })
  paymentIntentId?: string;

  @ApiProperty({ example: 'stripe_payment_method_123' })
  paymentMethodId?: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  booking: {
    id: string;
    date: string;
    startTime: string;
    endTime: string;
    totalPrice: number;
  };

  @ApiProperty()
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export class CartItemDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ example: 'Tennis Court Booking - Central Park' })
  name: string;

  @ApiProperty({ example: 'Central Park Tennis Center' })
  venue?: string;

  @ApiProperty({ example: '2024-02-15' })
  date?: string;

  @ApiProperty({ example: '14:00 - 16:00' })
  time?: string;

  @ApiProperty({ example: 45.0 })
  price: number;

  @ApiProperty({ example: 1 })
  quantity: number;

  @ApiProperty({ example: 'https://example.com/image.jpg' })
  image?: string;

  @ApiProperty({ example: 'court_booking' })
  type: string;

  @ApiProperty({ example: 'Wilson' })
  brand?: string;
}

export class CartDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ example: 'user-123' })
  userId: string;

  @ApiProperty({ type: [CartItemDto] })
  items: CartItemDto[];

  @ApiProperty({ example: 150.0 })
  subtotal: number;

  @ApiProperty({ example: 15.0 })
  discount: number;

  @ApiProperty({ example: 165.0 })
  total: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class ApplyCouponDto {
  @ApiProperty({ example: 'WELCOME10' })
  @IsString()
  couponCode: string;
}

export class CouponDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ example: 'WELCOME10' })
  code: string;

  @ApiProperty({ example: 10 })
  discount: number;

  @ApiProperty({ example: 'percentage' })
  type: string;

  @ApiProperty({ example: true })
  isActive: boolean;

  @ApiProperty()
  expiresAt: Date;
} 