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

  console.log(typeof totalPriceAfterDiscount);
  console.log(typeof shippingInfoFee);

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

// @desc Delete order and reset products to order: 0
// route DELETE /api/orders/order/:orderId
export const deleteOrder = asyncHandler(async (req, res) => {
  const { id: orderId } = req.params;
  validateObjectId(orderId);

  const order = await Order.findById(orderId);

  if (!order) {
    ThrowErr.ServerError();
  }
  const productIds = order.products;

  if (productIds?.length > 0) {
    const updatedProducts = await Product.updateMany(
      { _id: { $in: productIds } },
      { $set: { order: { orderAmount: 0, orderName: "no order" } } }
    );
    if (updatedProducts.matchedCount !== updatedProducts.modifiedCount) {
      ThrowErr.ServerError();
    }
  }

  if (order.orderType === "discount") {
    await Order.findOneAndUpdate(
      { orderName: "no order" },
      {
        $push: { products: { $each: productIds } },
      }
    );
  }

  const deletedOrder = await order.deleteOne();

  if (deletedOrder.deletedCount !== 1) {
    ThrowErr.ServerError();
  }

  res.status(200).json(order);
});
