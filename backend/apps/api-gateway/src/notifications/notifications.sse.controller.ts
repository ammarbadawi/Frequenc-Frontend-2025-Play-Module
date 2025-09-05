import { Controller, Sse, UseGuards, Request } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { NotificationsSseService } from './notifications.sse.service';

@Controller('notifications')
export class NotificationsSseController {
  constructor(private readonly sse: NotificationsSseService) {}

  @Sse('stream')
  @UseGuards(JwtAuthGuard)
  stream(@Request() req): Observable<MessageEvent> {
    return this.sse.getSubject(req.user.id).asObservable();
  }
}
