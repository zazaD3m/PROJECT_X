import { isProduction } from "./helpers";

export const CLIENT_URL = isProduction
  ? process.env.CLIENT_URL_PROD
  : process.env.CLIENT_URL_DEV;

export const ADMIN_URL = isProduction
  ? process.env.ADMIN_URL_PROD
  : process.env.ADMIN_URL_DEV;

export const API_URL = isProduction
  ? process.env.API_URL_PROD
  : process.env.API_URL_DEV;
