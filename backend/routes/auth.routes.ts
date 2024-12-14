import { Router } from "express";
import {loginUser} from "../controllers/auth.controllers.ts"
import { upload } from "../middlewares/multer.middleware.ts";

const router: Router = Router();

router.post("/connect", upload.single("profilePicture"), loginUser);

export default router;
