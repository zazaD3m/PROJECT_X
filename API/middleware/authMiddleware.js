import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { throwErr } from "../controllers/errorController.js";
import { isProduction } from "../utils/helpers.js";

export const authenticateUser = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    throwErr("Unauthorized", 401);
  }

  const accessToken = authHeader.split(" ")[1];

  if (!accessToken) {
    throwErr("Unauthorized", 401);
  }

  let userId;

  jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET,
    function (err, decoded) {
      if (err) {
        if (err.name === "TokenExpiredError") {
          throwErr("accessToken expired", 401);
        } else {
          throwErr("Unauthorized", 401);
        }
      } else {
        userId = decoded.userId;
      }
    }
  );

  const user = await User.findById(userId).lean();

  if (!user) {
    throwErr("User not found, try again.", 404);
  }

  req.user = user;
  next();
});

export const checkGoogleAuth = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.googleAuthToken;

  if (!token) {
    throwErr("Unauthorized", 401);
  }

  let userId;

  const decoded = jwt.verify(
    token,
    process.env.GOOGLE_TOKEN_SECRET,
    function (err, decoded) {
      if (err) {
        throwErr("Unauthorized", 401);
      } else {
        userId = decoded.userId;
      }
    }
  );

  const user = await User.findById(id).lean();

  if (!user) {
    throwErr("User not found, try again.", 404);
  }

  req.user = user;
  res.clearCookie("googleAuthToken", {
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict",
  });

  next();
});
