export class TableFixedCosts {
  private _daysWorked: number = 0;
  private _salesPerDay: number = 0;
  private _fixedCosts: number = 0;

  setDaysWorked(value: number) {
    this._daysWorked;
  }

  getDaysWorked(): number {
    return this._daysWorked;
  }

  setSalesPerDay(value: number) {
    this._salesPerDay = value;
  }

  getSalesPerDay(): number {
    return this._salesPerDay;
  }

  setFixedCosts(value: number) {
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
