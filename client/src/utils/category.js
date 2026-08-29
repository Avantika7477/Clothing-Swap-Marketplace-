export const LISTING_CATEGORIES = [
  "Jackets",
  "Hoodies",
  "Shirts",
  "T-Shirts",
  "Dresses",
  "Shoes",
  "Pants",
  "Jeans",
  "Sweaters",
  "Accessories",
  "Other",
];

export const LISTING_CONDITIONS = ["Like New", "Excellent", "Good", "Fair", "Worn"];

export const getDisplayCategory = (item) => {
  if (!item) return "";
  if (item.category === "Other" && item.customCategory?.trim()) {
    return item.customCategory.trim();
  }
  return item.category || "";
};
