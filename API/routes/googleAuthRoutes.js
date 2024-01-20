import { Router } from "express";
import passport from "passport";
import { CLIENT_URL } from "../utils/constants.js";
import { checkGoogleAuth } from "../middleware/authMiddleware.js";
import {
  googleGetUser,
  googleLoginCallback,
} from "../controllers/authController.js";

// /auth/google
const router = Router();

router.get(
  "/",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: CLIENT_URL,
  }),
  googleLoginCallback
);

router.get("/google/getuser", checkGoogleAuth, googleGetUser);

export default router;
