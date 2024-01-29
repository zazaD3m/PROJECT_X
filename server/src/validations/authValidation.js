import { body, checkExact } from "express-validator";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

export const loginValidator = [
  body("email").notEmpty().trim().escape().isEmail().normalizeEmail(),
  body("password").notEmpty().trim().escape(),
  checkExact(),
];

export const registerValidator = [
  body("email")
    .notEmpty()
    .trim()
    .escape()
    .isEmail()
    .normalizeEmail()
    .custom(
      asyncHandler(async (value) => {
        const emailIsTaken = await User.findOne({ email: value });
        if (emailIsTaken) {
          throw new Error("Email is already taken");
        }
      })
    ),
  body("password").notEmpty().trim().escape().isStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 0,
    minSymbols: 0,
  }),
  body("firstName").notEmpty().trim().escape().toLowerCase(),
  body("lastName")
    .optional({ values: "falsy" })
    .notEmpty()
    .trim()
    .escape()
    .toLowerCase(),
  body("phoneNumber")
    .optional({ values: "falsy" })
    .notEmpty()
    .trim()
    .escape()
    .toLowerCase(),
  body("address")
    .optional({ values: "falsy" })
    .notEmpty()
    .trim()
    .escape()
    .toLowerCase(),
  checkExact(),
];

export const updateUserValidator = [
  body("email").notEmpty().trim().escape().isEmail().normalizeEmail(),
  body("password").notEmpty().trim().escape(),
  body("newPassword")
    .optional({ values: "falsy" })
    .notEmpty()
    .trim()
    .escape()
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 0,
      minSymbols: 0,
    }),
  body("firstName").notEmpty().trim().escape().toLowerCase(),
  body("lastName")
    .optional({ values: "falsy" })
    .notEmpty()
    .trim()
    .escape()
    .toLowerCase(),
  body("phoneNumber")
    .optional({ values: "falsy" })
    .notEmpty()
    .trim()
    .escape()
    .toLowerCase(),
  body("address")
    .optional({ values: "falsy" })
    .notEmpty()
    .trim()
    .escape()
    .toLowerCase(),
  checkExact(),
];
