/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
const selected_1 = __webpack_require__(/*! ./selected */ "./src/selected.ts");
(function () {
    const temporaryObj = {
        valueTot: 0,
        valueUnit: 0,
        valueGF: 0
    };
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
            addCustoUni();
        }
        if (el.classList.contains('rangeLucro')) {
            addValorFinal();
        }
        if (el.classList.contains('rangeDiasDeTrabalho') ||
            el.classList.contains('inputVendasPorDias') ||
            el.classList.contains('inputGastosFixos')) {
            addCustosFixos();
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
            const table = selectElement('#foodTable');
            const newRow = table.insertRow(2);
            const cell1 = newRow.insertCell(0);
            cell1.innerHTML = this.ingredients;
            const cell2 = newRow.insertCell(1);
            cell2.innerHTML = this.marketWeight;
            const cell3 = newRow.insertCell(2);
            cell3.innerHTML = `R$ ${formatNumber(this.marketPrice)}`;
            const cell4 = newRow.insertCell(3);
            cell4.innerHTML = this.grossWeight;
            const cell5 = newRow.insertCell(4);
            const costUni = this.costReal();
            temporaryObj.valueTot += costUni;
            cell5.setAttribute('class', 'thResult');
            cell5.innerHTML = `R$ ${formatNumber(costUni)}`;
            const cell6 = newRow.insertCell(5);
            const btnEdit = Food.createButtonElement(1);
            cell6.appendChild(btnEdit);
            this.addCostTot();
            addCustoUni();
            Food.clearInputs();
        }
        costReal() {
            return (this.marketPrice / this.marketWeight) * this.grossWeight;
        }
        addCostTot() {
            const div = selectElement('#custoTot');
            const tot = formatNumber(temporaryObj.valueTot);
            div.innerHTML = `R$ ${tot}`;
        }
        static validInputs() {
            for (const input of document.querySelectorAll('.inputForm')) {
                if (!input.value) {
                    alert('Preencha os dados corretamente.');
                    input.focus();
                    return false;
                }
            }
            return true;
        }
        static createButtonElement(el) {
            if (el === 1) {
                const btn = document.createElement('button');
                btn.setAttribute('id', 'btnEdit');
                btn.setAttribute('onclick', 'editElement(this)');
                btn.innerHTML = `<span class="material-icons">
        edit
        </span>`;
                return btn;
            }
            if (el === 2) {
                const btn = document.createElement('button');
                btn.setAttribute('id', 'btnDelete');
                /* btnEdit.setAttribute("onclick", "editElement()"); */
                btn.innerHTML += `<span class="material-icons">
        delete
        </span>`;
                return btn;
            }
        }
        static clearInputs() {
            for (const input of document.querySelectorAll('.inputForm')) {
                input.value = '';
            }
            selectElement('#ingredients').focus();
        }
    }
    const addCustoUni = () => addValue(custoUni, '#divCostUnit');
    const addCustosFixos = () => addValue(valorGastosFixo, '#divCustoFixo');
    const addValorFinal = () => addValue(valorFinal, '#divLucro');
    const addValue = (calcFunction, selector) => {
        const value = calcFunction();
        setResultInDiv(selector, value);
    };
    const setResultInDiv = (selector, value) => {
        const div = selectElement(selector);
        div.innerHTML = value;
    };
    const custoUni = () => {
        const unitValue = getValueInput('#inputUnit', Number);
        const packetValue = getValueInput('#packetValue', Number);
        if (!unitValue || !temporaryObj.valueTot)
            return 'R$ 0,00';
        const result = temporaryObj.valueTot / unitValue + packetValue;
        temporaryObj.valueUnit = result;
        return formatNumber(result);
    };
    const valorGastosFixo = () => {
        const diasTrabalhados = getValueInput('#rangeDiasDeTrabalho', Number);
        const vendasPorDia = getValueInput('#inputVendasPorDia', Number);
        const gastosFixos = getValueInput('#inputGastosFixos', Number);
        if (!vendasPorDia || !gastosFixos)
            return '0,00';
        const result = gastosFixos / (diasTrabalhados * 4 * vendasPorDia);
        temporaryObj.valueGF = result;
        return formatNumber(result);
    };
    const valorFinal = () => {
        const rangeValue = getValueInput('#rangeLucro', Number);
        const valorFinalProduto = temporaryObj.valueUnit + temporaryObj.valueGF;
        const resultFinal = valorFinalProduto + valorFinalProduto * (rangeValue / 100);
        return formatNumber(resultFinal);
    };
    const selectElement = (selector) => document.querySelector(selector);
    const getValueInput = (selector, type) => type(document.querySelector(selector).value);
    const formatNumber = (value) => value.toFixed(2).replace('.', ',');
})();

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map