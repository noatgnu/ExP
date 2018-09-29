import { Component, OnInit } from '@angular/core';
import {FileService} from '../services/file.service';

@Component({
  selector: 'app-exp-loader',
  templateUrl: './exp-loader.component.html',
  styleUrls: ['./exp-loader.component.scss']
})
export class ExpLoaderComponent implements OnInit {
  placeholder = '';
  result;
  constructor(private _fh: FileService) { }

  ngOnInit() {
  }

  async fileSelected(event) {
    if (event.target.files[0]) {
      this.placeholder = event.target.files[0].name;
      this.result = await this._fh.loadFile(event.target.files[0]);
      console.log(this.result);
    }
  }

}
