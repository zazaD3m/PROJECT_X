import { Router } from "express";
import {
  getMe,
  loginUser,
  logoutUser,
  refresh,
  registerUser,
  updateUserProfile,
  loginAdmin,
} from "../controllers/authController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";
import {
  loginValidator,
  registerValidator,
  updateUserValidator,
} from "../validations/authValidation.js";
import {
  validate,
  validateRegister,
} from "../middleware/validationMiddleware.js";

// /api/auth
const router = Router();

router.post("/register", [registerValidator, validateRegister], registerUser);

router.post("/login", [loginValidator, validate], loginUser);

router.post("/admin-login", [loginValidator, validate], loginAdmin);

router.post("/logout", logoutUser);

router.put(
  "/update",
  authenticateUser,
  [updateUserValidator, validate],
  updateUserProfile
);

// @desc - give user new access token
router.get("/refresh-token", refresh);

// @desc - give back user info
router.get("/me", authenticateUser, getMe);

export default router;
