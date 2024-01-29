import asyncHandler from "express-async-handler";

import Brand from "../models/brandModel.js";
import { validateObjectId } from "../validations/validations.js";
import { throwErr } from "./errorController.js";

// @desc Create new brand
// route POST /api/brands/
export const createBrand = asyncHandler(async (req, res) => {
  const { brandName } = req.body;

  const newBrand = await Brand.create({ brandName });

  if (!newBrand) throwErr("Server error", 500);

  return res.status(201).json(newBrand);
});

// @desc Get all Brands
// route GET /api/brands/
export const getAllBrands = asyncHandler(async (req, res) => {
  const brands = await Brand.find().lean();

  if (!brands) throwErr("Server error", 500);

  res.status(200).json(brands);
});

// @desc Update brand
// route PUT /api/brands/brand/:brandId
export const updateBrand = asyncHandler(async (req, res) => {
  const { id: brandId } = req.params;
  const { brandName } = req.body;
  validateObjectId(brandId);

  const updatedBrand = await Brand.findByIdAndUpdate(
    brandId,
    { brandName },
    {
      new: true,
    }
  );

  if (!updatedBrand) throwErr("Server error", 500);

  res.status(201).json(updatedBrand);
});

// @desc Delete brand
// route DELETE /api/brands/brand/:brandId
export const deleteBrand = asyncHandler(async (req, res) => {
  const { id: brandId } = req.params;
  validateObjectId(brandId);

  const deletedBrand = await Brand.findByIdAndDelete(brandId);

  if (!deletedBrand) throwErr("Server error", 500);

  res.status(200).json(deletedBrand);
});

// @desc Get brand
// route GET /api/brand/:brandId
export const getBrand = asyncHandler(async (req, res) => {
  const { id: brandId } = req.params;
  validateObjectId(brandId);

  const brand = await Brand.findById(brandId).lean();

  if (!brand) throwErr("Server error", 500);

  res.status(200).json(brand);
});
