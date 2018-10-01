import {ExpBlock} from './exp-block';
import {ExpTime} from './exp-time';
import {ExpMaterial} from './exp-material';

export class Exp {

  constructor(Name: string, Blocks: ExpBlock[]) {
    this.Name = Name;
    this.Blocks = Blocks;
  }


  Name: string;
  Blocks: ExpBlock[];
  totalTime: ExpTime;
  totalMaterial: ExpMaterial[];
  totalBlocks: number;
  CalculateTotalTime(): ExpTime {
    let totalTime: ExpTime = new ExpTime(0, 0, 0, 0);
    for (const i of this.Blocks) {
      if (i.Time !== undefined) {
        for (const i2 of ['Days', 'Hours', 'Minutes', 'Seconds']) {
          totalTime[i2] += (i.Time[i2] || 0) * (i.Repeat + 1);
        }
      }
    }
    totalTime = totalTime.StandardizeTime(totalTime);
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
