import { costUnit } from '../business-rules/business';
import { TableOfIngredientsProtocol } from '../interfaces/table-ingredients';

export class TableCostUnit {
  private _servings: number = 0;
  private _packaging: number = 0;
  public _costUnit: number = 0;

  // isso é uma injeção de dependencia => é uma forma mais "fechada".
  // Pq a costUnit depende de outra class, o melhor seria criar uma abstração da classe
  constructor(
    private readonly tableOfIngredients: TableOfIngredientsProtocol
  ) {}

  set servings(value: number) {
    this._servings = value;
    // chamar o custo unitario novamente
  }

  get servings(): number {
    return this._servings;
  }

  set packaging(value: number) {
    this._packaging = value;
  }

  get packaging(): number {
    return this._packaging;
  }

  setCostUnit(): void {
    this._costUnit = costUnit(
      this.tableOfIngredients.getValuePartialOfRecipe(),
      this.servings,
      this.packaging
    );
  }

  get costUnit(): number {
    return this._costUnit;
  }

  addCostUnit() {}
}
