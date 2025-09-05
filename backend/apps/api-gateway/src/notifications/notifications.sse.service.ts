import { Injectable, MessageEvent } from '@nestjs/common';
import { Subject } from 'rxjs';

@Injectable()
export class NotificationsSseService {
  private subjects = new Map<string, Subject<MessageEvent>>();

  getSubject(userId: string): Subject<MessageEvent> {
    let subj = this.subjects.get(userId);
    if (!subj) {
      subj = new Subject<MessageEvent>();
      this.subjects.set(userId, subj);
    }
    return subj;
  }

  emit(userId: string, data: any) {
    const subj = this.getSubject(userId);
    subj.next({ data });
  }
}
