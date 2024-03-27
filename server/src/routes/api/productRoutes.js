import { Router } from "express";
import { authenticateUser, isAdmin } from "../../middleware/authMiddleware.js";
import {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProduct,
  updateProductSale,
  updateProductStatus,
} from "../../controllers/productController.js";
import {
  productValidator,
  productStatusValidator,
  paramIdValidator,
} from "../../validations/validations.js";
import { validate } from "../../middleware/validationMiddleware.js";

const router = Router();

router
  .route("/")
  .get([authenticateUser, isAdmin], getAllProducts)
  .post(
    [authenticateUser, isAdmin],
    [productValidator, validate],
    createProduct
  );

router
  .route("/product/:id")
  .get([paramIdValidator, validate], getProduct)
  .put(
    [authenticateUser, isAdmin],
    [paramIdValidator, productValidator, validate],
    updateProduct
  )
  .delete(
    [authenticateUser, isAdmin],
    [paramIdValidator, validate],
    deleteProduct
  );

router.route("/applysale").put([authenticateUser, isAdmin], updateProductSale);
router
  .route("/status")
  .put(
    [authenticateUser, isAdmin],
    [productStatusValidator, validate],
    updateProductStatus
  );

export default router;
