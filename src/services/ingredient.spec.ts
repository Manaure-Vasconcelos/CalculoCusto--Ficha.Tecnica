import { Ingredient } from './ingredient.service';

const createSut = (
  describe: string,
  marketWeight: number,
  marketPrice: number,
  grossWeight: number,
  _realAmount?: number
): Ingredient => {
  return new Ingredient(
    describe,
    marketWeight,
    marketPrice,
    grossWeight,
    _realAmount
  );
};

describe('Testing Ingredient class', () => {
  afterEach(() => jest.clearAllMocks());

  it('should initialize the properties correctly', () => {
    const describe = 'Test Ingredient';
    const marketWeight = 10;
    const marketPrice = 20;
    const grossWeight = 5;

    const sut = createSut(describe, marketWeight, marketPrice, grossWeight);

    expect(sut).toHaveProperty('describe', 'Test Ingredient');
    expect(sut).toHaveProperty('marketWeight', 10);
    expect(sut).toHaveProperty('marketPrice', 20);
    expect(sut).toHaveProperty('grossWeight', 5);
    expect(sut._realAmount).toBeUndefined();
  });

  it('should return the usual cost of the ingredient', () => {
    const food1 = createSut('comida2', 6, 10, 3);

    food1.setRealAmount();

    expect(food1._realAmount).toBe(5);
  });
});
