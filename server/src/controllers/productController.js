import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import { validateObjectId } from "../validations/validations.js";
import { ThrowErr } from "../utils/CustomError.js";
import { deleteImageFromCloudinary } from "../middleware/imageMiddleware.js";
// import { deleteFromCloudinary } from "../middleware/imageMiddleware.js";

// @desc Create new product
// route POST /api/products/
export const createProduct = asyncHandler(async (req, res) => {
  const newProduct = await Product.create(req.body);

  if (!newProduct) {
    ThrowErr.ServerError();
  }

  return res.status(201).json(newProduct);
});

// @desc Get product by id
// route GET /api/products/product/:id
export const getProduct = asyncHandler(async (req, res) => {
  const { id: productId } = req.params;
  validateObjectId(productId);

  const product = await Product.findById(productId).lean();

  if (!product) {
    ThrowErr.ServerError();
  }

  res.status(200).json(product);
});

// @desc Update product by id
// route PUT /api/products/product/:id
export const updateProduct = asyncHandler(async (req, res) => {
  const { id: productId } = req.params;
  validateObjectId(productId);
  const updatedProduct = { ...req.body };

  const product = await Product.findByIdAndUpdate(productId, updatedProduct, {
    new: true,
  });

  if (!product) {
    ThrowErr.ServerError();
  }

  res.status(200).json(product);
});

// @desc Delete product
// route DELETE /api/products/product/:id
export const deleteProduct = asyncHandler(async (req, res) => {
  const { id: productId } = req.params;
  validateObjectId(productId);

  const deletedProduct = await Product.findByIdAndDelete(productId);
  if (!deletedProduct) {
    ThrowErr.ServerError();
  }
  if (Object.keys(deletedProduct.images).length < 1) {
    return res.status(200).json({ message: "Product deleted successfully" });
  }

  const retryImageDelete = [];

  for (const key in deletedProduct.images) {
    const public_id = deletedProduct.images[key].public_id;
    const deletedImage = await deleteImageFromCloudinary(public_id);
    if (deletedImage.result !== "ok") {
      retryImageDelete.push(public_id);
    }
  }

  if (retryImageDelete.length > 0) {
    for (const e of retryImageDelete) {
      await deleteImageFromCloudinary(e);
    }
  }

  res.status(200).json({ message: "Product deleted successfully" });
});
