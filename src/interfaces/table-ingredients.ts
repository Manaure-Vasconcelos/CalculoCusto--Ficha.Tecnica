import { IngredientProtocol } from './ingredient';

export interface TableOfIngredientsProtocol {
  ingredientService: IngredientProtocol;
  setIngredient(ingredient: IngredientProtocol): void;
  getIngredient(): IngredientProtocol[];
  setValuePartialOfRecipe(): void;
  getValuePartialOfRecipe(): number;
  setIngredientInTheContents(...ingredients: IngredientProtocol[]): void;
}
