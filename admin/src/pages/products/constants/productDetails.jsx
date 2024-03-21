export const getDefaultSizeType = (sizes, size) => {
  const sizeObj = sizes.find((obj) => obj.sizeNames.includes(size));
  if (sizeObj.sizeType) {
    return sizeObj.sizeType;
  }
  return "";
};

export const PRODUCT_STATUS = ["forsale", "sold", "transit"];
