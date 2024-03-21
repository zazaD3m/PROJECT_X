import asyncHandler from "express-async-handler";

import Category from "../models/categoryModel.js";
import { validateObjectId } from "../validations/validations.js";
import { ThrowErr } from "../utils/CustomError.js";

// @desc Create new category
// route POST /api/categories/
export const createCategory = asyncHandler(async (req, res) => {
  const { mainCategoryName, isMainCategory, genderName, subCategoryName } =
    req.body;

  const tempNewCategory = { mainCategoryName, isMainCategory, genderName };

  if (subCategoryName && isMainCategory) {
    ThrowErr.BadRequest();
  }

  if (!subCategoryName && !isMainCategory) {
    ThrowErr.BadRequest();
  }

  if (subCategoryName) {
    tempNewCategory.subCategoryName = subCategoryName;
  }

  const duplicateCategory = await Category.findOne(tempNewCategory).lean();

  if (duplicateCategory) {
    ThrowErr.Conflict("Category already exists");
  }

  const newCategory = await Category.create(tempNewCategory);

  if (!newCategory) {
    ThrowErr.ServerError();
  }

  return res.status(201).json(newCategory);
});

// @desc Get all categories
// route GET /api/categories
export const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().lean();

  if (!categories) {
    ThrowErr.ServerError();
  }

  res.status(200).json(categories);
});

// @desc Get all categories
// route GET /api/categories
export const getMainCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().lean();

  if (!categories || categories.length < 1) {
    ThrowErr.ServerError();
  }

  const mainCategories = [];

  categories.forEach((cat) => {
    if (!cat.isMainCategory) return;
    if (mainCategories.includes(cat.mainCategoryName)) return;
    mainCategories.push(cat.mainCategoryName);
  });

  res.status(200).json(mainCategories);
});
