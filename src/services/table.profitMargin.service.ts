import { TableCostUnitProtocol } from '../interfaces/table-costUnit';
import { TableOfIngredientsProtocol } from '../interfaces/table-ingredients';
import { TableProfitMarginProtocol } from '../interfaces/table-profitMargin';

export class TableProfitMargin implements TableProfitMarginProtocol {
  private _valueWithMargin: number = 0;
  private rangeValue: number = 50;

  constructor(
    public readonly tableOfIngredients: TableOfIngredientsProtocol,
    public readonly tableCostUnit: TableCostUnitProtocol
  ) {}

  setRangeValue(): void {
    this._valueWithMargin = this.valueWithMargin();
    this.setProfitMargin();
  }

  getRangeValue(): number {
    return this._valueWithMargin;
  }

  setProfitMargin(): void {
    this._valueWithMargin = this.valueWithMargin();
    this.addValueWithMargin(this._valueWithMargin);
  }

  getProfitMargin(): number {
    return this._valueWithMargin;
  }

  valueWithMargin(): number {
    const value =
      this.tableCostUnit.getCostUnit() ||
      this.tableOfIngredients.getValuePartialOfRecipe() ||
      0;

    return value + value * (this.rangeValue / 100);
  }

  addValueWithMargin(valueWithMargin: number): void {
    console.log(valueWithMargin);
  }
}
