import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@frequenc/shared';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
  ],
  controllers: [GamesController],
  providers: [GamesService],
})
export class AppModule {}
