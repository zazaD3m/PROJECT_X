import { isProduction } from "./helpers.js";

export const CLIENT_URL = isProduction
  ? process.env.CLIENT_URL_PROD
  : process.env.CLIENT_URL_DEV;

export const ADMIN_URL = isProduction
  ? process.env.ADMIN_URL_PROD
  : process.env.ADMIN_URL_DEV;

export const API_URL = isProduction
  ? process.env.API_URL_PROD
  : process.env.API_URL_DEV;

export const PRODUCT_STATUS = ["forsale", "hidden", "sold"];

export const PRODUCT_GENDER = ["woman", "man", "girl", "boy"];

export const SHIPPING_FEE = {
  free: {
    type: "free",
    fee: 0,
  },
  standard: {
    type: "standard",
    fee: 5,
  },
  express: {
    type: "express",
    fee: 10,
  },
  minPriceForFreeType: 150,
};

export const SALE_TYPE = ["coupon", "discount"];

export const ORDER_STATUS = [
  "Initial",
  "Paid",
  "Awaiting dispatch",
  "Dispatched",
  "Delivered",
  "Cancelled",
];
