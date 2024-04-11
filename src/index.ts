// criar controllers para gerenciar as requisições.
import { TableOfIngredients } from './services/table.ingredients.service';
import { Ingredient } from './services/ingredient.service';
import { TableCostUnit } from './services/table.costUnit.service';

const comida1 = new Ingredient('comida1', 6, 10, 3);
const comida2 = new Ingredient('comida2', 6, 10, 3);
const tableOfIngredients = new TableOfIngredients(comida1);
tableOfIngredients.setIngredient(comida1);
tableOfIngredients.setIngredient(comida2);

const tableCostUnit = new TableCostUnit(tableOfIngredients);
tableCostUnit.servings = 2;
tableCostUnit.packaging = 1;
tableCostUnit.setCostUnit();
console.log(tableCostUnit.costUnit); // => 6
