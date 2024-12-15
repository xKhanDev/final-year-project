import { Router } from "express";

import {loginUser, updateNameAndImage} from "../controllers/auth.controllers.ts"
import { upload } from "../middlewares/multer.middleware.ts";

const router: Router = Router();

router.post("/connect", loginUser);
router.post(
    "/update_user/:id",
    upload.fields([{ name: "profilePicture", maxCount: 1 }]),
    updateNameAndImage
);

export default router;

