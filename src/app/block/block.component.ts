import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
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
  @ViewChild('expBlock') expBlock: ElementRef;
  @Input() block: ExpBlock;
  content = '';
  edit = false;
  active = false;
  signalWatcher = new Subject<boolean>();
  signalSubscription: Subscription;
  borderStatus = new Map<boolean, string>([[true, 'border-primary'], [false, 'border-secondary']]);
  constructor(private helper: HelperService) { }
  ngOnInit() {
    this.helper.blockMap.set(this.block.id, this.signalWatcher);
    this.signalSubscription = this.signalWatcher.subscribe((data) => {
      this.expBlock.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  ngOnDestroy() {
    this.signalSubscription.unsubscribe();
  }

  gotBlock(e: ExpBlock) {
    if (this.block.Content) {
      const converter = new QuillDeltaToHtmlConverter(JSON.parse(this.block.Content)['ops'], {});
      this.content = converter.convert();
    }
    this.helper.update(true);
    this.edit = !this.edit;
  }

  toggleEdit() {
    this.edit = !this.edit;
  }

  addNewBlock(position) {
    this.helper.addNewBlock(this.block, position);
  }

  setActive() {
    this.active = true;
  }

  setInActive() {
    this.active = false;
  }
}
