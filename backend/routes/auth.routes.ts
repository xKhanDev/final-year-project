import { Router } from "express";

import {loginUser,updateNameAndImage} from "../controllers/auth.controllers.ts"
import { upload } from "../middlewares/multer.middleware.ts";
import protectRoutes from "../middlewares/protectRoute.ts";

const router: Router = Router();

router.post("/connect", loginUser);
router.post("/update_user",protectRoutes, upload.single("profilePicture"), updateNameAndImage);

export default router;
