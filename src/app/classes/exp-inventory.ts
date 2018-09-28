import {ExpMaterial} from './exp-material';

export class ExpInventory {
  constructor(InputMaterials?: ExpMaterial[], OutputMaterials?: ExpMaterial[]) {
    this._InputMaterials = InputMaterials;
    this._OutputMaterials = OutputMaterials;
  }
  get InputMaterials(): ExpMaterial[] {
    return this._InputMaterials;
  }

  set InputMaterials(value: ExpMaterial[]) {
    this._InputMaterials = value;
  }

  get OutputMaterials(): ExpMaterial[] {
    return this._OutputMaterials;
  }

  set OutputMaterials(value: ExpMaterial[]) {
    this._OutputMaterials = value;
  }
  private _InputMaterials: ExpMaterial[];
  private _OutputMaterials: ExpMaterial[];
}
