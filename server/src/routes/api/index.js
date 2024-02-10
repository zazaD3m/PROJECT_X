import { Router } from "express";
import { authenticateUser, isAdmin } from "../../middleware/authMiddleware.js";

import brandRoutes from "./brandRoutes.js";
import colorRoutes from "./colorRoutes.js";
import userRoutes from "./userRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import productRoutes from "./productRoutes.js";

const router = Router();

router.use("/brands", authenticateUser, isAdmin, brandRoutes);
router.use("/colors", authenticateUser, isAdmin, colorRoutes);
router.use("/categories", authenticateUser, isAdmin, categoryRoutes);
router.use("/products", authenticateUser, isAdmin, productRoutes);
router.use("/users", userRoutes);

export default router;
