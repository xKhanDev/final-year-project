import { Request, RequestHandler } from "express";
import mongoose from "mongoose";

import User from "../models/user.model.ts";
import ApiError from "../utils/ApiError.ts";
import ApiResponse from "../utils/ApiResponse.ts";
import AsyncHandler from "../utils/AsyncHandler.ts";
import uploadOnCloudnary from "../utils/cloudnary.ts";

interface FileRequest extends Request {
  files?: {
    profilePicture?: Express.Multer.File[];
  };
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

export const loginUser:RequestHandler = AsyncHandler(async (req, res): Promise<any> => {
  try {
    const { walletAddress, userName } = req.body;

    if (!walletAddress) {
      throw new ApiError(400, "Wallet address is mandatory");
    }

    let profilePictureLocalPath: string | null = null;
    const reqWithFile = req as FileRequest;
    if (reqWithFile.files?.profilePicture?.[0]?.path) {
      profilePictureLocalPath = reqWithFile.files.profilePicture?.[0]?.path;
    }
    
    const profilePicture = profilePictureLocalPath ? await uploadOnCloudnary(profilePictureLocalPath) : null;

    const existedUser = await User.findOne({ walletAddress });

    if (!existedUser) {
      const newUser = await User.create({ walletAddress, userName: userName?.toLowerCase(), profilePicture });
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
