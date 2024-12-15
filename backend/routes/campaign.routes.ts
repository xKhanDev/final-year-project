import { Router } from "express";
import { campaigns,uploadCampaign,editCampaign,deleteCampaign } from "../controllers/campaign.controllers.ts";

const router = Router();

router.get("/",campaigns);
router.post("/upload_campaign",uploadCampaign);
router.put("/edit_campaign/:id",editCampaign);
router.delete("/edit_campaign/:id",deleteCampaign);

export default router;