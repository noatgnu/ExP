import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FileService} from '../services/file.service';
import {Exp} from '../classes/exp';
import {ExpBlock} from '../classes/exp-block';
import {ExpInventory} from '../classes/exp-inventory';
import {ExpMaterial} from '../classes/exp-material';
import {ExpTime} from '../classes/exp-time';

@Component({
  selector: 'app-exp-loader',
  templateUrl: './exp-loader.component.html',
  styleUrls: ['./exp-loader.component.scss']
})
export class ExpLoaderComponent implements OnInit {
  placeholder = '';
  result;
  url;
  constructor(private _fh: FileService) { }
  @Output() file: EventEmitter<any> = new EventEmitter();
  ngOnInit() {
  }

  async fileSelected(event) {
    if (event.target.files[0]) {
      this.placeholder = event.target.files[0].name;
      this.result = await this._fh.loadFile(event.target.files[0]);
      const jsonObj = JSON.parse(this.result);
      this.file.emit(jsonObj);
    }
  }

  loadURL(url: string) {
    this._fh.getFileByURL(url).subscribe((data) => {
      const jsonObj = JSON.parse(data.body);
      this.file.emit(jsonObj);
    });
  }

  private extractProperties(jsonObj, experiment, object) {
    for (let i = 0; i < jsonObj.length; i++) {
      experiment[i] = new object();
      for (const i2 of Object.keys(jsonObj[i])) {
        if (jsonObj[i].hasOwnProperty(i2)) {
          experiment[i][i2] = jsonObj[i][i2];
          switch (i2) {
            case 'Inventory':
              experiment[i][i2] = new ExpInventory();
              this.extractProperties(jsonObj[i][i2].InputMaterials, experiment[i][i2].InputMaterials, ExpMaterial);
              this.extractProperties(jsonObj[i][i2].OutputMaterials, experiment[i][i2].OutputMaterials, ExpMaterial);
              break;
            case 'Timer':
              experiment[i][i2] = new ExpTime(experiment[i][i2].Days, experiment[i][i2].Hours, experiment[i][i2].Minutes, experiment[i][i2].Seconds);
              break;
          }
        }
      }
    }
  }
}
