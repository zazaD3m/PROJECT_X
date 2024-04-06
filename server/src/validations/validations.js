import { isObjectIdOrHexString } from "mongoose";
import { body, checkExact, param } from "express-validator";
import { ThrowErr } from "../utils/CustomError.js";
import { slugify } from "../utils/helpers.js";
import {
  PRODUCT_GENDER,
  PRODUCT_STATUS,
  SALE_TYPE,
  SHIPPING_FEE,
} from "../utils/constants.js";

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

export const cartValidator = [
  body("productId").isString().notEmpty().trim().escape(),
  checkExact(),
];

export const orderValidator = [
  body("shippingInfoType")
    .isString()
    .notEmpty()
    .trim()
    .escape()
    .isIn(Object.keys(SHIPPING_FEE)),
  body("shippingInfoFee").notEmpty().trim().isNumeric().toFloat(),
  body("shippingInfoFirstName").isString().notEmpty().trim().escape(),
  body("shippingInfoLastName").isString().notEmpty().trim().escape(),
  body("shippingInfoCity").isString().notEmpty().trim().escape(),
  body("shippingInfoAddress").isString().notEmpty().trim().escape(),
  body("shippingInfoPhoneNumber").isString().notEmpty().trim().escape(),
  body("totalPrice").notEmpty().trim().isNumeric().toFloat(),
  body("totalPriceAfterDiscount").notEmpty().trim().isNumeric().toFloat(),
  body("orderItems").isArray(),
  // checkExact(),
];

export const cartShippingValidator = [
  body("shippingType")
    .isString()
    .notEmpty()
    .trim()
    .escape()
    .isIn(Object.keys(SHIPPING_FEE)),
  checkExact(),
];

export const wishlistValidator = [
  body("productId").isString().notEmpty().trim().escape(),
  checkExact(),
];

export const brandValidator = [
  body("brandName").isString().notEmpty().trim().escape(),
  checkExact(),
];

export const sizeValidator = [
  body("sizeType").isString().notEmpty().trim().escape(),
  body("sizeName").isString().notEmpty().trim().escape(),
  checkExact(),
];

export const saleValidator = [
  body("saleName").isString().notEmpty().trim().escape(),
  // body("saleType").isString().notEmpty().trim().escape().isIn(SALE_TYPE),
  body("expiry").isString(),
  body("saleAmount").notEmpty().trim().isNumeric().toFloat(),
  checkExact(),
];

export const productValidator = [
  body("description").isString().notEmpty().trim().escape(),
  body("title").isString().notEmpty().trim().escape(),
  body("brand").isString().notEmpty().trim().escape(),
  body("color").isString().notEmpty().trim().escape(),
  body("gender").isString().notEmpty().trim().escape(),
  body("mainCategory").isString().notEmpty().trim().escape(),
  body("subCategory").isString().notEmpty().trim().escape(),
  body("slug").isString().notEmpty().trim().escape().customSanitizer(slugify),
  body("price").isString().notEmpty().trim().escape().toInt(),
];

export const productStatusValidator = [
  body("productStatus")
    .isString()
    .notEmpty()
    .trim()
    .escape()
    .isIn(PRODUCT_STATUS),
];

export const colorValidator = [
  body("colorName").isString().notEmpty().trim().escape(),
  body("hexValue").isString().notEmpty().trim().escape(),
  checkExact(),
];

export const categoryValidator = [
  body("mainCategoryName").isString().notEmpty().trim().escape(),
  body("isMainCategory").isBoolean(),
  body("subCategoryName")
    .optional({ values: "falsy" })
    .isString()
    .notEmpty()
    .trim()
    .escape(),
  body("genderName")
    .isString()
    .notEmpty()
    .trim()
    .escape()
    .isIn(PRODUCT_GENDER)
    .toLowerCase(),
  checkExact(),
];

export const paramIdValidator = [
  param("id").isString().notEmpty().trim().escape(),
];
