import { Router } from "express";
import {
  createColor,
  getAllColors,
  updateColor,
  deleteColor,
  getColor,
} from "../../controllers/colorController.js";
import {
  colorValidator,
  paramIdValidator,
} from "../../validations/validations.js";
import { validate } from "../../middleware/validationMiddleware.js";

const router = Router();

router
  .route("/")
  .post([colorValidator, validate], createColor)
  .get(getAllColors);

router
  .route("/color/:id")
  .put([paramIdValidator, colorValidator, validate], updateColor)
  .delete([paramIdValidator, validate], deleteColor)
  .get([paramIdValidator, validate], getColor);

export default router;
