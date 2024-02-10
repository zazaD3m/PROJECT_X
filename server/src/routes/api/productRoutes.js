import { Router } from "express";
import {
  createProduct,
  // getAllProducts,
  // updateProduct,
  // deleteProduct,
  // getProduct,
} from "../../controllers/productController.js";
import {
  productValidator,
  // paramIdValidator,
} from "../../validations/validations.js";
import { validate } from "../../middleware/validationMiddleware.js";

const router = Router();

router.route("/").post(
  // [productValidator, validate],
  createProduct
);
// .get(getAllProducts);

// router
//   .route("/product/:id")
//   .put([paramIdValidator, productValidator, validate], updateProduct)
//   .delete([paramIdValidator, validate], deleteProduct)
//   .get([paramIdValidator, validate], getProduct);

export default router;
