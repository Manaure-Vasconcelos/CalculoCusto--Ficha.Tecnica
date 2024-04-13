import { TableCostUnit } from './table.costUnit.service';
import { TableOfIngredients } from './table.ingredients.service';
import { Ingredient } from './ingredient.service';

const comida1 = new Ingredient('comida1', 6, 10, 3);
const tableOfIngredients = new TableOfIngredients(comida1);
const createSut = () => new TableCostUnit(tableOfIngredients);

describe('Testing table costUnit', () => {
  it('should return to be 0', () => {
    const sut = createSut();

    const result = sut.costUnit();

    expect(result).toBe(0);
  });

  it('should return to be 3.5', () => {
    const sut = createSut();
    sut.setServings(2);
    sut.setPackaging(1);
    tableOfIngredients.setIngredient(comida1);
    const result = sut.costUnit();

    expect(result).toBe(3.5);
  });
});
