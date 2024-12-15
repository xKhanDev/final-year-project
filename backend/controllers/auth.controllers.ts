import { Request } from "express";
import mongoose from "mongoose";

import User from "../models/user.model.ts";
import ApiError from "../utils/ApiError.ts";
import ApiResponse from "../utils/ApiResponse.ts";
import AsyncHandler from "../utils/AsyncHandler.ts";
import uploadOnCloudnary from "../utils/cloudnary.ts";
import fileDeletion from "../utils/fileDeletion.ts";

interface FileRequest extends Request {
  files?: { [fieldname: string]: Express.Multer.File[] };
}

interface UserDocument extends mongoose.Document {
  generateAccessToken: () => string;
  generateRefreshToken: () => string;
}

const generateAccessAndRefreshToken = async (userId: mongoose.Types.ObjectId | string) => {
  const user = await User.findById<UserDocument>(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  return { accessToken, refreshToken };
};

export const loginUser = AsyncHandler(async (req, res): Promise<any> => {
  try {
    const { walletAddress } = req.body;

    if (!walletAddress) {
      throw new ApiError(400, "Wallet address is mandatory");
    }

    const existedUser = await User.findOne({ walletAddress });

    if (!existedUser) {
      const newUser = await User.create({ walletAddress});
      const { accessToken, refreshToken } = await generateAccessAndRefreshToken(newUser._id);

      const cookieOptions = {
        httpOnly: true,
        secure: true,
        maxAge: 1 * 24 * 60 * 60 * 1000,
      };

      return res
        .status(201)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(new ApiResponse(201, newUser, "User created successfully"));
    }

    if (existedUser.isBanned) {
      throw new ApiError(403, "User is banned");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(existedUser._id);

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      maxAge: 1 * 24 * 60 * 60 * 1000,
    };

    return res
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json(new ApiResponse(200, existedUser, "Login successful"));
  } catch (error) {
    console.error("ERROR IN LOGIN USER", error);
    throw new ApiError(400, "Invalid user data");
  }
});

export const updateNameAndImage = AsyncHandler(async(req,res):Promise<any>=>{
  const {userName} = req.body;

  try {
    const reqWithFile = req as FileRequest;
    let profilePictureLocalPath = reqWithFile?.files?.profilePicture[0]?.path;
    let profilePicture = null;

    if (profilePictureLocalPath) {
      profilePicture = await uploadOnCloudnary(profilePictureLocalPath);
    }
    
    if(profilePicture?.url) fileDeletion(profilePictureLocalPath as string);
  
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { userName, profilePicture },
      { new: true }
    );
  
    return res.status(200).json(
      new ApiResponse(200, updatedUser, "User updated successfully")
    )
  } catch (error) {
    console.log("ERROR WHILE UPDATING USER DATA", error);
    throw new ApiError(409,"Internal server errror");
  }
})