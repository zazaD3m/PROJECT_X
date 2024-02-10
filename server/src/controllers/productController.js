import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import { validateObjectId } from "../validations/validations.js";
import { throwErr } from "./errorController.js";

// @desc Create new product
// route POST /api/products/
export const createProduct = asyncHandler(async (req, res) => {
  const newProduct = await Product.create({
    ...req.body,
    price: Number(req.body.price),
  });

  if (!newProduct) throwErr("Server Error", 500);

  return res.status(201).json(newProduct);
});
