import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import { validateObjectId } from "../validations/validations.js";
import { ThrowErr } from "../utils/CustomError.js";

// @desc Create new product
// route POST /api/products/
export const createProduct = asyncHandler(async (req, res) => {
  const {
    brand,
    color,
    description,
    gender,
    mainCategory,
    subCategory,
    price,
    title,
    newImages: images,
  } = req.body;

  const newProduct = await Product.create({
    brand,
    color,
    description,
    gender,
    mainCategory,
    subCategory,
    price,
    title,
    images,
  });

  if (!newProduct) ThrowErr.ServerError();

  return res.status(201).json(newProduct);
});

// @desc Get product by id
// route GET /api/products/product/:id
export const getProduct = asyncHandler(async (req, res) => {
  const { id: productId } = req.params;
  validateObjectId(productId);

  const product = await Product.findById(productId).lean();

  if (!product) ThrowErr.ServerError();

  res.status(200).json(product);
});
