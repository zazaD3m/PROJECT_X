import mongoose, { Schema, model } from "mongoose";

const categorySchema = new Schema({
  mainCategoryName: {
    type: String,
  },
  isMainCategory: {
    type: Boolean,
  },
  subCategoryName: {
    type: String,
  },
  genderName: {
    type: String,
  },
});

const Category = model("Category", categorySchema, "categories");

export default Category;
