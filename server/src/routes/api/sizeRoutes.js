import { Router } from "express";
import {
  createSize,
  getAllSizes,
  deleteSize,
  getAllSizesForFilter,
} from "../../controllers/sizeController.js";
import {
  sizeValidator,
  paramIdValidator,
} from "../../validations/validations.js";
import { validate } from "../../middleware/validationMiddleware.js";
import { authenticateUser, isAdmin } from "../../middleware/authMiddleware.js";

const router = Router();

router
  .route("/")
  .post([authenticateUser, isAdmin], [sizeValidator, validate], createSize)
  .get([authenticateUser, isAdmin], getAllSizes)
  .delete([authenticateUser, isAdmin], [sizeValidator, validate], deleteSize);

router
  .route("/filtered-sizes")
  .get([authenticateUser, isAdmin], getAllSizesForFilter);

export default router;
