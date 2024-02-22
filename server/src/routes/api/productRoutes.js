import { Router } from "express";
import {
  multerUpload,
  uploadToCloudinary,
} from "../../middleware/imageMiddleware.js";
import { authenticateUser, isAdmin } from "../../middleware/authMiddleware.js";
import {
  createProduct,
  // getAllProducts,
  updateProduct,
  deleteProduct,
  // deleteProductImage,
  getProduct,
} from "../../controllers/productController.js";
import {
  productValidator,
  paramIdValidator,
} from "../../validations/validations.js";
import { validate } from "../../middleware/validationMiddleware.js";

const router = Router();

router
  .route("/")
  .post(
    [authenticateUser, isAdmin],
    [productValidator, validate],
    createProduct
  );

// .get(getAllProducts);

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
//   .get([paramIdValidator, validate], getProduct);

// router.route("/product/image").delete(deleteProductImage);

export default router;
