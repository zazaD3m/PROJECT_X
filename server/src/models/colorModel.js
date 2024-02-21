import mongoose, { Schema, model } from "mongoose";

const colorSchema = new Schema({
  colorName: {
    type: String,
    unique: true,
  },
  hexValue: {
    type: String,
  },
});

const Color = model("Color", colorSchema, "colors");

export default Color;
