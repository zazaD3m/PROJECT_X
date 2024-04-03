import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getMainCategories,
} from "../../controllers/categoryController.js";
import {
  categoryValidator,
  paramIdValidator,
} from "../../validations/validations.js";
import { validate } from "../../middleware/validationMiddleware.js";

const router = Router();

router
  .route("/")
  .post([categoryValidator, validate], createCategory)
  .get(getAllCategories);

router.route("/maincategories").get(getMainCategories);
router
  .route("/category/:id")
  .delete([paramIdValidator, validate], deleteCategory);

export default router;
