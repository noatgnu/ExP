import {ExpBlock} from './exp-block';
import {ExpTime} from './exp-time';
import {ExpMaterial} from './exp-material';

export class Exp {
  private time = {Hours: 24, Seconds: 60};
  constructor(Name: string, Blocks: ExpBlock[]) {
    this._Name = Name;
    this._Blocks = Blocks;
  }
  get Name(): string {
    return this._Name;
  }

  set Name(value: string) {
    this._Name = value;
  }

  get Blocks(): ExpBlock[] {
    return this._Blocks;
  }

  set Blocks(value: ExpBlock[]) {
    this._Blocks = value;
  }
  private _Name: string;
  private _Blocks: ExpBlock[];
  totalTime: ExpTime;
  totalMaterial: ExpMaterial[];
  totalBlocks: number;
  CalculateTotalTime(): ExpTime {
    const totalTime: ExpTime = new ExpTime(0, 0, 0);
    for (const i of this.Blocks) {
      if (i.Time !== undefined) {
        for (const i2 of Object.keys(totalTime)) {
          totalTime[i2] += (i.Time[i2] || 0) * (i.Repeat + 1);
        }
      }
    }
    if (totalTime['Seconds'] > 0) {
      if (totalTime['Seconds'] >= this.time['Seconds']) {
        totalTime['Hours'] += Math.floor(totalTime['Seconds'] / this.time['Seconds']);
        totalTime['Seconds'] = totalTime['Seconds'] % this.time['Seconds'];
      }
    }
    if (totalTime['Hours'] > 0) {
      if (totalTime['Hours'] > this.time['Hours']) {
        totalTime['Days'] = totalTime['Hours'] / this.time['Hours'];
        totalTime['Seconds'] = totalTime['Seconds'] % this.time['Seconds'];
      }
    }
    return totalTime;
  }

  CalculateTotalMaterials(): ExpMaterial[] {
    const expMap = new Map<string, ExpMaterial>();
    const arrayMaterial: ExpMaterial[] = [];
    for (const i of this.Blocks) {
      if (i.Inventory !== undefined) {
        for (const i2 of i.Inventory.InputMaterials) {
          if (!expMap.has(i2.Name + i2.Unit)) {
            expMap.set(i2.Name + i2.Unit, new ExpMaterial(i2.Name, i2.Amount * (i.Repeat + 1), i2.Unit));
            arrayMaterial.push(expMap.get(i2.Name + i2.Unit));
          } else {
            expMap.get(i2.Name + i2.Unit).Amount += i2.Amount * i.Repeat;
          }
        }
      }
    }
    return arrayMaterial;
  }

  CalculateTotalBlocks(): number {
    let total = 0;
    for (const i of this.Blocks) {
      total += 1 + (i.Repeat || 0);
    }
    return total;
  }
}
