import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { isProduction } from "../utils/helpers.js";
import { clearRefreshToken } from "../services/jwt.js";
import { ThrowErr } from "../utils/CustomError.js";

export const authenticateUser = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    ThrowErr.Unauthorized();
  }

  const accessToken = authHeader.split(" ")[1];

  if (!accessToken) {
    ThrowErr.Unauthorized();
  }

  let userId;

  jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET,
    function (err, decoded) {
      if (err) {
        if (err.name === "TokenExpiredError") {
          ThrowErr.Unauthorized("accessToken expired");
        } else {
          ThrowErr.Unauthorized();
        }
      } else {
        userId = decoded.userId;
      }
    }
  );

  const user = await User.findById(userId);

  if (!user) {
    ThrowErr.NotFound();
  }

  req.user = user;
  next();
});

export const isAdmin = (req, res, next) => {
  const { role } = req.user;
  if (role !== "admin") {
    clearRefreshToken(res);
    ThrowErr.Forbidden("Not admin");
  }
  next();
};

export const checkGoogleAuth = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.googleAuthToken;

  if (!token) {
    ThrowErr.Unauthorized();
  }

  let userId;

  const decoded = jwt.verify(
    token,
    process.env.GOOGLE_TOKEN_SECRET,
    function (err, decoded) {
      if (err) {
        ThrowErr.Unauthorized();
      } else {
        userId = decoded.userId;
      }
    }
  );

  const user = await User.findById(id).lean();

  if (!user) {
    ThrowErr.NotFound();
  }

  req.user = user;
  res.clearCookie("googleAuthToken", {
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict",
  });

  next();
});
