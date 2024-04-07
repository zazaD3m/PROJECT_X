import mongoose, { Schema, model } from "mongoose";
import { SHIPPING_FEE } from "../utils/constants.js";

const { ObjectId } = mongoose.Schema.Types;

const cartSchema = new Schema({
  total: {
    type: Number,
    default: 0,
  },
  totalAfterDiscount: {
    type: Number,
    default: 0,
  },
  products: [
    {
      type: ObjectId,
      ref: "Product",
    },
  ],
  cartFor: {
    index: true,
    type: ObjectId,
    ref: "User",
  },
});

cartSchema.pre("save", async function (next) {
  try {
    if (this.products.length < 1) {
      next();
    }
    // Populate products and calculate totals
    await this.populate([{ path: "products", select: "price sale" }]);

    let total = 0;
    let totalAfterDiscount = 0;

    // Calculate total and totalAfterDiscount
    for (const product of this.products) {
      // Calculate discounted price
      const discountedPrice =
        product.price * (1 - product.sale.saleAmount / 100);

      // Update totals
      total += product.price;
      totalAfterDiscount += discountedPrice;
    }

    // Set the calculated totals
    this.total = total;
    this.totalAfterDiscount = parseFloat(totalAfterDiscount.toFixed(1));

    next();
  } catch (error) {
    next(error);
  }
});

const Cart = model("Cart", cartSchema, "carts");

export default Cart;
