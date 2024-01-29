import { Router } from "express";
import {
  createBrand,
  getAllBrands,
  updateBrand,
  deleteBrand,
  getBrand,
} from "../../controllers/brandController.js";
import {
  brandValidator,
  paramIdValidator,
} from "../../validations/validations.js";
import { validate } from "../../middleware/validationMiddleware.js";

const router = Router();

router
  .route("/")
  .post([brandValidator, validate], createBrand)
  .get(getAllBrands);

router
  .route("/brand/:id")
  .put([paramIdValidator, brandValidator, validate], updateBrand)
  .delete([paramIdValidator, validate], deleteBrand)
  .get([paramIdValidator, validate], getBrand);

export default router;
