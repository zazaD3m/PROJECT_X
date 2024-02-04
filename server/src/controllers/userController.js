import asyncHandler from "express-async-handler";
import { validateObjectId } from "../validations/validations.js";
import { throwErr } from "./errorController.js";
import User from "../models/userModel.js";

// @desc Get all users
// route GET /api/users/
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  if (!users) throwErr("Internal Server Error", 500);
  res.status(200).json(users);
});
