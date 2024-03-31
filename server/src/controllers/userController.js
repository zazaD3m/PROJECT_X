import asyncHandler from "express-async-handler";
import { validateObjectId } from "../validations/validations.js";
import User from "../models/userModel.js";
import { ThrowErr } from "../utils/CustomError.js";
import { isObjectIdOrHexString, isValidObjectId } from "mongoose";
import Product from "../models/productModel.js";
import { generateObjectId } from "../utils/helpers.js";
import Cart from "../models/cartModel.js";

// @desc Get all users
// route GET /api/users/
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  if (!users) {
    ThrowErr.ServerError();
  }
  res.status(200).json(users);
});

/** ===  CART START === */

// @desc Add product to cart
// route PUT /api/users/user/cart
export const addProductToCart = asyncHandler(async (req, res) => {
  const { _id: userId } = req.user;
  const { productId } = req.body;

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

// @desc GET users cart
// route GET /api/users/user/cart
export const getUserCart = asyncHandler(async (req, res) => {
  const { _id: userId } = req.user;

  const cart = await Cart.findOne({ cartFor: userId }).populate([
    { path: "products", select: "price sale slug title size images.1" },
  ]);

  if (!cart) {
    ThrowErr.BadRequest();
  }

  res.status(200).json(cart);
});

// @desc Remove product from users cart
// route DELETE /api/users/user/cart
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

/** === CART END === */

/** ===  WISHLIST START === */

// @desc Add product to wishlist
// route PUT /api/users/user/wishlist
export const addProductToWishlist = asyncHandler(async (req, res) => {});

// @desc Remove product from wishlist
// route DELETE /api/users/user/wishlist
export const removeProductFromWishlist = asyncHandler(async (req, res) => {});

/** ===  WISHLIST END === */
