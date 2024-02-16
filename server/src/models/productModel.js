import mongoose, { Schema, model } from "mongoose";

const imageSchema = new Schema(
  {
    href: String,
    alt: String,
    public_id: String,
  },
  { _id: false }
);

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
    images: [imageSchema],
  },
  { timestamps: true }
);

productSchema.pre("save", function (next) {
  const slug = `${this.brand}-${this.subCategory}-${this.color}-for-${this.gender}`;
  this.slug = slug + "-" + this._id;
  this.images = this.images.map((img) => ({
    href: img.href,
    public_id: img.public_id,
    alt: slug,
  }));
  next();
});

const Product = model("Product", productSchema, "products");

export default Product;
