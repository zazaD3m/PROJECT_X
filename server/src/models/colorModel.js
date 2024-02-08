import mongoose, { Schema, model } from "mongoose";

const colorSchema = new Schema({
  colorName: {
    type: String,
    required: true,
    unique: true,
  },
  hexValue: {
    type: String,
    required: true,
  },
});

const Color = model("Color", colorSchema, "colors");

export default Color;
