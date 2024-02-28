import mongoose, { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    title: {
      type: String,
    },
    slug: {
      type: String,
    },
    description: {
      type: String,
    },
    size: {
      type: String,
      index: true,
    },
    price: {
      type: Number,
      index: true,
    },
    mainCategory: {
      type: String,
      index: true,
    },
    subCategory: {
      type: String,
      index: true,
    },
    gender: {
      type: String,
      index: true,
    },
    brand: {
      type: String,
      index: true,
    },
    color: {
      type: String,
      index: true,
    },
    hidden: {
      type: Boolean,
      default: true,
      index: true,
    },
    images: { type: Object },
  },
  { timestamps: true }
);

productSchema.pre("save", function (next) {
  this.slug = this.slug + "-" + this._id;
  next();
});

const Product = model("Product", productSchema, "products");

export default Product;
