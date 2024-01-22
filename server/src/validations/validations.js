import { isObjectIdOrHexString } from "mongoose";
import { CustomError } from "../utils/CustomError.js";

export const validateObjectId = (id) => {
  let isValid;
  if (!Array.isArray(id)) {
    isValid = isObjectIdOrHexString(id);
  } else {
    isValid = !id.some((el) => !isObjectIdOrHexString(el));
  }

  if (!isValid) {
    throw new CustomError("Bad request", 400);
  }
};
