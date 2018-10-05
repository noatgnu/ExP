export class ExpMaterial {
  constructor(Name: string, Amount: number, Unit: string, Content?: string) {
    this.Name = Name;
    this.Amount = Amount;
    this.Unit = Unit;
    this.Content = Content;
  }
  Name: string;
  Amount: number;
  Unit: string;
  Content: string;
}
