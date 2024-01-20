import { Router } from "express";
import localAuthRoutes from "./localAuthRoutes.js";
import googleAuthRoutes from "./googleAuthRoutes.js";
import apiRoutes from "./api/index.js";

const router = Router();

router.use("/auth/google", googleAuthRoutes);
router.use("/auth", localAuthRoutes);
router.use("/", apiRoutes);

export default router;
