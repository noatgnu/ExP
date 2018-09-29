import {ExpBlock} from './exp-block';
import {ExpTime} from './exp-time';
import {ExpMaterial} from './exp-material';

export class Exp {
  private time = {Hours: 24, Minutes: 60, Seconds: 60};
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
    const totalTime: ExpTime = new ExpTime(0, 0, 0, 0);
    for (const i of this.Blocks) {
      if (i.Time !== undefined) {
        for (const i2 of Object.keys(totalTime)) {
          totalTime[i2] += (i.Time[i2] || 0) * (i.Repeat + 1);
        }
      }
    }
    if (totalTime['Seconds'] > 0) {
      if (totalTime['Seconds'] >= this.time['Seconds']) {
        totalTime['Minutes'] += Math.floor(totalTime['Seconds'] / this.time['Seconds']);
        totalTime['Seconds'] = totalTime['Seconds'] % this.time['Seconds'];
      }
    }
    if (totalTime['Minutes'] > 0) {
      if (totalTime['Minutes'] >= this.time['Minutes']) {
        totalTime['Hours'] += Math.floor(totalTime['Minutes'] / this.time['Minutes']);
        totalTime['Minutes'] = totalTime['Minutes'] % this.time['Minutes'];
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

  CalculateTotalMaterials() {
    const expMap = new Map<string, ExpMaterial>();
    const outExpMap = new Map<string, ExpMaterial>();
    // const inputMap = new Map<string, Map<number, ExpMaterial>>();
    const inputMap = {};
    // const outputMap = new Map<string, Map<number, ExpMaterial>>();
    const outputMap = {};
    const arrayMaterial: ExpMaterial[] = [];
    const outMaterial: ExpMaterial[] = [];
    for (let i = 0; i < this.Blocks.length; i ++) {
      if (this.Blocks[i].Inventory !== undefined) {
        for (let i2 = 0; i2 < this.Blocks[i].Inventory.InputMaterials.length; i2 ++) {
          if (!expMap.has(this.Blocks[i].Inventory.InputMaterials[i2].Name + this.Blocks[i].Inventory.InputMaterials[i2].Unit)) {
            expMap.set(this.Blocks[i].Inventory.InputMaterials[i2].Name + this.Blocks[i].Inventory.InputMaterials[i2].Unit,
              new ExpMaterial(this.Blocks[i].Inventory.InputMaterials[i2].Name, this.Blocks[i].Inventory.InputMaterials[i2].Amount * (this.Blocks[i].Repeat + 1), this.Blocks[i].Inventory.InputMaterials[i2].Unit));
            arrayMaterial.push(expMap.get(this.Blocks[i].Inventory.InputMaterials[i2].Name + this.Blocks[i].Inventory.InputMaterials[i2].Unit));
            // inputMap.set(this.Blocks[i].Inventory.InputMaterials[i2].Name + this.Blocks[i].Inventory.InputMaterials[i2].Unit, new Map<number, ExpMaterial>());
            // inputMap.get(this.Blocks[i].Inventory.InputMaterials[i2].Name + this.Blocks[i].Inventory.InputMaterials[i2].Unit).set(i, this.Blocks[i].Inventory.InputMaterials[i2]);
            inputMap[this.Blocks[i].Inventory.InputMaterials[i2].Name + this.Blocks[i].Inventory.InputMaterials[i2].Unit] = [{id: i, value: this.Blocks[i].Inventory.InputMaterials[i2]}];
          } else {
            expMap.get(this.Blocks[i].Inventory.InputMaterials[i2].Name + this.Blocks[i].Inventory.InputMaterials[i2].Unit).Amount += this.Blocks[i].Inventory.InputMaterials[i2].Amount * this.Blocks[i].Repeat;
            inputMap[this.Blocks[i].Inventory.InputMaterials[i2].Name + this.Blocks[i].Inventory.InputMaterials[i2].Unit].push({id: i, value: this.Blocks[i].Inventory.InputMaterials[i2]})
          }
        }
        for (let i2 = 0; i2 < this.Blocks[i].Inventory.OutputMaterials.length; i2 ++) {
          if (!outExpMap.has(this.Blocks[i].Inventory.OutputMaterials[i2].Name + this.Blocks[i].Inventory.OutputMaterials[i2].Unit)) {
            outExpMap.set(this.Blocks[i].Inventory.OutputMaterials[i2].Name + this.Blocks[i].Inventory.OutputMaterials[i2].Unit,
              new ExpMaterial(this.Blocks[i].Inventory.OutputMaterials[i2].Name, this.Blocks[i].Inventory.OutputMaterials[i2].Amount * (this.Blocks[i].Repeat + 1), this.Blocks[i].Inventory.OutputMaterials[i2].Unit));
            outMaterial.push(outExpMap.get(this.Blocks[i].Inventory.OutputMaterials[i2].Name + this.Blocks[i].Inventory.OutputMaterials[i2].Unit));
            // outputMap.set(this.Blocks[i].Inventory.OutputMaterials[i2].Name + this.Blocks[i].Inventory.OutputMaterials[i2].Unit, new Map<number, ExpMaterial>());
            // outputMap.get(this.Blocks[i].Inventory.OutputMaterials[i2].Name + this.Blocks[i].Inventory.OutputMaterials[i2].Unit).set(i, this.Blocks[i].Inventory.OutputMaterials[i2]);
            outputMap[this.Blocks[i].Inventory.OutputMaterials[i2].Name + this.Blocks[i].Inventory.OutputMaterials[i2].Unit] = [{id: i, value: this.Blocks[i].Inventory.OutputMaterials[i2]}];

          } else {
            outExpMap.get(this.Blocks[i].Inventory.OutputMaterials[i2].Name + this.Blocks[i].Inventory.OutputMaterials[i2].Unit).Amount += this.Blocks[i].Inventory.OutputMaterials[i2].Amount * this.Blocks[i].Repeat;
            outputMap[this.Blocks[i].Inventory.OutputMaterials[i2].Name + this.Blocks[i].Inventory.OutputMaterials[i2].Unit].push({id: i, value: this.Blocks[i].Inventory.OutputMaterials[i2]});
          }
        }
      }
    }
    return {in: arrayMaterial, inMap: inputMap, out: outMaterial, outMap: outputMap};
  }

  CalculateTotalBlocks(): number {
    let total = 0;
    for (const i of this.Blocks) {
      total += 1 + (i.Repeat || 0);
    }
    return total;
  }
}
