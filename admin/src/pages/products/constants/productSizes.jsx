export const PRODUCT_SIZES = {
  clothes: ["XS", "S", "M", "L", "XL", "XXL"],
  shoes: [
    "33",
    "34",
    "35",
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
    "43",
    "44",
  ],
  bottoms: [
    "28-28",
    "28-30",
    "28-32",
    "30-28",
    "30-30",
    "30-32",
    "32-28",
    "32-30",
    "32-32",
  ],
};

export const PRODUCT_SIZE_TYPES = ["clothes", "shoes", "bottoms"];

export const getDefaultSizeType = (size) => {
  for (const type in PRODUCT_SIZES) {
    if (PRODUCT_SIZES[type].includes(size)) {
      return type;
    }
  }
  return "";
};
