/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/business.ts":
/*!*************************!*\
  !*** ./src/business.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.addValorFinal = exports.addCustosFixos = exports.addCustoUni = exports.valorFinal = exports.valorGastosFixo = exports.custoUni = void 0;
const utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
const custoUni = () => {
    const unitValue = (0, utils_1.getValueInput)('#inputUnit', Number);
    const packetValue = (0, utils_1.getValueInput)('#packetValue', Number);
    if (!unitValue || !utils_1.temporaryObj.valueTot)
        return 'R$ 0,00';
    if (typeof unitValue === 'number' && typeof packetValue === 'number') {
        const result = utils_1.temporaryObj.valueTot / unitValue + packetValue;
        utils_1.temporaryObj.valueUnit = result;
        return (0, utils_1.formatNumber)(result);
    }
    return '0,00';
};
exports.custoUni = custoUni;
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
const addCustoUni = () => {
    const value = (0, exports.custoUni)();
    (0, utils_1.setResultInDiv)('#divCostUnit', value);
};
exports.addCustoUni = addCustoUni;
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

/***/ "./src/selected.ts":
/*!*************************!*\
  !*** ./src/selected.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.valueGrossWeight = exports.valueMarketPrice = exports.valueMarketWeight = exports.valueIngredient = void 0;
exports.valueIngredient = String(document.querySelector('#ingredients'));
exports.valueMarketWeight = Number(document.querySelector('#ingredients'));
exports.valueMarketPrice = Number(document.querySelector('#ingredients'));
exports.valueGrossWeight = Number(document.querySelector('#ingredients'));


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
const business_1 = __webpack_require__(/*! ./business */ "./src/business.ts");
const utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
const selected_1 = __webpack_require__(/*! ./selected */ "./src/selected.ts");
document.addEventListener('click', function (event) {
    const el = event.target;
    if (el.classList.contains('btnAdd')) {
        const food = new Food(selected_1.valueIngredient, selected_1.valueMarketWeight, selected_1.valueMarketPrice, selected_1.valueGrossWeight);
        food.addFood();
    }
});
document.addEventListener('input', function (event) {
    const el = event.target;
    if (el.classList.contains('inputUnit') ||
        el.classList.contains('inputPacket')) {
        (0, business_1.addCustoUni)();
    }
    if (el.classList.contains('rangeLucro')) {
        (0, business_1.addValorFinal)();
    }
    if (el.classList.contains('rangeDiasDeTrabalho') ||
        el.classList.contains('inputVendasPorDias') ||
        el.classList.contains('inputGastosFixos')) {
        (0, business_1.addCustosFixos)();
    }
});
document.addEventListener('keydown', function (event) {
    const inputs = document.querySelectorAll('#foodTable input');
    if (event.key === 'Enter' &&
        Array.from(inputs).includes(document.activeElement)) {
        const food = new Food(selected_1.valueIngredient, selected_1.valueMarketWeight, selected_1.valueMarketPrice, selected_1.valueGrossWeight);
        food.addFood();
    }
});
class Food {
    constructor(ingredients, marketWeight, marketPrice, grossWeight) {
        this.ingredients = ingredients;
        this.marketWeight = marketWeight;
        this.marketPrice = marketPrice;
        this.grossWeight = grossWeight;
    }
    addFood() {
        if (!Food.validInputs())
            return;
        const table = (0, utils_1.selectElement)('#foodTable');
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
        cell3.innerHTML = `R$ ${(0, utils_1.formatNumber)(this.marketPrice)}`;
        const cell4 = newRow.insertCell(3);
        cell4.innerHTML = this.grossWeight.toString();
        const cell5 = newRow.insertCell(4);
        const costUni = this.costReal();
        utils_1.temporaryObj.valueTot += costUni;
        cell5.setAttribute('class', 'thResult');
        cell5.innerHTML = `R$ ${(0, utils_1.formatNumber)(costUni)}`;
        this.addCostTot();
        (0, business_1.addCustoUni)();
        Food.clearInputs();
    }
    costReal() {
        return (this.marketPrice / this.marketWeight) * this.grossWeight;
    }
    addCostTot() {
        const div = (0, utils_1.selectElement)('#custoTot');
        const tot = (0, utils_1.formatNumber)(utils_1.temporaryObj.valueTot);
        if (div)
            div.innerHTML = `R$ ${tot}`;
    }
    static validInputs() {
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
            if (input instanceof HTMLInputElement)
                input.value = '';
        }
        const element = (0, utils_1.selectElement)('#ingredients');
        if (element)
            element.focus();
    }
}

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map