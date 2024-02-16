import { Router } from "express";
import {
  multerUpload,
  uploadToCloudinary,
} from "../../middleware/uploadImageMiddleware.js";
import { authenticateUser, isAdmin } from "../../middleware/authMiddleware.js";
import {
  createProduct,
  // getAllProducts,
  // updateProduct,
  // deleteProduct,
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
    multerUpload.array("images", 4),
    uploadToCloudinary,
    createProduct
  );

// .get(getAllProducts);

router.route("/product/:id").get([paramIdValidator, validate], getProduct);
//   .delete([paramIdValidator, validate], deleteProduct)
//   .get([paramIdValidator, validate], getProduct);

export default router;
