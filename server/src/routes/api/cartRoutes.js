import { Router } from "express";
import {
  addProductToCart,
  getCart,
  removeProductFromUserCart,
  updateCartShipping,
} from "../../controllers/cartController.js";
import {
  cartShippingValidator,
  cartValidator,
} from "../../validations/validations.js";
import { validate } from "../../middleware/validationMiddleware.js";

const router = Router();

router
  .route("/")
  .get(getCart)
  .put([cartValidator, validate], addProductToCart)
  .delete([cartValidator, validate], removeProductFromUserCart);

router
  .route("/shipping")
  .put([cartShippingValidator, validate], updateCartShipping);

export default router;
