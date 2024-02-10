import asyncHandler from "express-async-handler";

import Product from "../models/productModel.js";
import { validateObjectId } from "../validations/validations.js";
import { throwErr } from "./errorController.js";

// @desc Create new product
// route POST /api/products/
export const createProduct = asyncHandler(async (req, res) => {
  // const { productName } = req.body;

  // const newProduct = await Product.create({ productName });

  // if (!newProduct) throwErr("Server error", 500);

  console.log(req.body);

  return res.status(201).json({ message: "Succ" });
});
