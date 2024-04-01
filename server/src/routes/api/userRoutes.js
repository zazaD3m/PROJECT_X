import { Router } from "express";
// import { validate } from "../../middleware/validationMiddleware.js";
import {
  getAllUsers,
  addProductToCart,
  getUserCart,
  removeProductFromUserCart,
  addProductToWishlist,
  removeProductFromWishlist,
} from "../../controllers/userController.js";
import { isAdmin } from "../../middleware/authMiddleware.js";
import { validate } from "../../middleware/validationMiddleware.js";
import {
  cartValidator,
  wishlistValidator,
} from "../../validations/validations.js";
import { getMe } from "../../controllers/userController.js";

const router = Router();

router.route("/").get([isAdmin], getAllUsers);

router.route("/user").get(getMe);

router
  .route("/user/wishlist")
  .put([wishlistValidator, validate], addProductToWishlist)
  .delete([wishlistValidator, validate], removeProductFromWishlist);

router
  .route("/user/cart")
  .get(getUserCart)
  .put([cartValidator, validate], addProductToCart)
  .delete([cartValidator, validate], removeProductFromUserCart);

export default router;
