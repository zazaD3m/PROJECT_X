import { Router } from "express";
import {
  createSale,
  getAllSales,
  // updateSale,
  deleteSale,
  // getSale,
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
  // .put([paramIdValidator, saleValidator, validate], updateSale)
  .delete(
    [authenticateUser, isAdmin],
    [paramIdValidator, validate],
    deleteSale
  );
// .get([paramIdValidator, validate], getSale);

export default router;
