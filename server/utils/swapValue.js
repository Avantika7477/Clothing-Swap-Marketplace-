const CATEGORY_BASE = {
  Jackets: 100,
  Hoodies: 80,
  Shirts: 70,
  "T-Shirts": 50,
  Dresses: 90,
  Shoes: 110,
  Pants: 75,
  Jeans: 85,
  Sweaters: 80,
  Accessories: 40,
  Other: 55,
};

const CONDITION_MULTIPLIER = {
  "Like New": 1.2,
  Excellent: 1.1,
  Good: 1.0,
  Fair: 0.75,
  Worn: 0.5,
};

const BRAND_BONUS = {
  "Levi's": 25,
  Nike: 30,
  Adidas: 28,
  Zara: 15,
  "H&M": 10,
  Uniqlo: 12,
  Gucci: 80,
  "Ralph Lauren": 40,
  Puma: 20,
  Gap: 12,
  Forever21: 8,
};

/**
 * Estimate swap value from brand, condition, and category.
 */
export function calculateSwapValue({ brand, condition, category }) {
  const base = CATEGORY_BASE[category] ?? CATEGORY_BASE.Other;
  const multiplier = CONDITION_MULTIPLIER[condition] ?? 1.0;
  const brandBonus = BRAND_BONUS[brand] ?? 10;
  const value = Math.round(base * multiplier + brandBonus);
  return Math.max(20, value);
}

/**
 * Compare two item values and suggest if swap is fair.
 * Fair when difference is within 20% of the higher value.
 */
export function compareSwapValues(valueA, valueB) {
  const higher = Math.max(valueA, valueB);
  const lower = Math.min(valueA, valueB);
  const diff = higher - lower;
  const percentDiff = higher === 0 ? 0 : Math.round((diff / higher) * 100);
  const isFair = percentDiff <= 20;

  return {
    valueA,
    valueB,
    difference: diff,
    percentDiff,
    isFair,
    suggestion: isFair
      ? "This looks like a fair swap based on estimated values."
      : `Values differ by ~${percentDiff}%. Consider negotiating or offering an additional item.`,
  };
}

export { CATEGORY_BASE, CONDITION_MULTIPLIER };
