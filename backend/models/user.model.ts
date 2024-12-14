// fullName, walletAddress, isBanned, reportCount, profilePicture,

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName:{
        type:String
    },
    profilePicture:{
        type:String
    },
    walletAddress:{
        type:String,
        required:true,
        unique:true
    },
    isBanned:{
        type:Boolean,
        default:false
    },
    reportCount:{
        type:Number,
        default:0
    }
},{timestamps:true});

const User = mongoose.model("User",userSchema);

export default User;
