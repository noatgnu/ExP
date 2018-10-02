import {Exp} from './exp';

export class ExpTime {
  private time = {Hours: 24, Minutes: 60, Seconds: 60};
  constructor(Days: number, Hours: number, Minutes: number, Seconds: number) {
    this.Days = Days;
    this.Hours = Hours;
    this.Minutes = Minutes;
    this.Seconds = Seconds;
  }
  Start: ExpTime;
  Days: number;
  Hours: number;
  Minutes: number;
  Seconds: number;

  StandardizeTime(totalTime: ExpTime) {
    if (totalTime['Seconds'] > 0) {
      if (totalTime['Seconds'] >= this.time['Seconds']) {
        totalTime['Minutes'] += Math.floor(totalTime['Seconds'] / this.time['Seconds']);
        totalTime['Seconds'] = totalTime['Seconds'] % this.time['Seconds'];
      }
    }
    if (totalTime['Minutes'] > 0) {
      if (totalTime['Minutes'] >= this.time['Minutes']) {
        totalTime['Hours'] += Math.floor(totalTime['Minutes'] / this.time['Minutes']);
        totalTime['Minutes'] = totalTime['Minutes'] % this.time['Minutes'];
      }
    }
    if (totalTime['Hours'] > 0) {
      if (totalTime['Hours'] > this.time['Hours']) {
        totalTime['Days'] = totalTime['Hours'] / this.time['Hours'];
        totalTime['Hours'] = totalTime['Hours'] % this.time['Hours'];
      }
    }
    console.log(totalTime);
    return totalTime;
  }

  ToSeconds() {
    console.log(this.Seconds);
    let seconds = 0;
    if (this.Days) {
      seconds += this.Days * this.time.Hours * this.time.Minutes * this.time.Seconds;
    }
    if (this.Hours) {
      seconds += this.time.Hours * this.time.Minutes * this.time.Seconds;
    }
    if (this.Minutes) {
      seconds += this.time.Minutes * this.time.Seconds;
    }
    if (this.Seconds) {
      seconds += this.time.Seconds;
    }
    return seconds;
  }

}
