import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { AuthService } from './auth.service';
import {
  LoginDto,
  RegisterDto,
  RefreshTokenDto,
  ForgotPasswordDto,
  ResetPasswordDto,
} from '@frequenc/shared';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.register')
  async register(@Payload() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @MessagePattern('auth.login')
  async login(@Payload() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @MessagePattern('auth.refresh')
  async refresh(@Payload() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refresh(refreshTokenDto);
  }

  @MessagePattern('auth.logout')
  async logout(@Payload() data: { token: string }) {
    return this.authService.logout(data.token);
  }

  @MessagePattern('auth.forgot-password')
  async forgotPassword(@Payload() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @MessagePattern('auth.reset-password')
  async resetPassword(@Payload() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @MessagePattern('auth.verify-email')
  async verifyEmail(@Payload() data: { token: string }) {
    return this.authService.verifyEmail(data.token);
  }

  @MessagePattern('auth.get-profile')
  async getProfile(@Payload() data: { token: string }) {
    return this.authService.getProfile(data.token);
  }

  @MessagePattern('auth.validate-token')
  async validateToken(@Payload() data: { token: string }) {
    return this.authService.validateToken(data.token);
  }
} 