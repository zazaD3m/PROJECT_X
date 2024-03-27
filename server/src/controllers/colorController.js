import asyncHandler from "express-async-handler";

import Color from "../models/colorModel.js";
import { validateObjectId } from "../validations/validations.js";
import { ThrowErr } from "../utils/CustomError.js";

// @desc Create new color
// route POST /api/colors/
export const createColor = asyncHandler(async (req, res) => {
  const isDuplicate = await Color.findOne({ colorName: req.body.colorName });

  if (isDuplicate) {
    ThrowErr.Duplicate();
  }

  const newColor = await Color.create(req.body);

  if (!newColor) {
    ThrowErr.ServerError();
  }

  const { colorName, hexValue, _id } = newColor;

  return res.status(201).json({ colorName, hexValue, _id });
});

// @desc Get all Colors
// route GET /api/colors/
export const getAllColors = asyncHandler(async (req, res) => {
  const colors = await Color.find().lean().select(["colorName", "hexValue"]);

  if (!colors) {
    ThrowErr.ServerError();
  }

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

  if (!updatedColor) {
    ThrowErr.ServerError();
  }

  const { colorName, hexValue, _id } = updatedColor;

  res.status(201).json({ colorName, hexValue, _id });
});

// @desc Delete color
// route DELETE /api/colors/color/:colorId
export const deleteColor = asyncHandler(async (req, res) => {
  const { id: colorId } = req.params;
  validateObjectId(colorId);

  const deletedColor = await Color.findByIdAndDelete(colorId);

  if (!deletedColor) {
    ThrowErr.ServerError();
  }

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

  if (!color) {
    ThrowErr.ServerError();
  }

  res.status(200).json(color);
});
