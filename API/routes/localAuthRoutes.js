import { Router } from "express";
import {
  getMe,
  loginUser,
  logoutUser,
  refresh,
  registerUser,
  updateUserProfile,
} from "../controllers/authController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

// /api/auth
const router = Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.put("/update", authenticateUser, updateUserProfile);

// @desc - give user new access token
router.get("/refresh-token", refresh);

// @desc - give back user info
router.get("/me", authenticateUser, getMe);

export default router;
