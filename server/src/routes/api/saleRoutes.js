import { Router } from "express";
import {
  createSale,
  getAllSales,
  deleteSale,
} from "../../controllers/saleController.js";
import {
  saleValidator,
  paramIdValidator,
} from "../../validations/validations.js";
import { validate } from "../../middleware/validationMiddleware.js";
import { authenticateUser, isAdmin } from "../../middleware/authMiddleware.js";

const router = Router();

router
  .route("/")
  .post([authenticateUser, isAdmin], [saleValidator, validate], createSale)
  .get([authenticateUser, isAdmin], getAllSales);

router
  .route("/sale/:id")
  .delete(
    [authenticateUser, isAdmin],
    [paramIdValidator, validate],
    deleteSale
  );

export default router;
