import multer from "multer";
import sharp from "sharp";
import { cloudinary } from "../config/cloudinary.js";
import { CustomError, ThrowErr } from "../utils/CustomError.js";
import uniqid from "uniqid";

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image")) {
    return cb(new CustomError("Please upload a valid image file", 400));
  }
  cb(undefined, true);
};

export const multerUpload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: {
    fileSize: 3000000,
  },
});

export const uploadToCloudinary = async (req, res, next) => {
  let file = req.file;
  if (!file) {
    return next(new CustomError("No Image Provided", 400));
  }
  try {
    const resizedBuffer = await sharp(file.buffer)
      .webp({ lossless: true, quality: 100 })
      .resize({ width: 600, height: 600, fit: "contain" })
      .toBuffer();

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        folder: "products",
        access_mode: "public",
      },
      (err, result) => {
        if (err) {
          console.error("Cloudinary upload error:", err);
          return next(err);
        }
        if (!result) {
          console.error("Cloudinary upload error: Result is undefined");
          return next(new Error("Cloudinary upload result is undefined"));
        }
        const newImage = {
          href: result.secure_url,
          public_id: result.public_id,
        };
        if (newImage) {
          req.body.newImage = newImage;
          file = null;
          req.file = null;
          next();
        }
      }
    );
    uploadStream.end(resizedBuffer);
  } catch (error) {
    console.error("Error in uploadToCloudinary middleware:", error);
    next(error);
  }
};

export const deleteImageFromCloudinary = async (req, res, next) => {
  const { public_id } = req.body;
  if (!public_id) {
    ThrowErr.BadRequest();
  }
  try {
    const response = await new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(
        public_id,
        { invalidate: true },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });
    if (!response.result) {
      return next(new CustomError("Server Error", 500));
    }
    req.body.message = response.result;
    next();
  } catch (err) {
    next(new CustomError("Server Error", 500));
  }
};
