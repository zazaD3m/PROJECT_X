import multer from "multer";
import sharp from "sharp";
import { cloudinary } from "../config/cloudinary.js";
import { CustomError } from "../utils/CustomError.js";
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
  const { color, gender, subCategory, brand } = req.body;

  try {
    const files = req.files;
    if (!files || files.length === 0) {
      return next(new CustomError("No files provided", 400));
    }
    const newImages = [];
    for (const file of files) {
      const publicId = `${brand}-${subCategory}-${color}-for-${gender}-${uniqid()}`;
      const resizedBuffer = await sharp(file.buffer)
        .webp({ lossless: true, quality: 100 })
        .resize({ width: 600, height: 600, fit: "contain" })
        .toBuffer();

      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "image",
          folder: "products",
          access_mode: "public",
          public_id: publicId,
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
          newImages.push({
            href: result.secure_url,
            public_id: result.public_id,
          });

          if (newImages.length === files.length) {
            //All files processed now get your images here
            req.body.newImages = newImages;
            next();
          }
        }
      );
      uploadStream.end(resizedBuffer);
    }
  } catch (error) {
    console.error("Error in uploadToCloudinary middleware:", error);
    next(error);
  }
};
