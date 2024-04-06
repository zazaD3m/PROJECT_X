import asyncHandler from "express-async-handler";

import Sale from "../models/saleModel.js";
import Product from "../models/productModel.js";
import { validateObjectId } from "../validations/validations.js";
import { ThrowErr } from "../utils/CustomError.js";

// @desc Create new sale
// route POST /api/sales/
export const createSale = asyncHandler(async (req, res) => {
  const newSale = await Sale.create(req.body);

  if (!newSale) {
    ThrowErr.ServerError();
  }

  return res.status(201).json(newSale);
  // return res.status(201).json({ message: "success" });
});

// @desc Get all Sales
// route GET /api/sales/
export const getAllSales = asyncHandler(async (req, res) => {
  const sales = await Sale.find().lean();

  if (!sales) {
    ThrowErr.ServerError();
  }

  res.status(200).json(sales);
});

// @desc Delete sale and reset products to sale: 0
// route DELETE /api/sales/sale/:saleId
export const deleteSale = asyncHandler(async (req, res) => {
  const { id: saleId } = req.params;
  validateObjectId(saleId);

  const sale = await Sale.findById(saleId);

  if (!sale) {
    ThrowErr.ServerError();
  }
  const productIds = sale.products;

  if (productIds?.length > 0) {
    const updatedProducts = await Product.updateMany(
      { _id: { $in: productIds } },
      { $set: { sale: { saleAmount: 0, saleName: "no sale" } } }
    );
    if (updatedProducts.matchedCount !== updatedProducts.modifiedCount) {
      ThrowErr.ServerError();
    }
  }

  // if (sale.saleType === "discount") {
  await Sale.findOneAndUpdate(
    { saleName: "no sale" },
    {
      $push: { products: { $each: productIds } },
    }
  );
  // }

  const deletedSale = await sale.deleteOne();

  if (deletedSale.deletedCount !== 1) {
    ThrowErr.ServerError();
  }

  res.status(200).json(sale);
});
