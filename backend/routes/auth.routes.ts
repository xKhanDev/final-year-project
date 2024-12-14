import { Router } from "express";
import {loginUser} from "../controllers/auth.controllers.ts"

const router = Router();

router.post("/connect",loginUser);

export default router;