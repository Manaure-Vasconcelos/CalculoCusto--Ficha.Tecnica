import { TableCostUnit } from './table.costUnit.service';
import { TableOfIngredients } from './table.ingredients.service';
import { Ingredient } from './ingredient.service';

const comida1 = new Ingredient('comida1', 6, 10, 3);
const tableOfIngredients = new TableOfIngredients(comida1);
const createSut = () => new TableCostUnit(tableOfIngredients);

describe('Testing table costUnit', () => {
  afterEach(() => jest.clearAllMocks());

  it('Should setting the servings recipe', () => {
    const sut = createSut();
    sut.setServings(2);

    expect(sut.getServings()).toBe(2);
  });

  it('Should setting the packaging', () => {
    const sut = createSut();
    sut.setPackaging(2);

    expect(sut.getPackaging()).toBe(2);
  });

  it('should costUnit return to be 0', () => {
    const sut = createSut();

    const result = sut.costUnit();

    expect(result).toBe(0);
  });

  it('should costUnit return to be 3.5', () => {
    const sut = createSut();
    tableOfIngredients.setIngredient(comida1);
    sut.setServings(2);
    sut.setPackaging(1);
    const result = sut.costUnit();

    expect(result).toBe(3.5);
  });
});
