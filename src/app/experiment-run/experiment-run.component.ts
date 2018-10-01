import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subject, Subscription} from 'rxjs';
import {ExpRun} from '../classes/exp-run';
import {ExpBlock} from '../classes/exp-block';
import {TimerService} from '../services/timer.service';
import {ExpTime} from '../classes/exp-time';
import {QuillDeltaToHtmlConverter} from 'quill-delta-to-html';

@Component({
  selector: 'app-experiment-run',
  templateUrl: './experiment-run.component.html',
  styleUrls: ['./experiment-run.component.scss']
})
export class ExperimentRunComponent implements OnInit, OnDestroy {
  get currentInd(): number {
    return this._currentInd;
  }

  set currentInd(value: number) {
    this._currentInd = value;
    this.disableBackward = value === 0;
    this.disableForward = value === this.expRun.Experiment.Blocks.length - 1;
    const converter = new QuillDeltaToHtmlConverter(JSON.parse(this.expRun.Experiment.Blocks[value].Content)['ops'], {});
    this.currentContent = converter.convert();

  }
  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  private _id: string;
  expChannel: BroadcastChannel;
  expRun: ExpRun;
  currentContent;
  private _currentInd: number;
  timer: ExpTime;
  disableForward = true;
  disableBackward = true;
  constructor(private route: ActivatedRoute, private cd: ChangeDetectorRef, private timerService: TimerService) {

  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.expRun = JSON.parse(localStorage.getItem(this.id));
    const id = this.id;
    if (this.expRun) {
      this.currentInd = this.expRun.Experiment.Blocks.findIndex(function (e) {
        return e.id === id;
      });
    }
    // this.currentBlock.next(this.expRun.Experiment.Blocks[this.currentInd]);
    // this.setupChannel(this.id);
    this.timer = new ExpTime(0, 0, 0, 0);
    this.startTimer(this.timer, this.cd);
    window.onbeforeunload = () => {
      localStorage.removeItem(id);
    };
  }

  ngOnDestroy() {
  }

  startTimer(timer , cd?) {
    setInterval(function () {
      timer.Seconds += 1;
      if (timer.Seconds >= 60) {
        timer = timer.StandardizeTime(timer);
      }
      // cd.detectChanges();
    }, 1000);
  }
}
