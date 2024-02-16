import { Router } from "express";
import { authenticateUser, isAdmin } from "../../middleware/authMiddleware.js";

import brandRoutes from "./brandRoutes.js";
import colorRoutes from "./colorRoutes.js";
import userRoutes from "./userRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import productRoutes from "./productRoutes.js";
import { throwErr } from "../../controllers/errorController.js";

const router = Router();

router.use("/brands", authenticateUser, isAdmin, brandRoutes);
router.use("/colors", authenticateUser, isAdmin, colorRoutes);
router.use("/categories", authenticateUser, isAdmin, categoryRoutes);
router.use("/products", productRoutes);
router.use("/users", authenticateUser, isAdmin, userRoutes);

export default router;
