import asyncHandler from "express-async-handler";

import Category from "../models/categoryModel.js";
import { validateObjectId } from "../validations/validations.js";
import { throwErr } from "./errorController.js";

// @desc Create new category
// route POST /api/categories/
export const createCategory = asyncHandler(async (req, res) => {
  const { mainCategoryName, isMainCategory, genderName, subCategoryName } =
    req.body;

  const tempNewCategory = { mainCategoryName, isMainCategory, genderName };

  if (subCategoryName && isMainCategory) {
    throwErr("Bad request", 400);
  }

  if (!subCategoryName && !isMainCategory) {
    throwErr("Bad request", 400);
  }

  if (subCategoryName) {
    tempNewCategory.subCategoryName = subCategoryName;
  }

  const duplicateCategory = await Category.findOne(tempNewCategory).lean();

  if (duplicateCategory) {
    throwErr("Category already exists", 409);
  }

  const newCategory = await Category.create(tempNewCategory);

  if (!newCategory) {
    throwErr("Server error", 500);
  }

  return res.status(201).json(newCategory);
});

// @desc Get all categories
// route GET /api/categories
export const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();

  if (!categories) {
    throwErr("Server Error", 500);
  }

  res.status(200).json(categories);
});
