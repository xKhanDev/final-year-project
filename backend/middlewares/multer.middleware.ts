import multer, { StorageEngine } from "multer";
import path from "path";

// Define the storage engine
const storage: StorageEngine = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, "../../frontend/src/public/uploads"));
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname + '-' + Date.now())
      }
});

// Create the multer upload middleware with the storage configuration
export const upload = multer({ storage: storage });
