import { Router } from "express";
import {
  getAllUsers,
  addProductToWishlist,
  removeProductFromWishlist,
  getMe,
} from "../../controllers/userController.js";
import { isAdmin } from "../../middleware/authMiddleware.js";
import { validate } from "../../middleware/validationMiddleware.js";
import { wishlistValidator } from "../../validations/validations.js";

const router = Router();

router.route("/").get([isAdmin], getAllUsers);

router.route("/user").get(getMe);

router
  .route("/user/wishlist")
  .put([wishlistValidator, validate], addProductToWishlist)
  .delete([wishlistValidator, validate], removeProductFromWishlist);

export default router;
