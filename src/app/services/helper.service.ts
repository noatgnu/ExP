import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Exp} from '../classes/exp';
import {ExpMaterial} from '../classes/exp-material';
import {ExpBlock} from '../classes/exp-block';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  private _updateTrigger = new Subject<boolean>();
  updateTrigger = this._updateTrigger.asObservable();
  private _newBlockTrigger = new Subject<any>();
  newBlockTrigger = this._newBlockTrigger.asObservable();
  private _triggerRun = new Subject<string>();
  triggerRun = this._triggerRun.asObservable();
  blockMap = new Map<string, Subject<boolean>>();

  MaterialsArray: string[];
  constructor() { }

  update(data) {
    this._updateTrigger.next(data);
  }

  addNewBlock(relativeTo, position) {
    this._newBlockTrigger.next({block: relativeTo, position: position});
  }

  openModal(exp: Exp) {

  }

  Run(blockId: string) {
    this._triggerRun.next(blockId);
  }

  updateMaterial(exp: ExpBlock) {
    if (exp.Inventory) {
      if (exp.Inventory.InputMaterials) {
        for (const i of exp.Inventory.InputMaterials) {
          const ind = this.MaterialsArray.find((v) => {
            return v === i.Name;
          });
          if (!ind) {
            this.MaterialsArray.push(i.Name);
          }
        }
      }
      if (exp.Inventory.OutputMaterials) {
        for (const i of exp.Inventory.OutputMaterials) {
          const ind = this.MaterialsArray.find((v) => {
            return v === i.Name;
          });
          if (!ind) {
            this.MaterialsArray.push(i.Name);
          }
        }
      }
    }
  }
}
