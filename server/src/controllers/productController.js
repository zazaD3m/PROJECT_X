import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

import { validateObjectId } from "../validations/validations.js";
import { ThrowErr } from "../utils/CustomError.js";
import { deleteImageFromCloudinary } from "../middleware/imageMiddleware.js";
import Sale from "../models/saleModel.js";

// @desc Create new product
// route POST /api/products/
export const createProduct = asyncHandler(async (req, res) => {
  const newProduct = await Product.create(req.body);

  if (!newProduct) {
    ThrowErr.ServerError();
  }

  await Sale.findOneAndUpdate(
    { saleName: "no sale" },
    { $addToSet: { products: newProduct._id } }
  );

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

// @desc Get All Products
// route GET /api/products
export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().lean();

  if (!products || products.length < 1) {
    ThrowErr.ServerError();
  }

  res.status(200).json(products);
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

// @desc Add sale to products
// route PUT /api/products/applysale
export const updateProductSale = asyncHandler(async (req, res) => {
  const { productIds, saleId, productsAlreadyOnSale } = req.body;
  validateObjectId(productIds);
  validateObjectId(saleId);

  const sale = await Sale.findById(saleId);

  if (!sale || sale.saleType === "coupon") {
    ThrowErr.ServerError();
  }

  // check if there is some other sale on product before applying new
  // and if so go to sale.products and remove productId
  if (Object.keys(productsAlreadyOnSale).length > 0) {
    for (const saleNameToRemove in productsAlreadyOnSale) {
      await Sale.updateOne(
        { saleName: saleNameToRemove },
        {
          $pull: {
            products: { $in: productsAlreadyOnSale[saleNameToRemove] },
          },
        }
      );
    }
  }

  const productUpdateResult = await Product.updateMany(
    { _id: { $in: productIds } },
    {
      $set: {
        sale: {
          saleAmount: sale.saleAmount,
          saleName: sale.saleName,
        },
      },
    }
  );

  const saleUpdateResult = await Sale.findByIdAndUpdate(saleId, {
    $addToSet: { products: { $each: productIds } },
  });

  if (!saleUpdateResult) {
    ThrowErr.ServerError(`Please retry`);
  }

  if (productIds.length !== productUpdateResult.modifiedCount) {
    ThrowErr.ServerError(
      `Sale applied to ${productUpdateResult.modifiedCount} out of ${productIds.length}, Please retry`
    );
  }

  res.status(201).json({
    message: `Success, Sale applied to ${productUpdateResult.modifiedCount} out of ${productIds.length} selected product.`,
  });
});

// @desc Add sale to products
// route PUT /api/products/status
export const updateProductStatus = asyncHandler(async (req, res) => {
  const { productStatus, productIds } = req.body;
  validateObjectId(productIds);

  const updatedProductsResult = await Product.updateMany(
    { _id: { $in: productIds } },
    {
      $set: {
        status: productStatus,
      },
    }
  );

  if (
    updatedProductsResult.modifiedCount !== updatedProductsResult.matchedCount
  ) {
    ThrowErr.ServerError();
  }

  res.status(201).json({
    message: `Success, Status changed to ${productStatus} for selected ${productIds.length} products.`,
  });
});
