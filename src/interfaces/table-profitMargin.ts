import { TableCostUnitProtocol } from './table-costUnit';
import { TableOfIngredientsProtocol } from './table-ingredients';

export interface TableProfitMarginProtocol {
  tableOfIngredients: TableOfIngredientsProtocol;
  tableCostUnit: TableCostUnitProtocol;
  setRangeValue(): void;
  getRangeValue(): number;
  setProfitMargin(): void;
  getProfitMargin(): number;
  valueWithMargin(): number;
  addValueWithMargin(valueWithMargin: number): void;
}
