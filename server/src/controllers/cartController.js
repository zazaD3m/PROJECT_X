import asyncHandler from "express-async-handler";

import Cart from "../models/cartModel.js";
import { validateObjectId } from "../validations/validations.js";
import { ThrowErr } from "../utils/CustomError.js";
import { SHIPPING_FEE } from "../utils/constants.js";

// @desc Add product to cart
// route POST /api/carts/
export const addProductToCart = asyncHandler(async (req, res) => {
  const { _id: userId } = req.user;
  const { productId } = req.body;
  validateObjectId(productId);

  let cart = await Cart.findOne({ cartFor: userId });

  if (!cart) {
    cart = await Cart.create({ products: [productId], cartFor: userId });
  } else {
    cart.products.addToSet(productId);
    await cart.save();
  }

  if (!cart) {
    ThrowErr.ServerError();
  }

  res.status(201).json(cart);
});

// @desc Remove product from users cart
// route DELETE /api/carts
export const removeProductFromUserCart = asyncHandler(async (req, res) => {
  const { _id: userId } = req.user;
  const { productId } = req.body;

  let updatedCart = await Cart.findOne({ cartFor: userId });

  if (!updatedCart) {
    ThrowErr.ServerError();
  }

  updatedCart.products.pull(productId);

  await updatedCart.save();

  if (!updatedCart) {
    ThrowErr.ServerError();
  }

  res.status(201).json(updatedCart);
});

// @desc PUT Update cart shipping option
// route PUT /api/carts/shipping
export const updateCartShipping = asyncHandler(async (req, res) => {
  const { _id: userId } = req.user;
  const { shippingType } = req.body;

  const shipping = SHIPPING_FEE[shippingType];

  const cart = await Cart.findOneAndUpdate(
    { cartFor: userId },
    { $set: { shipping } },
    { new: true }
  ).populate([
    { path: "products", select: "price sale slug title size images.1" },
  ]);

  if (!cart) {
    ThrowErr.ServerError();
  }

  res.status(201).json(cart);
});

// @desc GET users cart
// route GET /api/carts
export const getCart = asyncHandler(async (req, res) => {
  const { _id: userId } = req.user;

  let cart = await Cart.findOne({ cartFor: userId }).populate([
    { path: "products", select: "price sale slug title size images.1" },
  ]);

  if (!cart) {
    cart = await Cart.create({ cartFor: userId });
  }

  res.status(200).json(cart);
});
