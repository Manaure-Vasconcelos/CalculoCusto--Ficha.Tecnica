// criar controllers para gerenciar as requisições.
/* import { addCustoUni, addCustosFixos, addValorFinal } from './business';
import { selectElement, formatNumber, temporaryObj } from './utils'; */
import { TableOfIngredients, Ingredient, TableCostUnit } from './class';
import { costUnit } from './business';

const tableOfIngredients = new TableOfIngredients();
const comida1 = new Ingredient('comida1', 6, 10, 3);
const comida2 = new Ingredient('comida2', 6, 10, 3);
tableOfIngredients.ingredients = comida1;
tableOfIngredients.ingredients = comida2;
console.log(tableOfIngredients._valuePartialOfRecipe, 'valor final');
console.log('--------------------------------------------------------');

const tableCostUnit = new TableCostUnit();
tableCostUnit.servings = 2;
tableCostUnit.packaging = 1;
console.log(tableCostUnit);
console.log(
  costUnit(
    tableOfIngredients._valuePartialOfRecipe,
    tableCostUnit.servings,
    tableCostUnit.packaging
  )
); // => 6
// Chamar pela instancia o valor dos valores de dentro dos obj.
