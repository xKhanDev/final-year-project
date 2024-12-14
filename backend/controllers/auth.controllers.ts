import User from "../models/user.model.ts";
import ApiError from "../utils/ApiError.ts";
import ApiResponse from "../utils/ApiResponse.ts";
import AsyncHandler from "../utils/AsyncHandler.ts";
import uploadOnCloudnary from "../utils/cloudnary.ts";

export const loginUser = AsyncHandler(async(req:any,res:Response)=>{
    const {walletAddress,userName} = req.body;

    if(!walletAddress || !userName){
        throw new ApiError(402,"invalid Crediential");
    }
    let profilePictureLocalPath;
    if(profilePictureLocalPath){
        profilePictureLocalPath = req.files?.profilePicture?.[0]?.path;
    }
    const profilePicture = profilePictureLocalPath ? await uploadOnCloudnary(profilePictureLocalPath) : null;

    const existedUser = await User.findOne({walletAddress:walletAddress});

    if(!existedUser){
        const user = await User.create({walletAddress,userName});
        return new ApiResponse(200,user,"Created Successfully");
    }

    const user = new User({
        userName,
        profilePicture,
        walletAddress
    })
    
})