import { TableProfitMargin } from './table.profitMargin.service';
import { TableOfIngredients } from './table.ingredients.service';
import { TableCostUnit } from './table.costUnit.service';
import { Ingredient } from './ingredient.service';

const comida1 = new Ingredient('comida1', 6, 10, 3);
const tableOfIngredients = new TableOfIngredients(comida1);
tableOfIngredients.setIngredient(comida1);
const tableCostUnit = new TableCostUnit(tableOfIngredients);
const createSut = () =>
  new TableProfitMargin(tableOfIngredients, tableCostUnit);

describe('Testing table profit margin', () => {
  afterEach(() => jest.clearAllMocks());

  it('should return value with margin', () => {
    const sut = createSut();

    expect(sut.valueWithMargin()).toBe(7.5);
  });
});
