import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { VenuesModule } from './venues/venues.module';
import { BookingsModule } from './bookings/bookings.module';
import { GamesModule } from './games/games.module';
import { PaymentsModule } from './payments/payments.module';
import { NotificationsModule } from './notifications/notifications.module';
import { MarketplaceModule } from './marketplace/marketplace.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        throttlers: [{
          ttl: config.get('THROTTLE_TTL', 60),
          limit: config.get('THROTTLE_LIMIT', 100),
        }],
      }),
    }),
    ClientsModule.registerAsync([
      {
        name: 'AUTH_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.NATS,
          options: {
            servers: [config.get('NATS_URL', 'nats://localhost:4222')],
            queue: 'auth_queue',
          },
        }),
      },
      {
        name: 'USERS_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.NATS,
          options: {
            servers: [config.get('NATS_URL', 'nats://localhost:4222')],
            queue: 'users_queue',
          },
        }),
      },
      {
        name: 'VENUES_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.NATS,
          options: {
            servers: [config.get('NATS_URL', 'nats://localhost:4222')],
            queue: 'venues_queue',
          },
        }),
      },
      {
        name: 'BOOKINGS_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.NATS,
          options: {
            servers: [config.get('NATS_URL', 'nats://localhost:4222')],
            queue: 'bookings_queue',
          },
        }),
      },
      {
        name: 'GAMES_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.NATS,
          options: {
            servers: [config.get('NATS_URL', 'nats://localhost:4222')],
            queue: 'games_queue',
          },
        }),
      },
      {
        name: 'PAYMENTS_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.NATS,
          options: {
            servers: [config.get('NATS_URL', 'nats://localhost:4222')],
            queue: 'payments_queue',
          },
        }),
      },
      {
        name: 'NOTIFICATIONS_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.NATS,
          options: {
            servers: [config.get('NATS_URL', 'nats://localhost:4222')],
            queue: 'notifications_queue',
          },
        }),
      },
      {
        name: 'MARKETPLACE_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.NATS,
          options: {
            servers: [config.get('NATS_URL', 'nats://localhost:4222')],
            queue: 'marketplace_queue',
          },
        }),
      },
    ]),
    AuthModule,
    UsersModule,
    VenuesModule,
    BookingsModule,
    GamesModule,
    PaymentsModule,
    NotificationsModule,
    MarketplaceModule,
    HealthModule,
  ],
})
export class AppModule {} 