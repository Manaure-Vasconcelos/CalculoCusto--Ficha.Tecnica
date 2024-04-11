import { costUnit, totalAmountPerIngredient } from './business';
import { IIngredient } from './interfaces';

export class TableOfIngredients {
  private readonly _ingredients: IIngredient[] = [];
  public _valuePartialOfRecipe: number = 0;
  // valor parcial da receita e usar pela intancia no arquivo index.

  set ingredients(ingredient: IIngredient) {
    // addIngredient
    this._ingredients.push(ingredient);
    /* Outra forma => Caso queira inserir todos os elementos novamente substituindo todos os anteriores.
      for (const currentIngredient of ingredients) {
      this._ingredients.push(currentIngredient);
    } */
    ingredient._realAmount = totalAmountPerIngredient(ingredient);
    this.setIngredientInTheContents(...this._ingredients);
    this.valuePartialOfRecipe = ingredient._realAmount;
  }

  get ingredients(): IIngredient[] {
    return this._ingredients;
  }

  set valuePartialOfRecipe(value: number) {
    this._valuePartialOfRecipe += value;
  }

  getValuePartialOfRecipe(): number {
    return this._valuePartialOfRecipe;
  }

  setIngredientInTheContents(...ingredients: IIngredient[]) {
    for (const current of ingredients) {
      console.log(current.describe);
    }
    // Vai setar no html o elemento.
    /* 
      for (const currentIngredient of ingredients) {
      row.innerHTML.text = currentIngredient
      Ou em uma lista/tabela de 0 1 2 3 4 5 6 7 8 9 10 | e toda vez que chamada ele seta os valores novamente.
      Atualizando sempre do índice 0.
    */
  }
}

export class Ingredient implements IIngredient {
  constructor(
    public describe: string,
    public marketWeight: number,
    public marketPrice: number,
    public grossWeight: number,
    public _realAmount?: number
  ) {}

  set realAmount(value: number) {
    this._realAmount = value;
  }
}

export class TableCostUnit {
  private _servings: number = 0;
  private _packaging: number = 0;
  public _costUnit: number = 0;

  // isso é uma injeção de dependencia => é uma forma mais "fechada".
  // Pq a costUnit depende de outra class, o melhor seria criar uma abstração da classe
  constructor(private readonly tableOfIngredients: TableOfIngredients) {}

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
      this.tableOfIngredients._valuePartialOfRecipe,
      this.servings,
      this.packaging
    );
  }

  get costUnit(): number {
    return this._costUnit;
  }

  addCostUnit() {}
}

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

/* -------------------------------------------------------------------------------- */

/* class Food {
  constructor(
    public ingredients: string,
    public marketWeight: number,
    public marketPrice: number,
    public grossWeight: number
  ) {}

  addFood() {
    if (!Food.validInputs()) return;
    
    const table = selectElement('#foodTable') as HTMLTableElement | null;
    if (!table) {
      console.error('Table element not found');
      return;
    }
    
    const newRow = table.insertRow(2);
    
    const cell1 = newRow.insertCell(0);
    cell1.innerHTML = this.ingredients;

    const cell2 = newRow.insertCell(1);
    cell2.innerHTML = this.marketWeight.toString();

    const cell3 = newRow.insertCell(2);
    cell3.innerHTML = `R$ ${formatNumber(this.marketPrice)}`;

    const cell4 = newRow.insertCell(3);
    cell4.innerHTML = this.grossWeight.toString();

    const cell5 = newRow.insertCell(4);
    const costUni = this.costReal();
    temporaryObj.valueTot += costUni;
    cell5.setAttribute('class', 'thResult');
    cell5.innerHTML = `R$ ${formatNumber(costUni)}`;

    this.addCostTot();
    addCustoUni();
    Food.clearInputs();
  }

  costReal(): number {
    return (this.marketPrice / this.marketWeight) * this.grossWeight;
  }

  addCostTot(): void {
    const div = selectElement('#custoTot');
    const tot = formatNumber(temporaryObj.valueTot);
    if (div) div.innerHTML = `R$ ${tot}`;
  }

  static validInputs(): boolean {
    for (const input of document.querySelectorAll('.inputForm')) {
      if (input instanceof HTMLInputElement) {
        if (!input.value) {
          alert('Preencha os dados corretamente.');
          input.focus();
          return false;
        }
      }
    }
    return true;
  }

  static clearInputs() {
    for (const input of document.querySelectorAll('.inputForm')) {
      if (input instanceof HTMLInputElement) input.value = '';
    }
    const element = selectElement('#ingredients') as HTMLInputElement;
    if (element) element.focus();
  }
}
 */

/* ---------------------------------------------------------------------------- */

/* document.addEventListener('click', function (event: MouseEvent) {
      const el = event.target as HTMLElement;
    
      if (el.classList.contains('btnAdd')) {
        const food = new Food(
          valueIngredient,
          valueMarketWeight,
          valueMarketPrice,
          valueGrossWeight
        );
        food.addFood();
      }
    });
    
    document.addEventListener('input', function (event: Event) {
      const el = event.target as HTMLElement;
    
      if (
        el.classList.contains('inputUnit') ||
        el.classList.contains('inputPacket')
      ) {
        addCustoUni();
      }
      if (el.classList.contains('rangeLucro')) {
        addValorFinal();
      }
      if (
        el.classList.contains('rangeDiasDeTrabalho') ||
        el.classList.contains('inputVendasPorDias') ||
        el.classList.contains('inputGastosFixos')
      ) {
        addCustosFixos();
      }
    });
    
    document.addEventListener('keydown', function (event: KeyboardEvent) {
      const inputs = document.querySelectorAll<HTMLElement>('#foodTable input');
      if (
        event.key === 'Enter' &&
        Array.from(inputs).includes(document.activeElement as HTMLElement)
      ) {
        const food = new ingredient(
          valueIngredient,
          valueMarketWeight,
          valueMarketPrice,
          valueGrossWeight
        );
        table.insert_ingredients(valueIngredient,
          valueMarketWeight,
          valueMarketPrice,
          valueGrossWeight);
      }
    }); */
