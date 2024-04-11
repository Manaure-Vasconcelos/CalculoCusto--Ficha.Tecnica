export interface IngredientProtocol {
  describe: string;
  marketWeight: number;
  marketPrice: number;
  grossWeight: number;
  _realAmount?: number;
  totalAmountPerIngredient(ingredient: IngredientProtocol): number;
  realAmount: number;
}
