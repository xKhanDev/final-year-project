import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
    campaignId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Campaign",
        required:true
    },
    walletAddress:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    }
},{timestamps:true});

const Donation = mongoose.model("Donation",donationSchema);

export default Donation;