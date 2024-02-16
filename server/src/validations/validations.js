import { isObjectIdOrHexString } from "mongoose";
import { body, checkExact, param } from "express-validator";
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
  body("brandName").notEmpty().trim().escape().toLowerCase(),
  checkExact(),
];

export const productValidator = [
  body("description").notEmpty().trim().escape(),
  body("title").notEmpty().trim().escape(),
  body("price").notEmpty().trim().escape().toInt(),
];

export const colorValidator = [
  body("colorName").notEmpty().trim().escape().toLowerCase(),
  body("hexValue").notEmpty().trim().escape(),
  checkExact(),
];

export const categoryValidator = [
  body("mainCategoryName").notEmpty().trim().escape(),
  body("isMainCategory").isBoolean(),
  body("subCategoryName")
    .optional({ values: "falsy" })
    .notEmpty()
    .trim()
    .escape(),
  body("genderName")
    .notEmpty()
    .trim()
    .escape()
    .isIn(["woman", "man", "girl", "boy"])
    .toLowerCase(),
  checkExact(),
];

export const paramIdValidator = [param("id").notEmpty().trim().escape()];
