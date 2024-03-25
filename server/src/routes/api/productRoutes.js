import { Router } from "express";
import {
  multerUpload,
  uploadToCloudinary,
} from "../../middleware/imageMiddleware.js";
import { authenticateUser, isAdmin } from "../../middleware/authMiddleware.js";
import {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  uuuuu,
  // deleteProductImage,
  getProduct,
  updateProductSale,
} from "../../controllers/productController.js";
import {
  productValidator,
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
  )
  .put(uuuuu);

// .get(getAllProducts);
router.route("/applysale").put([authenticateUser, isAdmin], updateProductSale);

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
