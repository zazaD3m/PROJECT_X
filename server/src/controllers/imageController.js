import asyncHandler from "express-async-handler";
import { ThrowErr } from "../utils/CustomError.js";
import Product from "../models/productModel.js";

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
  const { message, productId, imageIndex } = req.body;
  if (!message || message !== "ok") {
    ThrowErr.ServerError();
  }
  if (!productId) {
    return res.status(200).json({ message: "Image deleted successfully" });
  }
  if (!imageIndex) {
    ThrowErr.ServerError();
  }

  const updatedProduct = await Product.findByIdAndUpdate(productId, {
    $unset: { [`images.${imageIndex}`]: 1 },
  });

  if (!updatedProduct) {
    ThrowErr.ServerError();
  }

  res.status(200).json({ message: "Image deleted successfully" });
});
