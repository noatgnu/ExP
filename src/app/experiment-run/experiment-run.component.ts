import {ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subject, Subscription} from 'rxjs';
import {ExpRun} from '../classes/exp-run';
import {ExpBlock} from '../classes/exp-block';
import {TimerService} from '../services/timer.service';
import {ExpTime} from '../classes/exp-time';
import {QuillDeltaToHtmlConverter} from 'quill-delta-to-html';
import {Exp} from '../classes/exp';

@Component({
  selector: 'app-experiment-run',
  templateUrl: './experiment-run.component.html',
  styleUrls: ['./experiment-run.component.scss']
})
export class ExperimentRunComponent implements OnInit, OnDestroy {
  get currentRepeat(): number {
    return this._currentRepeat;
  }

  set currentRepeat(value: number) {
    if (this._currentRepeat !== undefined) {
      if (this.repeat[this._currentRepeat]) {
        this.repeat[this._currentRepeat].active = '';
      }
    }
    if (this.interval !== undefined) {
      clearInterval(this.interval);
    }

    this._currentRepeat = value;
    const timer = this.timer.total.ToSeconds();
    console.log(timer);
    this.timerService.SetStartTime(this.expRun.Experiment.Blocks[this.currentInd].id, value, timer);
    this.repeat[value].startTime = this.timerService.GetStartTime(this.expRun.Experiment.Blocks[this.currentInd].id, value);
    this.repeat[value].active = 'table-info';
    this.repeat[value].timer = this.timerService.GetTimer(this.expRun.Experiment.Blocks[this.currentInd].id, this.repeat[value].repeatId);
    this.timer['active'] = this.timerService.GetTimer(this.expRun.Experiment.Blocks[this.currentInd].id, this.repeat[value].repeatId);

    this.interval = this.startTimer(this.timer, this.cd);
  }
  get currentInd(): number {
    return this._currentInd;
  }

  set currentInd(value: number) {
    if (this.interval !== undefined) {
      clearInterval(this.interval);
    }
    this.repeat = [{repeatId: 0, startTime: 0, active: '', timer: this.timerService.GetTimer(this.expRun.Experiment.Blocks[value].id, 0)}];
    if (this.expRun.Experiment.Blocks[value].Repeat) {
      for (let i = 0; i < this.expRun.Experiment.Blocks[value].Repeat; i++ ) {
        this.repeat.push({repeatId: i + 1, startTime: 0, active: '', timer: this.timerService.GetTimer(this.expRun.Experiment.Blocks[value].id, i + 1)});
      }
    }

    let repeatId = 0;
    if (value > this._currentInd) {
      if (this.expRun.Experiment.Blocks[value].Repeat > 0) {
        repeatId = this.expRun.Experiment.Blocks[value].Repeat;
      }
    }
    console.log(repeatId);
    this._currentInd = value;
    this.currentRepeat = repeatId;
    this.disableBackward = value === 0;
    this.disableForward = value === this.expRun.Experiment.Blocks.length - 1;

    if (this.expRun.Experiment.Blocks[value].Content) {
      const converter = new QuillDeltaToHtmlConverter(JSON.parse(this.expRun.Experiment.Blocks[value].Content)['ops'], {});
      this.currentContent = converter.convert();
    } else {
      this.currentContent = '';
    }
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
  currentContent = '';
  private _currentRepeat: number;
  private _currentInd: number;
  timer: any;
  disableForward = true;
  disableBackward = true;
  repeat = [];
  interval;
  @HostListener('window:keyup', ['$event']) keyEvent(event: KeyboardEvent) {
    console.log(event.key);
    switch (event.key) {
      case 'ArrowRight':
        if (this.currentRepeat === this.expRun.Experiment.Blocks[this.currentInd].Repeat) {
          if (this.currentInd !== this.expRun.Experiment.Blocks.length - 1) {
            this.move(1);
          }
        } else {
          this.currentRepeat ++;
        }
        break;
      case 'ArrowLeft':
        if (this.currentRepeat === 0) {
          if (this.currentInd !== 0) {
            this.move(-1);
          }
        } else {
          this.currentRepeat --;
        }
        break;
    }
  }

  constructor(private route: ActivatedRoute, private cd: ChangeDetectorRef, private timerService: TimerService) {

  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.expRun = JSON.parse(localStorage.getItem(this.id));
    const id = this.id;
    if (this.expRun) {
      if (this.timer === undefined) {
        this.timer = {total: new ExpTime(0, 0, 0, 0)};
      }
      this.currentInd = this.expRun.Experiment.Blocks.findIndex(function (e) {
        return e.id === id;
      });
    }
    // this.currentBlock.next(this.expRun.Experiment.Blocks[this.currentInd]);
    // this.setupChannel(this.id);


    window.onbeforeunload = () => {
      localStorage.removeItem(id);
    };
  }

  ngOnDestroy() {
  }

  startTimer(timer , cd?) {
    return setInterval(function () {
      for (const k of Object.keys(timer)) {
        timer[k].Seconds += 1;
        if (timer[k].Seconds >= 60) {
          timer[k] = timer[k].StandardizeTime(timer[k]);
        }
      }
      // cd.detectChanges();
    }, 1000);
  }

  move(relativePosition: number) {
    this.currentInd += relativePosition;
  }

  getTimer(repeatId: number) {
    return this.timerService.GetTimer(this.expRun.Experiment.Blocks[this.currentInd].id, this.repeat[repeatId].startTime);
  }

  setActiveRepeat(repeat: number) {
    this.currentRepeat = repeat;
  }
}
