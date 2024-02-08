import { Router } from "express";
import {
  createCategory,
  getAllCategories,
} from "../../controllers/categoryController.js";
import {
  categoryValidator,
  // paramIdValidator,
} from "../../validations/validations.js";
import { validate } from "../../middleware/validationMiddleware.js";

const router = Router();

// /api/categories/
router
  .route("/")
  .post([categoryValidator, validate], createCategory)
  .get(getAllCategories);

// router
//   .route("/brand/:id")
//   .put([paramIdValidator, brandValidator, validate], updateBrand)
//   .delete([paramIdValidator, validate], deleteBrand)
//   .get([paramIdValidator, validate], getBrand);

export default router;
