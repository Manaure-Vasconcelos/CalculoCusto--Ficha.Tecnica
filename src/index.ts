import { addCustoUni, addCustosFixos, addValorFinal } from './business';
import { selectElement, formatNumber, temporaryObj } from './utils';
import {
  valueIngredient,
  valueMarketWeight,
  valueMarketPrice,
  valueGrossWeight
} from './selected';

const comida1 = new Ingredient('comida1', 6, 10, 3);
const comida2 = new Ingredient('comida2', 6, 10, 3);
const tableOfIngredients = new TableOfIngredients(comida1);
tableOfIngredients.setIngredient(comida1);
tableOfIngredients.setIngredient(comida2);

const tableCostUnit = new TableCostUnit(tableOfIngredients);
tableCostUnit.setServings(2);
tableCostUnit.setPackaging(1);
tableCostUnit.setCostUnit();
console.log(tableCostUnit.getCostUnit()); // => 6

