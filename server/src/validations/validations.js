import { isObjectIdOrHexString } from "mongoose";
import { body, checkExact } from "express-validator";
import { throwErr } from "../controllers/errorController.js";

export const validateObjectId = (id) => {
  let isValid;
  if (!Array.isArray(id)) {
    isValid = isObjectIdOrHexString(id);
  } else {
    isValid = !id.some((el) => !isObjectIdOrHexString(el));
  }

  if (!isValid) {
    throwErr("Bad request", 400);
  }
};

export const brandValidator = [
  body("title").notEmpty().trim().escape(),
  checkExact(),
];
