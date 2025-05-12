// src/utils/cloudinary.js
import { v2 as cloudinary } from "cloudinary";
import { PassThrough } from "stream";    // ← import instead of require

// ensure you’ve loaded dotenv in your entry-point so these are defined:
cloudinary.config({
  cloud_name: process.env.Cloudnary_Cloud_Name,
  api_key:    process.env.Cloudnary_API_Key,
  api_secret: process.env.Cloudnary_API_Secret,
});

/**
 * Upload a Buffer to Cloudinary via upload_stream.
 * @param {Buffer} buffer
 * @returns {Promise<import("cloudinary").UploadApiResponse>}
 */
export const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    // Pipe the buffer into the upload stream
    const bufferStream = new PassThrough();
    bufferStream.end(buffer);
    bufferStream.pipe(uploadStream);
  });
};
