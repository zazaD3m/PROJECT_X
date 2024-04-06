import { Schema, model } from "mongoose";

const { ObjectId } = Schema.Types;

const orderSchema = new Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
    },
    shippingInfo: {
      shipping: {
        type: { type: String, default: "standard" },
        fee: { type: Number, default: 5 },
      },
      firstName: { type: String },
      lastName: { type: String },
      city: { type: String },
      address: { type: String },
      phoneNumber: { type: String },
    },
    orderItems: [
      {
        type: ObjectId,
        ref: "Product",
      },
    ],
    paymentInfo: {
      id: { type: String },
      method: { type: String },
      amount: { type: Number },
      paydAt: { type: Date },
      currency: { type: String },
    },
    totalPrice: { type: Number },
    totalPriceAfterDiscount: { type: Number },
    subTotal: { type: Number },
    orderStatus: {
      type: String,
      default: "Initial",
    },
  },
  { timestamps: true }
);

const Order = model("Order", orderSchema, "orders");

export default Order;
