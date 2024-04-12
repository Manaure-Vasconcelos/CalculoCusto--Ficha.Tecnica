import { TableOfIngredients } from './table.ingredients.service';
import { Ingredient } from './ingredient.service';

const food1 = new Ingredient('comida1', 6, 10, 3);
const createSut = () => new TableOfIngredients(food1);

describe('Testing table ingredients', () => {
  it('should setting ingredient in array', () => {
    const sut = createSut();

    const ingredients = sut.getIngredient();
    sut.setIngredient(food1);
    expect(ingredients).toEqual([food1]);
  });

  it('Should setting value partial of recipe', () => {
    const sut = createSut();
    sut.setIngredient(food1);

    const valuePartial = sut.getValuePartialOfRecipe();
    expect(valuePartial).toBe(5);
  });

  it('Should called methods in setIngredient', () => {
    const sut = createSut();
    const methodSetRealAmoutSpy = jest.spyOn(
      Ingredient.prototype,
      'setRealAmount'
    );
    const methodSetValuePartialSpy = jest
      .spyOn(TableOfIngredients.prototype, 'setValuePartialOfRecipe')
      .mockImplementation(() => {});
    sut.setIngredient(food1);

    expect(methodSetRealAmoutSpy).toHaveBeenCalledTimes(1);
    expect(methodSetValuePartialSpy).toHaveBeenCalledTimes(1);
  });
});
