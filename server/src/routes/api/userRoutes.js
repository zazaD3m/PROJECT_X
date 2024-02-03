import { Router } from "express";
import { validate } from "../../middleware/validationMiddleware.js";
import { authenticateUser, isAdmin } from "../../middleware/authMiddleware.js";
import { getAllUsers } from "../../controllers/userController.js";

const router = Router();

router.route("/").get(authenticateUser, isAdmin, getAllUsers);

export default router;
