// title,category,images[],description,goalAmount,acheivedAmount,reports[{userId,reason}],creator,status,stars,donations[walletAddress,amount],donors[walletAddress]

import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true
    },
    images:[{
        type:String,
        required:true
    }],
    description:{
        type:String,
        required:true
    },
    goalAmount:{
        type:Number,
        required:true
    },
    achievedAmount:{
        type:Number,
        default:0
    },
    reports:[{
        reportedBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        reason:{
            type:String,
            required:true
        }
    }],
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    status:{
        type:Boolean,
        required:true
    },
    stars:{
        type:Number,
        default:0
    },
    donations:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Donation"
        }
    ],
    donors:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }]
},{timestamps:true});

const Campaign = mongoose.model("Campaign",campaignSchema);

export default Campaign;