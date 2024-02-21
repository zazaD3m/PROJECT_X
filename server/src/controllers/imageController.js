import asyncHandler from "express-async-handler";
import { ThrowErr } from "../utils/CustomError.js";

// @desc Upload Product Image
// route POST /api/images/product
export const uploadProductImage = asyncHandler(async (req, res) => {
  if (!req.body.newImage) {
    ThrowErr.ServerError();
  }
  res.status(201).json(req.body.newImage);
});

// @desc Delete Product Image
// route DELETE /api/images/product
export const deleteProductImage = asyncHandler(async (req, res) => {
  const { message } = req.body;
  if (!message) {
    ThrowErr.ServerError();
  }
  if (message !== "ok") {
    ThrowErr.ServerError();
  }
  res.status(200).json({ message: message });
});
