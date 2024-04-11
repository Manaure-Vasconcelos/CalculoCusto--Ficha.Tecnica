/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/business.ts":
/*!*************************!*\
  !*** ./src/business.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.addValorFinal = exports.addCustosFixos = exports.valorFinal = exports.valorGastosFixo = exports.costUnit = exports.totalAmountPerIngredient = void 0;
const utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
const totalAmountPerIngredient = (ingredient) => (ingredient.marketPrice * ingredient.grossWeight) / ingredient.marketWeight;
exports.totalAmountPerIngredient = totalAmountPerIngredient;
const costUnit = (partialValueOfRecipe, servings, packaging) => {
    if (!servings || !packaging)
        return 0;
    const valueCostUnit = partialValueOfRecipe / servings + packaging;
    return valueCostUnit;
};
exports.costUnit = costUnit;
const valorGastosFixo = () => {
    const diasTrabalhados = (0, utils_1.getValueInput)('#rangeDiasDeTrabalho', Number);
    const vendasPorDia = (0, utils_1.getValueInput)('#inputVendasPorDia', Number);
    const gastosFixos = (0, utils_1.getValueInput)('#inputGastosFixos', Number);
    if (vendasPorDia === undefined || gastosFixos === undefined)
        return '0,00';
    if (typeof gastosFixos === 'number' &&
        typeof diasTrabalhados === 'number' &&
        typeof vendasPorDia === 'number') {
        const result = gastosFixos / (diasTrabalhados * 4 * vendasPorDia);
        if (!isNaN(result)) {
            utils_1.temporaryObj.valueGF = result;
            return (0, utils_1.formatNumber)(result);
        }
    }
    return '0,00';
};
exports.valorGastosFixo = valorGastosFixo;
const valorFinal = () => {
    const rangeValue = (0, utils_1.getValueInput)('#rangeLucro', Number);
    const valorFinalProduto = utils_1.temporaryObj.valueUnit + utils_1.temporaryObj.valueGF;
    if (typeof rangeValue === 'number') {
        const resultFinal = valorFinalProduto + valorFinalProduto * (rangeValue / 100);
        return (0, utils_1.formatNumber)(resultFinal);
    }
    return '0,00';
};
exports.valorFinal = valorFinal;
/* export const addCustoUni = () => {
  const value = costUnit();
  setResultInDiv('#divCostUnit', value);
}; */
const addCustosFixos = () => {
    const value = (0, exports.valorGastosFixo)();
    (0, utils_1.setResultInDiv)('#divCustoFixo', value);
};
exports.addCustosFixos = addCustosFixos;
const addValorFinal = () => {
    const value = (0, exports.valorFinal)();
    (0, utils_1.setResultInDiv)('#divLucro', value);
};
exports.addValorFinal = addValorFinal;


/***/ }),

/***/ "./src/class.ts":
/*!**********************!*\
  !*** ./src/class.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TableProfitMargin = exports.TableFixedCosts = exports.TableCostUnit = exports.Ingredient = exports.TableOfIngredients = void 0;
const business_1 = __webpack_require__(/*! ./business */ "./src/business.ts");
class TableOfIngredients {
    constructor() {
        this._ingredients = [];
        this._valuePartialOfRecipe = 0;
    }
    // valor parcial da receita e usar pela intancia no arquivo index.
    set ingredients(ingredient) {
        // addIngredient
        this._ingredients.push(ingredient);
        /* Outra forma => Caso queira inserir todos os elementos novamente substituindo todos os anteriores.
          for (const currentIngredient of ingredients) {
          this._ingredients.push(currentIngredient);
        } */
        ingredient._realAmount = (0, business_1.totalAmountPerIngredient)(ingredient);
        this.setIngredientInTheContents(...this._ingredients);
        this.valuePartialOfRecipe = ingredient._realAmount;
    }
    get ingredients() {
        return this._ingredients;
    }
    set valuePartialOfRecipe(value) {
        this._valuePartialOfRecipe += value;
    }
    getValuePartialOfRecipe() {
        return this._valuePartialOfRecipe;
    }
    setIngredientInTheContents(...ingredients) {
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
exports.TableOfIngredients = TableOfIngredients;
class Ingredient {
    constructor(describe, marketWeight, marketPrice, grossWeight, _realAmount) {
        this.describe = describe;
        this.marketWeight = marketWeight;
        this.marketPrice = marketPrice;
        this.grossWeight = grossWeight;
        this._realAmount = _realAmount;
    }
    set realAmount(value) {
        this._realAmount = value;
    }
}
exports.Ingredient = Ingredient;
class TableCostUnit {
    // isso é uma injeção de dependencia => é uma forma mais "fechada".
    // Pq a costUnit depende de outra class, o melhor seria criar uma abstração da classe
    constructor(tableOfIngredients) {
        this.tableOfIngredients = tableOfIngredients;
        this._servings = 0;
        this._packaging = 0;
        this._costUnit = 0;
    }
    set servings(value) {
        this._servings = value;
        // chamar o custo unitario novamente
    }
    get servings() {
        return this._servings;
    }
    set packaging(value) {
        this._packaging = value;
    }
    get packaging() {
        return this._packaging;
    }
    setCostUnit() {
        this._costUnit = (0, business_1.costUnit)(this.tableOfIngredients._valuePartialOfRecipe, this.servings, this.packaging);
    }
    get costUnit() {
        return this._costUnit;
    }
    addCostUnit() { }
}
exports.TableCostUnit = TableCostUnit;
class TableFixedCosts {
    constructor() {
        this._daysWorked = 0;
        this._salesPerDay = 0;
        this._fixedCosts = 0;
    }
    set daysWorked(value) {
        this._daysWorked;
    }
    get daysWorked() {
        return this._daysWorked;
    }
    set salesPerDay(value) {
        this._salesPerDay = value;
    }
    get salesPerDay() {
        return this._salesPerDay;
    }
    set fixedCosts(value) {
        this._fixedCosts = value;
    }
    get fixedCosts() {
        return this._fixedCosts;
    }
    addFixedCosts() { }
}
exports.TableFixedCosts = TableFixedCosts;
class TableProfitMargin {
    constructor() {
        this._profitMargin = 0;
    }
    set profitMargin(value) {
        this._profitMargin = value;
    }
    get profitMargin() {
        return this._profitMargin;
    }
    addProfitMargin() { }
}
exports.TableProfitMargin = TableProfitMargin;
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


/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setResultInDiv = exports.formatNumber = exports.getValueInput = exports.selectElement = exports.temporaryObj = void 0;
exports.temporaryObj = {
    valueTot: 0,
    valueUnit: 0,
    valueGF: 0
};
const selectElement = (selector) => document.querySelector(selector);
exports.selectElement = selectElement;
const getValueInput = (selector, type) => {
    const element = (0, exports.selectElement)(selector);
    return type(element.value);
};
exports.getValueInput = getValueInput;
const formatNumber = (value) => value.toFixed(2).replace('.', ',');
exports.formatNumber = formatNumber;
const setResultInDiv = (selector, value) => {
    const div = (0, exports.selectElement)(selector);
    if (div)
        div.innerHTML = value;
};
exports.setResultInDiv = setResultInDiv;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
// criar controllers para gerenciar as requisições.
/* import { addCustoUni, addCustosFixos, addValorFinal } from './business';
import { selectElement, formatNumber, temporaryObj } from './utils'; */
const class_1 = __webpack_require__(/*! ./class */ "./src/class.ts");
const tableOfIngredients = new class_1.TableOfIngredients();
const comida1 = new class_1.Ingredient('comida1', 6, 10, 3);
const comida2 = new class_1.Ingredient('comida2', 6, 10, 3);
tableOfIngredients.ingredients = comida1;
tableOfIngredients.ingredients = comida2;
const tableCostUnit = new class_1.TableCostUnit(tableOfIngredients);
tableCostUnit.servings = 2;
tableCostUnit.packaging = 1;
tableCostUnit.setCostUnit(); // => 6
console.log(tableCostUnit.costUnit); // => 6
// Chamar pela instancia o valor dos valores de dentro dos obj.

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map