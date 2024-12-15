import multer from "multer";
import path from "path";
import fs from "fs";

const storagePath = path.join(__dirname, "../../frontend/public/uploads");
if(!fs.existsSync(storagePath)) fs.mkdirSync(storagePath);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,storagePath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Create the multer upload middleware with the storage configuration
export const upload = multer({ storage });

