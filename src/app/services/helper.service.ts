import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  private _updateTrigger = new Subject<boolean>();
  updateTrigger = this._updateTrigger.asObservable();
  constructor() { }

  update(data) {
    this._updateTrigger.next(data);
  }
}
