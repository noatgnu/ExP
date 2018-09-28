import {ExpInventory} from './exp-inventory';
import {ExpTime} from './exp-time';

export class ExpBlock {
  constructor(Name?: string, Time?: ExpTime, Inventory?: ExpInventory, Content?, TimeTracked?: boolean, Repeat?: number) {
    this._Name = Name;
    this._Time = Time;
    this._Inventory = Inventory;
    this._Content = Content;
    this._TimeTracked = TimeTracked;
    this._Repeat = Repeat;
  }
  get Repeat(): number {
    return this._Repeat;
  }

  set Repeat(value: number) {
    this._Repeat = value;
  }
  get next(): ExpBlock {
    return this._next;
  }

  set next(value: ExpBlock) {
    this._next = value;
  }

  get TimeTracked(): boolean {
    return this._TimeTracked;
  }

  set TimeTracked(value: boolean) {
    this._TimeTracked = value;
  }

  get Name(): string {
    return this._Name;
  }

  set Name(value: string) {
    this._Name = value;
  }

  get Time(): ExpTime {
    return this._Time;
  }

  set Time(value: ExpTime) {
    this._Time = value;
  }

  get Inventory(): ExpInventory {
    return this._Inventory;
  }

  set Inventory(value: ExpInventory) {
    this._Inventory = value;
  }

  get Content() {
    return this._Content;
  }

  set Content(value) {
    this._Content = value;
  }
  private _Name: string;
  private _Time: ExpTime;
  private _Inventory: ExpInventory;
  private _Content;
  private _TimeTracked: boolean;
  private _next: ExpBlock;
  private _Repeat: number;
}
