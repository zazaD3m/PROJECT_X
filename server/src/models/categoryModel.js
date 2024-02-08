import mongoose, { Schema, model } from "mongoose";

const categorySchema = new Schema({
  mainCategoryName: {
    type: String,
    required: true,
  },
  isMainCategory: {
    type: Boolean,
  },
  subCategoryName: {
    type: String,
  },
  genderName: {
    type: String,
    required: true,
  },
});

const Category = model("Category", categorySchema, "categories");

export default Category;
