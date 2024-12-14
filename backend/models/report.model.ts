// ReportedBy, reportedUser, campaignId, reason

import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
    reportedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    reportedOn:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    reportedCampaign:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Campaign",
        required:true
    },
    reason:{
        type:String,
        required:true
    }
},{timestamps:true});

const Report = mongoose.model("Report",reportSchema);

export default Report;
