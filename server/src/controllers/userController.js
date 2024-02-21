import asyncHandler from "express-async-handler";
import { validateObjectId } from "../validations/validations.js";
import User from "../models/userModel.js";
import { ThrowErr } from "../utils/CustomError.js";

// @desc Get all users
// route GET /api/users/
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  if (!users) {
    ThrowErr.ServerError();
  }
  res.status(200).json(users);
});
