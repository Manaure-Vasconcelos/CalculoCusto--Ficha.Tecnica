import { IngredientProtocol } from '../interfaces/ingredient';

export class Ingredient implements IngredientProtocol {
  constructor(
    public describe: string,
    public marketWeight: number,
    public marketPrice: number,
    public grossWeight: number,
    public _realAmount?: number
  ) {}

  totalAmountPerIngredient(ingredient: IngredientProtocol): number {
    return (
      (ingredient.marketPrice * ingredient.grossWeight) /
      ingredient.marketWeight
    );
  }

  set realAmount(value: number) {
    this._realAmount = value;
  }
}
