// criar controllers para gerenciar as requisições.
/* import { addCustoUni, addCustosFixos, addValorFinal } from './business';
import { selectElement, formatNumber, temporaryObj } from './utils'; */
import { TableOfIngredients, Ingredient, TableCostUnit } from './class';

const tableOfIngredients = new TableOfIngredients();
const comida1 = new Ingredient('comida1', 6, 10, 3);
const comida2 = new Ingredient('comida2', 6, 10, 3);
tableOfIngredients.ingredients = comida1;
tableOfIngredients.ingredients = comida2;

const tableCostUnit = new TableCostUnit(tableOfIngredients);
tableCostUnit.servings = 2;
tableCostUnit.packaging = 1;
tableCostUnit.setCostUnit(); // => 6
console.log(tableCostUnit.costUnit); // => 6
// Chamar pela instancia o valor dos valores de dentro dos obj.
