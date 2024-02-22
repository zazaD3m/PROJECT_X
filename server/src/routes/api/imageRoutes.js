import { Router } from "express";
import {
  deleteImageFromCloudinaryMiddleware,
  multerUpload,
  uploadToCloudinary,
} from "../../middleware/imageMiddleware.js";
import {
  deleteProductImage,
  uploadProductImage,
} from "../../controllers/imageController.js";

const router = Router();

router
  .route("/product")
  .post(
    multerUpload.single("productImage"),
    uploadToCloudinary,
    uploadProductImage
  )
  .delete(deleteImageFromCloudinaryMiddleware, deleteProductImage);

export default router;
