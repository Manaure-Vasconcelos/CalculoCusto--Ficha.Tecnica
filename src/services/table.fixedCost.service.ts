export class TableFixedCosts {
  private _daysWorked: number = 0;
  private _salesPerDay: number = 0;
  private _fixedCosts: number = 0;

  set daysWorked(value: number) {
    this._daysWorked;
  }

  get daysWorked(): number {
    return this._daysWorked;
  }

  set salesPerDay(value: number) {
    this._salesPerDay = value;
  }

  get salesPerDay(): number {
    return this._salesPerDay;
  }

  set fixedCosts(value: number) {
    this._fixedCosts = value;
  }

  get fixedCosts(): number {
    return this._fixedCosts;
  }

  addFixedCosts() {}
}
