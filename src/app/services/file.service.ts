import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Exp} from '../classes/exp';
import {ExpBlock} from '../classes/exp-block';
import * as FileSaver from 'file-saver';
import {ExpInventory} from '../classes/exp-inventory';
import {ExpMaterial} from '../classes/exp-material';
import {ExpTime} from '../classes/exp-time';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private _experimentSource = new BehaviorSubject<Exp>(new Exp('Untitled', [new ExpBlock('Untitled', new ExpTime(0, 0, 0, 0), new ExpInventory([], []))]));
  experimentSourceReader = this._experimentSource.asObservable();
  constructor(private http: HttpClient) { }

  async loadFile(file) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(reader.result);
      };
      reader.readAsText(file);
    });
  }

  updateExperiment (data: Exp) {
    this._experimentSource.next(data);
  }

  export(exp: Exp) {
    const blob = new Blob([JSON.stringify(exp)], {type: 'application/json'});
    FileSaver.saveAs(blob, exp.Name + '.json');
  }

  extractProperties(jsonObj, experiment, object) {
    if (jsonObj) {
      for (let i = 0; i < jsonObj.length; i++) {
        experiment[i] = new object();
        for (const i2 of Object.keys(jsonObj[i])) {
          if (jsonObj[i].hasOwnProperty(i2)) {
            experiment[i][i2] = jsonObj[i][i2];
            switch (i2) {
              case 'Inventory':
                experiment[i][i2] = new ExpInventory();
                experiment[i][i2].InputMaterials = [];
                experiment[i][i2].OutputMaterials = [];
                console.log(jsonObj[i][i2]);
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

  getFileByURL(url: string) {
    return this.http.get(url, {responseType: 'text', observe: 'response'});
  }
}
