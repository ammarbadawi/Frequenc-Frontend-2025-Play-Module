import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { LoginDto, RegisterDto, ForgotPasswordDto, ResetPasswordDto, AuthResponseDto } from '@frequenc/shared';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully', type: AuthResponseDto })
  async register(@Body() registerDto: RegisterDto) {
    return firstValueFrom(
      this.authService.send('auth.register', registerDto)
    );
  }

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'Login successful', type: AuthResponseDto })
  async login(@Body() loginDto: LoginDto) {
    return firstValueFrom(
      this.authService.send('auth.login', loginDto)
    );
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({ status: 200, description: 'Token refreshed successfully', type: AuthResponseDto })
  async refreshToken(@Body() refreshDto: { refreshToken: string }) {
    return firstValueFrom(
      this.authService.send('auth.refresh', refreshDto)
    );
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Forgot password' })
  @ApiResponse({ status: 200, description: 'Password reset email sent' })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return firstValueFrom(
      this.authService.send('auth.forgot-password', forgotPasswordDto)
    );
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password' })
  @ApiResponse({ status: 200, description: 'Password reset successfully' })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return firstValueFrom(
      this.authService.send('auth.reset-password', resetPasswordDto)
    );
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'User logout' })
  @ApiResponse({ status: 200, description: 'Logout successful' })
  async logout(@Request() req) {
    return firstValueFrom(
      this.authService.send('auth.logout', { userId: req.user.id })
    );
  }

  @Post('verify-email')
  @ApiOperation({ summary: 'Verify email address' })
  @ApiResponse({ status: 200, description: 'Email verified successfully' })
  async verifyEmail(@Body() verifyDto: { token: string }) {
    return firstValueFrom(
      this.authService.send('auth.verify-email', verifyDto)
    );
  }

  @Post('resend-verification')
  @ApiOperation({ summary: 'Resend email verification' })
  @ApiResponse({ status: 200, description: 'Verification email sent' })
  async resendVerification(@Body() resendDto: { email: string }) {
    return firstValueFrom(
      this.authService.send('auth.resend-verification', resendDto)
    );
  }
} 