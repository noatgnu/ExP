export class ExpMaterial {
  constructor(Name: string, Amount: number) {
    this._Name = Name;
    this._Amount = Amount;
  }
  get Name(): string {
    return this._Name;
  }

  set Name(value: string) {
    this._Name = value;
  }

  get Amount(): number {
    return this._Amount;
  }

  set Amount(value: number) {
    this._Amount = value;
  }
  private _Name: string;
  private _Amount: number;
}
