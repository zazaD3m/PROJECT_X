import asyncHandler from "express-async-handler";

import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import { validateObjectId } from "../validations/validations.js";
import { ThrowErr } from "../utils/CustomError.js";
import Cart from "../models/cartModel.js";
import Sale from "../models/saleModel.js";
import { SHIPPING_FEE } from "../utils/constants.js";

// @desc Create new order
// route POST /api/orders/
export const createOrder = asyncHandler(async (req, res) => {
  const { _id: userId } = req.user;
  const {
    shippingInfoType,
    shippingInfoFee,
    shippingInfoFirstName,
    shippingInfoLastName,
    shippingInfoCity,
    shippingInfoAddress,
    shippingInfoPhoneNumber,
    totalPrice,
    totalPriceAfterDiscount,
    orderItems,
  } = req.body;
  validateObjectId(orderItems);

  const newOrderObject = {
    user: userId,
    shippingInfo: {
      shipping: {
        type: shippingInfoType,
        fee: shippingInfoFee,
      },
      firstName: shippingInfoFirstName,
      lastName: shippingInfoLastName,
      city: shippingInfoCity,
      address: shippingInfoAddress,
      phoneNumber: shippingInfoPhoneNumber,
    },
    totalPrice,
    totalPriceAfterDiscount,
    subTotal: totalPriceAfterDiscount + shippingInfoFee,
    orderItems,
  };

  let newOrder = await Order.create(newOrderObject);

  newOrder = await newOrder.populate([
    { path: "orderItems", select: "price sale slug title size images.1" },
  ]);

  if (!newOrder) {
    ThrowErr.ServerError();
  }

  return res.status(201).json(newOrder);
  // return res.status(201).json({ message: "success" });
});

// @desc Get all Orders
// route GET /api/orders/
export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().lean();

  if (!orders) {
    ThrowErr.ServerError();
  }

  res.status(200).json(orders);
});

// @desc Get user's all orders
// route GET /api/orders/user-orders
export const getAllUserOrders = asyncHandler(async (req, res) => {
  const { _id: userId } = req.user;

  const userOrders = await Order.find({ user: userId }).populate([
    { path: "orderItems", select: "price sale slug title size images.1" },
  ]);

  if (!userOrders) {
    ThrowErr.ServerError();
  }

  res.status(200).json(userOrders);
});

// @desc Get order by id
// route GET /api/orders/order/:orderId
export const getOrderById = asyncHandler(async (req, res) => {
  const { id: orderId } = req.params;
  validateObjectId(orderId);

  const order = await Order.findById(orderId);

  if (!order) {
    ThrowErr.ServerError();
  }

  res.status(200).json(order);
});

// @desc Update order
// route PUT /api/orders/order/:orderId
export const updateOrder = asyncHandler(async (req, res) => {
  const { id: orderId } = req.params;
  validateObjectId(orderId);

  const updatedOrder = await Order.findByIdAndUpdate(
    { _id: orderId },
    req.body,
    { new: true }
  );

  if (!updatedOrder) {
    ThrowErr.ServerError();
  }

  res.status(201).json(updatedOrder);
});

// @desc Delete order
// route DELETE /api/orders/order/:orderId
export const deleteOrder = asyncHandler(async (req, res) => {
  const { id: orderId } = req.params;
  validateObjectId(orderId);

  const order = await Order.findByIdAndDelete(orderId);

  if (!order) {
    ThrowErr.ServerError();
  }

  res.status(201).json(order);
});
