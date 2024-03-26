import { isObjectIdOrHexString } from "mongoose";
import { body, checkExact, param } from "express-validator";
import { ThrowErr } from "../utils/CustomError.js";
import { slugify } from "../utils/helpers.js";
import { PRODUCT_STATUS } from "../utils/constants.js";

export const validateObjectId = (id) => {
  let isValid;
  if (!Array.isArray(id)) {
    isValid = isObjectIdOrHexString(id);
  } else {
    isValid = !id.some((el) => !isObjectIdOrHexString(el));
  }

  if (!isValid) {
    ThrowErr.BadRequest();
  }
};

export const brandValidator = [
  body("brandName").notEmpty().trim().escape(),
  checkExact(),
];

export const sizeValidator = [
  body("sizeType").notEmpty().trim().escape(),
  body("sizeName").notEmpty().trim().escape(),
  checkExact(),
];

export const saleValidator = [
  body("saleName").notEmpty().trim().escape(),
  body("expiry").notEmpty().trim().escape(),
  body("saleAmount").notEmpty().trim().escape().isNumeric(),
  checkExact(),
];

export const productValidator = [
  body("description").notEmpty().trim().escape(),
  body("title").notEmpty().trim().escape(),
  body("brand").notEmpty().trim().escape(),
  body("color").notEmpty().trim().escape(),
  body("gender").notEmpty().trim().escape(),
  body("mainCategory").notEmpty().trim().escape(),
  body("subCategory").notEmpty().trim().escape(),
  body("slug").notEmpty().trim().escape().customSanitizer(slugify),
  body("price").notEmpty().trim().escape().toInt(),
];

export const productStatusValidator = [
  body("productStatus").notEmpty().trim().escape().isIn(PRODUCT_STATUS),
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
