import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { CLIENT_URL } from "../utils/constants.js";
import { throwErr } from "./errorController.js";
import {
  clearRefreshToken,
  generateRefreshToken,
  generateGoogleToken,
  generateAccessToken,
} from "../services/jwt.js";

// GOOGLE AUTH START

// @desc    Redirect to client google auth route
// route    GET /api/auth/google/redirect
// @access  Public // don't need to be logged in to access
export const googleLoginCallback = asyncHandler(async (req, res) => {
  const { id } = req.user;
  generateGoogleToken(res, id);
  return res.redirect(`${CLIENT_URL}/auth/google/getuser`);
});

// @desc    Auth user/set token
// route    GET /api/auth/google/getuser
// @access  Public // don't need to be logged in to access
export const googleGetUser = asyncHandler(async (req, res) => {
  // Gets user data from checkGoogleAuth middleware
  const { name, email, _id } = req.user;

  if (!name || !email || !_id) {
    throwErr("Internal server error", 500);
  }

  generateRefreshToken(res, _id);
  const accessToken = generateAccessToken(_id);

  return res.status(201).json({ accessToken, userInfo: { name, email } });
});
// GOOGLE AUTH END

// @desc    Auth user/set token
// route    POST /api/auth/login
// @access  Public // don't need to be logged in to access
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const foundUser = await User.findOne({ email }).exec();

  if (foundUser && (await foundUser.matchPassword(password))) {
    generateRefreshToken(res, foundUser._id);
    const accessToken = generateAccessToken(foundUser._id);
    return res.status(201).json({
      accessToken,
      userInfo: { name: foundUser.name, email: foundUser.email },
    });
  } else {
    throwErr("Unauthorized", 401);
  }
});

// @desc    Refresh accessToken
// route    GET /api/auth/refresh-token
// @access  Private
export const refresh = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    res.status(401);
    clearRefreshToken(res);
    throwErr("Unauthorized", 401);
  }

  let userId;

  const refreshToken = cookies.jwt;
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    function (err, decoded) {
      if (err || !decoded?.userId) {
        clearRefreshToken(res);
        throwErr("Unauthorized", 401);
      } else {
        userId = decoded.userId;
      }
    }
  );

  const accessToken = generateAccessToken(userId);

  return res.status(201).json({ accessToken });
});

// @desc    Get userInfo using authMiddleware
// route    GET /api/auth/me
// @access Private
export const getMe = asyncHandler(async (req, res) => {
  const userInfo = req.user;
  return res
    .status(200)
    .json({ userInfo: { name: userInfo.name, email: userInfo.email } });
});

// @desc    Register a new user
// route    POST /api/auth/register
// @access  Public //
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email }).lean();

  if (userExists) {
    throwErr("User already exists", 409);
  }

  const newUser = await User.create({
    name,
    email,
    password,
  });

  if (!newUser) {
    throwErr("Internal server error", 500);
  }

  const { _id } = newUser;

  generateRefreshToken(res, _id);
  const accessToken = generateAccessToken(_id);

  return res.status(201).json({ accessToken, userInfo: { name, email } });
});

// @desc    Logout user
// route    POST /api/auth/logout
// @access  Public //
export const logoutUser = asyncHandler(async (req, res) => {
  const cookies = req.cookies;

  clearRefreshToken(res);

  return res.status(200).json({ message: "User logged out" });
});

// @desc    Update user profile
// route    PUT /api/auth/updateuser
// @access  Private //
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = { ...req.user };

  if (req.body.name) {
    user.name = req.body.name;
  }
  if (req.body.password) {
    user.password = req.body.password;
  }

  const updateUser = await User.findByIdAndUpdate(req.user._id, user);
  return res
    .status(201)
    .json({ userInfo: { name: updateUser.name, email: updateUser.email } });
});
