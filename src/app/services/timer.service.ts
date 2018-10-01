import { Injectable } from '@angular/core';
import {ExpTime} from '../classes/exp-time';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  timers: Map<string, Map<number, ExpTime>>;
  constructor() { }

  GetTimer(expId: string, startTime: number) {
    if (this.timers.has(expId)) {
      if (this.timers.get(expId).has(startTime)) {
        return this.timers.get(expId).get(startTime);
      } else {
        return this.timers.get(expId).set(startTime, new ExpTime(0, 0, 0, 0));
      }
    } else {
      this.timers.set(expId, new Map<number, ExpTime>());
      this.timers.get(expId).set(startTime, new ExpTime(0, 0, 0, 0));
      return this.timers.get(expId).get(startTime);
    }
  }
}
