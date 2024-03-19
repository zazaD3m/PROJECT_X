import mongoose, { Schema, model } from "mongoose";

const saleSchema = new Schema({
  saleName: {
    type: String,
    required: true,
    unique: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
    },
  ],
  expiry: {
    type: Date,
    required: true,
  },
});

const Sale = model("Sale", saleSchema, "sales");

export default Sale;
