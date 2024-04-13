import { TableOfIngredientsProtocol } from './table-ingredients';

export interface TableCostUnitProtocol {
  tableOfIngredients: TableOfIngredientsProtocol;
  setServings(value: number): void;
  getServings(): number;
  setPackaging(value: number): void;
  getPackaging(): number;
  setCostUnit(): void;
  getCostUnit(): number;
  costUnit(): number;
}
