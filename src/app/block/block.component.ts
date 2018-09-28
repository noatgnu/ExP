import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {ExpBlock} from '../classes/exp-block';
import {QuillDeltaToHtmlConverter} from 'quill-delta-to-html';
import {HelperService} from '../services/helper.service';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css'],
})
export class BlockComponent implements OnInit {
  @Input() block: ExpBlock;
  content = '';
  edit = false;
  constructor(private helper: HelperService) { }
  ngOnInit() {
    console.log(this.block);
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
}
