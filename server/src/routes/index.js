import { Router } from "express";
import localAuthRoutes from "./localAuthRoutes.js";
import googleAuthRoutes from "./googleAuthRoutes.js";
import apiRoutes from "./api/index.js";
import { throwErr } from "../controllers/errorController.js";

const router = Router();

router.use("/auth/google", googleAuthRoutes);
router.use("/auth", localAuthRoutes);
router.use("/", apiRoutes);

router.all("*", (req, res, next) => {
  throwErr(`Can't find ${req.originalUrl} on the server!`, 404);
});

export default router;
