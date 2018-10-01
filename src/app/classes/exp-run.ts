import {Exp} from './exp';

export class ExpRun {
  constructor(StartTime: Date, Experiment: Exp) {
    this.StartTime = StartTime;
    this.Experiment = Experiment;
  }

  StartTime: Date;
  Experiment: Exp;

}
