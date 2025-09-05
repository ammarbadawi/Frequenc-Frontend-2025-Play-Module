import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  async sendVerificationEmail(email: string, token: string): Promise<void> {
    this.logger.log(`Mock verification email to ${email} with token ${token}`);
  }

  async sendPasswordResetEmail(email: string, token: string): Promise<void> {
    this.logger.log(
      `Mock password reset email to ${email} with token ${token}`,
    );
  }
}


