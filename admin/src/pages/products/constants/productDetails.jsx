export const getDefaultSizeType = (sizes, size) => {
  const sizeObj = sizes.find((obj) => {
    return obj.sizeNames.map((e) => String(e)).includes(String(size));
  });
  if (sizeObj.sizeType) {
    return sizeObj.sizeType;
  }
  return "";
};

export const PRODUCT_STATUS = ["forsale", "sold", "hidden"];
