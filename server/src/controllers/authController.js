import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { CLIENT_URL } from "../utils/constants.js";
import {
  clearRefreshToken,
  generateRefreshToken,
  generateGoogleToken,
  generateAccessToken,
} from "../services/jwt.js";
import { formatAdminInfo, formatUserInfo } from "../utils/helpers.js";
import { ThrowErr } from "../utils/CustomError.js";

// @desc    Register a new user
// route    POST /api/auth/register
// @access  Public //
export const registerUser = asyncHandler(async (req, res) => {
  const inputData = req.body;

  const newUser = await User.create(inputData);

  if (!newUser) {
    ThrowErr.ServerError();
  }

  const { _id } = newUser;

  generateRefreshToken(res, _id);
  const accessToken = generateAccessToken(_id);

  const formatedUser = formatUserInfo(newUser, accessToken);

  return res.status(201).json(formatedUser);
});

// @desc    login user/set token
// route    POST /api/auth/login
// @access  Public // don't need to be logged in to access
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const foundUser = await User.findOne({ email }).exec();

  if (!(foundUser && (await foundUser.matchPassword(password)))) {
    ThrowErr.Unauthorized();
  }

  generateRefreshToken(res, foundUser._id);
  const accessToken = generateAccessToken(foundUser._id);

  const formatedUser = formatUserInfo(foundUser, accessToken);

  return res.status(201).json(formatedUser);
});

// @desc    Login admin/set token
// route    POST /api/auth/admin-login
// @access  Public //
export const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const foundUser = await User.findOne({ email }).exec();

  if (!foundUser) {
    ThrowErr.Unauthorized();
  }

  if (!(await foundUser.matchPassword(password))) {
    ThrowErr.Unauthorized();
  }

  if (foundUser.role !== "admin") {
    ThrowErr.Unauthorized();
  }

  generateRefreshToken(res, foundUser._id);
  const accessToken = generateAccessToken(foundUser._id);

  const formatedUser = formatAdminInfo(foundUser, accessToken);

  return res.status(201).json(formatedUser);
});

// @desc    Logout user
// route    POST /api/auth/logout
// @access  Public //
export const logoutUser = asyncHandler(async (req, res) => {
  clearRefreshToken(res);
  return res.status(200).json({ message: "User logged out" });
});

// @desc    Update user profile
// route    PUT /api/auth/update
// @access  Private //
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = req.user;
  const newUser = req.body;

  if (!(await user.matchPassword(newUser.password))) {
    ThrowErr.BadRequest("Wrong Password");
  }

  if (newUser.newPassword) {
    user.password = newUser.newPassword;
    delete newUser.newPassword;
    delete newUser.password;
  }

  for (const key in newUser) {
    if (user[key] !== newUser[key]) {
      user[key] = newUser[key];
    }
  }

  const updatedUser = await user.save();

  const formatedUser = formatUserInfo(updatedUser);

  return res.status(201).json(formatedUser);
});

// @desc    Refresh accessToken
// route    GET /api/auth/refresh-token
// @access  Private
export const refresh = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    res.status(401);
    clearRefreshToken(res);
    ThrowErr.Unauthorized();
  }

  let userId;

  const refreshToken = cookies.jwt;
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    function (err, decoded) {
      if (err || !decoded?.userId) {
        clearRefreshToken(res);
        ThrowErr.Unauthorized();
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
  const formatedUser = formatUserInfo(userInfo);

  return res.status(200).json(formatedUser);
});

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
    ThrowErr.ServerError();
  }

  generateRefreshToken(res, _id);
  const accessToken = generateAccessToken(_id);

  return res.status(201).json({ accessToken, userInfo: { name, email } });
});
// GOOGLE AUTH END
