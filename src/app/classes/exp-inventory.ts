import {ExpMaterial} from './exp-material';

export class ExpInventory {
  constructor(InputMaterials?: ExpMaterial[], OutputMaterials?: ExpMaterial[]) {
    this.InputMaterials = InputMaterials;
    this.OutputMaterials = OutputMaterials;
  }

  InputMaterials: ExpMaterial[];
  OutputMaterials: ExpMaterial[];
}
