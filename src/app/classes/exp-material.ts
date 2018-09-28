export class ExpMaterial {
  constructor(Name: string, Amount: number, Unit: string) {
    this._Name = Name;
    this._Amount = Amount;
    this._Unit = Unit;
  }
  get Unit(): string {
    return this._Unit;
  }

  set Unit(value: string) {
    this._Unit = value;
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
  private _Unit: string;
}
