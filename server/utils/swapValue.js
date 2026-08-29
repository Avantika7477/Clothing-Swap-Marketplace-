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

const CUSTOM_CATEGORY_KEYWORDS = [
  { keywords: ["jacket", "coat", "blazer", "vest", "parka"], base: "Jackets" },
  { keywords: ["hoodie", "sweatshirt", "sweat"], base: "Hoodies" },
  { keywords: ["shirt", "blouse", "top"], base: "Shirts" },
  { keywords: ["t-shirt", "tee", "tshirt"], base: "T-Shirts" },
  { keywords: ["dress", "gown", "skirt"], base: "Dresses" },
  { keywords: ["shoe", "sneaker", "boot", "sandal", "heel"], base: "Shoes" },
  { keywords: ["jean", "denim"], base: "Jeans" },
  { keywords: ["pant", "trouser", "chino"], base: "Pants" },
  { keywords: ["sweater", "cardigan", "knit"], base: "Sweaters" },
  {
    keywords: ["bag", "belt", "hat", "scarf", "watch", "jewelry", "accessory"],
    base: "Accessories",
  },
];

/**
 * Map a free-text custom category to the closest known base category for scoring.
 */
export function resolveCategoryForValue(category, customCategory = "") {
  if (category !== "Other") return category;

  const text = customCategory.trim().toLowerCase();
  if (!text) return "Other";

  for (const entry of CUSTOM_CATEGORY_KEYWORDS) {
    if (entry.keywords.some((keyword) => text.includes(keyword))) {
      return entry.base;
    }
  }

  return "Other";
}

/**
 * Estimate swap value from brand, condition, category, and optional custom category.
 */
export function calculateSwapValue({ brand, condition, category, customCategory }) {
  const resolvedCategory = resolveCategoryForValue(category, customCategory);
  const base = CATEGORY_BASE[resolvedCategory] ?? CATEGORY_BASE.Other;
  const multiplier = CONDITION_MULTIPLIER[condition] ?? 1.0;
  const brandBonus = BRAND_BONUS[brand] ?? 10;

  let value = Math.round(base * multiplier + brandBonus);

  // Small bonus for descriptive custom categories that don't match keywords
  if (category === "Other" && customCategory?.trim() && resolvedCategory === "Other") {
    const lengthBonus = Math.min(15, Math.floor(customCategory.trim().length / 4));
    value += lengthBonus;
  }

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
