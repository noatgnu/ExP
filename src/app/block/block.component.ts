import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {ExpBlock} from '../classes/exp-block';
import {QuillDeltaToHtmlConverter} from 'quill-delta-to-html';
import {HelperService} from '../services/helper.service';
import {Subject, Subscription} from 'rxjs';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss'],
})
export class BlockComponent implements OnInit, OnDestroy {
  get block(): ExpBlock {
    return this._block;
  }

  private _block: ExpBlock;

  @ViewChild('expBlock') expBlock: ElementRef;

  @Input() set block(value: ExpBlock) {
    if (value.Content) {
      const converter = new QuillDeltaToHtmlConverter(JSON.parse(value.Content)['ops'], {});
      this.content = converter.convert();
    }
    this._block = value;
  }

  @Input() printMode: boolean;

  content = '';
  edit = false;
  active = false;
  signalWatcher = new Subject<boolean>();
  signalSubscription: Subscription;
  borderStatus = new Map<boolean, string>([[true, 'border-primary'], [false, 'border-secondary']]);
  constructor(private helper: HelperService) {
    // this.channel = new BroadcastChannel(this.block.id);
  }
  ngOnInit() {
    this.helper.blockMap.set(this._block.id, this.signalWatcher);
    this.signalSubscription = this.signalWatcher.subscribe((data) => {
      this.expBlock.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

  }

  ngOnDestroy() {
    this.signalSubscription.unsubscribe();
  }

  gotBlock(e: ExpBlock) {
    if (this._block.Content) {
      const converter = new QuillDeltaToHtmlConverter(JSON.parse(this._block.Content)['ops'], {});
      this.content = converter.convert();
      this.helper.updateMaterial(e);
    }
    this.helper.update(true);
    this.edit = !this.edit;
  }

  toggleEdit() {
    this.edit = !this.edit;
  }

  addNewBlock(position) {
    this.helper.addNewBlock(this._block, position);
  }

  setActive() {
    this.active = true;
  }

  setInActive() {
    this.active = false;
  }

  triggerRun() {
    this.helper.Run(this._block.id);
  }
}
