export const getUniqueValues = (arr, prop) => {
  const uniqueValues = new Set();
  arr.forEach((obj) => {
    if (obj[prop]) {
      uniqueValues.add(obj[prop]);
    }
  });
  return Array.from(uniqueValues);
};

export const convertStringToValueAndLabelObj = (str) => {
  return {
    value: str,
    label: str,
  };
};

export const toNumber = (str) => {
  const num = Number(str);
  return isNaN(num) ? str : num;
};
