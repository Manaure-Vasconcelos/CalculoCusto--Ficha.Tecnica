export interface IIngredient {
  describe: string;
  marketWeight: number;
  marketPrice: number;
  grossWeight: number;
  _realAmount?: number;
}

/* export interface ItableOfIngredients {
  _ingredients: IIngredient[];
  setIngredientInTheContents(): void;
  setPartialValueOfRecipe(): void;
} */
