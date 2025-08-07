import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Health check' })
  @ApiResponse({ status: 200, description: 'Service is healthy' })
  async healthCheck() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'api-gateway',
      version: '1.0.0'
    };
  }

  @Get('ping')
  @ApiOperation({ summary: 'Ping endpoint' })
  @ApiResponse({ status: 200, description: 'Pong response' })
  async ping() {
    return { message: 'pong' };
  }
} 