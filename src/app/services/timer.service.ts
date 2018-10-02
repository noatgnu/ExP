import { Injectable } from '@angular/core';
import {ExpTime} from '../classes/exp-time';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  timers: Map<string, Map<number, ExpTime>> = new Map<string, Map<number, ExpTime>>();
  startTimeMap: Map<string, Map<number, number>> = new Map<string, Map<number, number>>();
  constructor() { }

  GetTimer(expId: string, startTime: number) {
    if (this.timers.has(expId)) {
      if (this.timers.get(expId).has(startTime)) {
        return this.timers.get(expId).get(startTime);
      } else {
        this.timers.get(expId).set(startTime, new ExpTime(0, 0, 0, 0));
        return this.timers.get(expId).get(startTime);
      }
    } else {
      this.timers.set(expId, new Map<number, ExpTime>());
      this.timers.get(expId).set(startTime, new ExpTime(0, 0, 0, 0));
      return this.timers.get(expId).get(startTime);
    }
  }

  SetStartTime(expId: string, repeatId: number, currentTime: number) {
    if (this.startTimeMap.has(expId)) {
      if (!this.startTimeMap.get(expId).has(repeatId)) {
        this.startTimeMap.get(expId).set(repeatId, currentTime);
      }
    } else {
      this.startTimeMap.set(expId, new Map<number, number>());
      this.startTimeMap.get(expId).set(repeatId, currentTime);
    }
  }

  GetStartTime(expId: string, repeatId: number) {
    this.startTimeMap.get(expId).get(repeatId);
  }
}
