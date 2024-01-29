import asyncHandler from "express-async-handler";

import Color from "../models/colorModel.js";
import { validateObjectId } from "../validations/validations.js";
import { throwErr } from "./errorController.js";

// @desc Create new color
// route POST /api/colors/
export const createColor = asyncHandler(async (req, res) => {
  const newColor = await Color.create(req.body);

  if (!newColor) throwErr("Server error", 500);

  const { colorName, hexValue, _id } = newColor;

  return res.status(201).json({ colorName, hexValue, _id });
});

// @desc Get all Colors
// route GET /api/colors/
export const getAllColors = asyncHandler(async (req, res) => {
  const colors = await Color.find().lean().select(["colorName", "hexValue"]);

  if (!colors) throwErr("Server error", 500);

  res.status(200).json(colors);
});

// @desc Update color
// route PUT /api/colors/color/:colorId
export const updateColor = asyncHandler(async (req, res) => {
  const { id: colorId } = req.params;
  validateObjectId(colorId);

  const updatedColor = await Color.findByIdAndUpdate(colorId, req.body, {
    new: true,
  });

  if (!updatedColor) throwErr("Server error", 500);

  const { colorName, hexValue, _id } = updatedColor;

  res.status(201).json({ colorName, hexValue, _id });
});

// @desc Delete color
// route DELETE /api/colors/color/:colorId
export const deleteColor = asyncHandler(async (req, res) => {
  const { id: colorId } = req.params;
  validateObjectId(colorId);

  const deletedColor = await Color.findByIdAndDelete(colorId);

  if (!deletedColor) throwErr("Server error", 500);

  const { colorName, hexValue, _id } = deletedColor;

  res.status(200).json({ colorName, hexValue, _id });
});

// @desc Get color
// route GET /api/color/:colorId
export const getColor = asyncHandler(async (req, res) => {
  const { id: colorId } = req.params;
  validateObjectId(colorId);

  const color = await Color.findById(colorId)
    .lean()
    .select(["colorName", "hexValue"]);

  if (!color) throwErr("Server error", 500);

  res.status(200).json(color);
});
