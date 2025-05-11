import multer from "multer";
import fs from "fs";
import path from "path";

// Path matches NEW folder name "learn"
const uploadDir = path.join("C:", "Users", "Usman", "Desktop", "learn", "upload");

// Auto-create directory
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});

export const upload = multer({ storage: storage });