import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import { validateObjectId } from "../validations/validations.js";
import { ThrowErr } from "../utils/CustomError.js";
// import { deleteFromCloudinary } from "../middleware/imageMiddleware.js";

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
    slug,
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
    slug,
    images,
  });

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

  const product = await Product.findById(productId).lean();

  if (!product) {
    ThrowErr.ServerError();
  }

  res.status(200).json(product);
});

// // @desc Delete product image
// // route DELETE /api/products/product/image
// export const deleteProductImage = asyncHandler(async (req, res) => {
//   const { public_id, imageIndex, productId } = req.body;
//   validateObjectId(productId);

//   const { result: imgDelRes } = await deleteFromCloudinary(public_id);

//   if (imgDelRes !== "ok") {
//     ThrowErr.ServerError();
//   }
//   const updatedProduct = await Product.findByIdAndUpdate(productId, {
//     $unset: { [`images.${imageIndex}`]: 1 },
//   });

//   if (!updatedProduct) {
//     ThrowErr.ServerError();
//   }

//   res.status(200).json({ message: "Success" });
// });
