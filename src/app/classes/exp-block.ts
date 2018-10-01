import {ExpInventory} from './exp-inventory';
import {ExpTime} from './exp-time';
import {v4} from 'uuid';
export class ExpBlock {
  id: string;
  constructor(Name?: string, Time?: ExpTime, Inventory?: ExpInventory, Content?, TimeTracked?: boolean, Repeat?: number) {
    this.Name = Name;
    this.Time = Time;
    this.Inventory = Inventory;
    this.Content = Content;
    this.TimeTracked = TimeTracked;
    this.Repeat = Repeat;
    this.id = v4();
  }

  Name: string;
  Time: ExpTime;
  Inventory: ExpInventory;
  Content;
  TimeTracked: boolean;
  next: ExpBlock;
  Repeat: number;
}
