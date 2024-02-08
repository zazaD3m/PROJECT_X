import mongoose, { Schema, model } from "mongoose";

const brandSchema = new Schema({
  brandName: {
    type: String,
    required: true,
    unique: true,
  },
});

const Brand = model("Brand", brandSchema, "brands");

export default Brand;
