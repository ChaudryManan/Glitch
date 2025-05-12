// upload.js
import multer from "multer";

// Use memoryStorage so we never write to disk in production
const storage = multer.memoryStorage();

// Only accept image files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

// Optional: limit filesize to 5 MB per upload
const limits = {
  fileSize: 5 * 1024 * 1024, // 5 MB
};

export const upload = multer({
  storage,
  fileFilter,
  limits,
});
