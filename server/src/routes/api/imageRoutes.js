import { Router } from "express";
import {
  deleteImageFromCloudinary,
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
  .delete(deleteImageFromCloudinary, deleteProductImage);

export default router;
