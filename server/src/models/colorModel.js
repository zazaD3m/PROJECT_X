import mongoose, { Schema, model } from "mongoose";

const colorSchema = new Schema(
  {
    colorName: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    hexValue: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Color = model("Color", colorSchema, "colors");

export default Color;
