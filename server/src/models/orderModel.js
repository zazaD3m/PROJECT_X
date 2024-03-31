import { Schema, model } from "mongoose";

const { ObjectId } = Schema.Types;

const orderSchema = new Schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
        },
      },
    ],
    paymentIntent: {
      type: Object,
    },
    orderStatus: {
      type: String,
      default: "Not Processed",
      enum: [
        "Not Processed",
        "Cash on Delivery",
        "Processing",
        "Dispatched",
        "Cancelled",
        "Delivered",
      ],
    },
    orderBy: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Order = model("Order", orderSchema, "orders");

export default Order;
