import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryUploadImg = (file, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file,
      { resource_type: "image", folder: folder },
      (error, result) => {
        if (result && result.secure_url) {
          return resolve(result.secure_url);
        }
        return reject({ message: error.message });
      }
    );
  });
};

export const cloudinaryImgUploader = async (path, folder) =>
  await cloudinaryUploadImg(path, folder);
