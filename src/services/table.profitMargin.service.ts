export class TableProfitMargin {
  private _profitMargin: number = 0;

  set profitMargin(value: number) {
    this._profitMargin = value;
  }

  get profitMargin() {
    return this._profitMargin;
  }

  addProfitMargin() {}
}
