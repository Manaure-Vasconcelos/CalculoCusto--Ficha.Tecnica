import { IngredientProtocol } from './ingredient';

export interface TableOfIngredientsProtocol {
  setIngredient(ingredient: IngredientProtocol): void;
  getIngredient(): IngredientProtocol[];
  setValuePartialOfRecipe(): void;
  getValuePartialOfRecipe(): number;
  setIngredientInTheContents(...ingredients: IngredientProtocol[]): void;
}
