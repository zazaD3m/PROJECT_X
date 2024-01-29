import mongoose, { Schema, model } from "mongoose";

const brandSchema = new Schema(
  {
    brandName: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const Brand = model("Brand", brandSchema, "brands");

export default Brand;
