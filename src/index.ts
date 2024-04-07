/* import { addCustoUni, addCustosFixos, addValorFinal } from './business';
import { selectElement, formatNumber, temporaryObj } from './utils'; */
import { TableOfIngredients, Ingredient } from './class';

const table = new TableOfIngredients();
const comida1 = new Ingredient('comida1', 1, 1, 1);
const comida2 = new Ingredient('comida2', 2, 2, 2);
table.ingredients = comida1;
table.ingredients = comida2;
