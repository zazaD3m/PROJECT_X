import { Router } from "express";
import {
  createOrder,
  getAllOrders,
  deleteOrder,
} from "../../controllers/orderController.js";
import {
  orderValidator,
  paramIdValidator,
} from "../../validations/validations.js";
import { validate } from "../../middleware/validationMiddleware.js";
import { isAdmin } from "../../middleware/authMiddleware.js";

const router = Router();

router
  .route("/")
  .post([orderValidator, validate], createOrder)
  .get([isAdmin], getAllOrders);

router
  .route("/order/:id")
  .delete([isAdmin], [paramIdValidator, validate], deleteOrder);

export default router;
