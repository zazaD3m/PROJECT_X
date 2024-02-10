import mongoose, { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    productTitle: {
      type: String,
    },
    productSlug: {
      type: String,
    },
    productDescription: {
      type: String,
    },
    productPrice: {
      type: Number,
      index: true,
    },
    productMainCategory: {
      type: String,
      index: true,
    },
    productSubCategory: {
      type: String,
      index: true,
    },
    productGender: {
      type: String,
      index: true,
    },
    productBrand: {
      type: String,
      index: true,
    },
    productColor: {
      type: String,
      index: true,
    },
    images: {
      type: Array,
    },
  },
  { timestamps: true }
);

const Product = model("Product", productSchema, "products");

export default Product;
