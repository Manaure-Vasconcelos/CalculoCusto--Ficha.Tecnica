export class TableFixedCosts {
  private _daysWorked: number = 0;
  private _salesPerDay: number = 0;
  private _fixedCosts: number = 0;

  setDaysWorked(value: number): void {
    this._daysWorked = value;
  }

  getDaysWorked(): number {
    return this._daysWorked;
  }

  setSalesPerDay(value: number): void {
    this._salesPerDay = value;
  }

  getSalesPerDay(): number {
    return this._salesPerDay;
  }

  setFixedCosts(value: number): void {
    this._fixedCosts = value;
  }

  getFixedCosts(): number {
    return this._fixedCosts;
  }

  fixedCosts(): number {
    return 0;
  }

  addFixedCosts() {}
}
