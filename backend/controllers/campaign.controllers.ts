import Campaign from "../models/campaign.model.ts";
import ApiError from "../utils/ApiError.ts";
import ApiResponse from "../utils/ApiResponse.ts";
import AsyncHandler from "../utils/AsyncHandler.ts";
import { Request,Response } from "express";

// get all campaigns
export const campaigns = AsyncHandler(async(req:Request,res:Response):Promise<any>=>{
    const campaigns = await Campaign.find({});
    if(!campaigns) return new ApiError(404,"Campaigns not found");
    return new ApiResponse(200,campaigns);
})

// upload campaign
export const uploadCampaign = AsyncHandler(async(req,res):Promise<any>=>{
    const {title,category,description,goalAmount,achievedAmount} =req.body;

    const emptyFeilds = [title,category,description,goalAmount,achievedAmount].some((feild) => feild?.trim(" ") === "");

    if(!emptyFeilds) return new ApiError(400,"All fields are mandatory");
})

// edit campaign
export const editCampaign = AsyncHandler(async(req,res)=>{

})

// delete campaign
export const deleteCampaign = AsyncHandler(async(req,res)=>{

})