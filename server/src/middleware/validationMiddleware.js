import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import { CustomError } from "../utils/CustomError.js";

export const validate = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());

    throw new CustomError("Bad request!", 400);
  }
  next();
});

export const validateRegister = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    errors.array().forEach((err) => {
      if (err.msg === "Email is already taken") {
        throw new CustomError("Email is already taken", 409);
      }
    });
    throw new CustomError("Bad request!", 400);
  }
  next();
});
