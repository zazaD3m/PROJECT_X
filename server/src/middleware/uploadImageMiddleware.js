import multer from "multer";
import path from "path";
import fs from "fs";

import { currDir } from "../utils/currDir.js";
import asyncHandler from "express-async-handler";
import { cloudinaryImgUploader } from "../services/cloudinary.js";

const __dirname = currDir(import.meta.url);

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images/products"));
  },
  filename: function (req, file, cb) {
    if (file) {
      const uniquesuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniquesuffix + ".jpeg");
    } else {
      cb(null, false);
    }
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb({ message: "Unsupported file format!" }, false);
  }
};

export const uploadImage = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const uploadImages = asyncHandler(async (req, res, next) => {
  const imgUrls = [];
  const files = req.files;

  for (const file of files) {
    const { path } = file;
    const newPath = await cloudinaryImgUploader(path, "products");
    imgUrls.push(newPath);
    fs.unlinkSync(path);
  }
  req.body.images = imgUrls;

  next();
});
