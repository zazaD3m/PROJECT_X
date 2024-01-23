import { Router } from "express";
import brandRoutes from "./brandRoutes.js";
import { authenticateUser, isAdmin } from "../../middleware/authMiddleware.js";
const router = Router();

router.use("/brands", authenticateUser, isAdmin, brandRoutes);

export default router;
