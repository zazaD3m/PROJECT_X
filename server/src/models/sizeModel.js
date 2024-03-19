import mongoose, { Schema, model } from "mongoose";

const sizeSchema = new Schema({
  sizeType: { type: String },
  sizeName: { type: String },
});

const Size = model("Size", sizeSchema, "sizes");

export default Size;
