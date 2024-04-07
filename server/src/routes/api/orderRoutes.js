import { Router } from "express";
import {
  createOrder,
  getAllOrders,
  deleteOrder,
  getOrderById,
  getAllUserOrders,
  updateOrder,
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

router.route("/user-orders").get(getAllUserOrders);

router
  .route("/order/:id")
  .delete([isAdmin], [paramIdValidator, validate], deleteOrder)
  .get([isAdmin], [paramIdValidator, validate], getOrderById)
  .put([isAdmin], [paramIdValidator, validate], updateOrder);

export default router;
