import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  private _updateTrigger = new Subject<boolean>();
  updateTrigger = this._updateTrigger.asObservable();
  private _newBlockTrigger = new Subject<any>();
  newBlockTrigger = this._newBlockTrigger.asObservable();
  blockMap = new Map<string, Subject<boolean>>();
  constructor() { }

  update(data) {
    this._updateTrigger.next(data);
  }

  addNewBlock(relativeTo, position) {
    this._newBlockTrigger.next({block: relativeTo, position: position});
  }
}
