import { Router } from "express";
import {
  createBrand,
  getAllBrands,
  updateBrand,
  deleteBrand,
  getBrand,
} from "../../controllers/brandController.js";
import { brandValidator } from "../../validations/validations.js";
import { validate } from "../../middleware/validationMiddleware.js";

const router = Router();

router
  .route("/")
  .post([brandValidator, validate], createBrand)
  .get(getAllBrands);

router
  .route("/brand/:brandId")
  .put([brandValidator, validate], updateBrand)
  .delete(deleteBrand)
  .get(getBrand);

export default router;
