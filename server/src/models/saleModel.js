import mongoose, { Schema, model } from "mongoose";

const saleSchema = new Schema({
  saleName: {
    type: String,
  },
  saleAmount: {
    type: Number,
  },
  // saleType: {
  //   type: String,
  // },
  products: [
    {
      type: Schema.Types.ObjectId,
    },
  ],
  expiry: {
    type: Date,
  },
});

const Sale = model("Sale", saleSchema, "sales");

export default Sale;
