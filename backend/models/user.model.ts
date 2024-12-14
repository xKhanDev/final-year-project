import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  walletAddress: {
    type: String,
    required: true,
    unique: true,
  },
  isBanned: {
    type: Boolean,
    default: false,
  },
  reportCount: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

userSchema.methods.generateAccessToken = function () {
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
  const accessTokenExpires = process.env.ACCESS_TOKEN_EXPIRES;

  // Ensure the environment variables are defined
  if (!accessTokenSecret || !accessTokenExpires) {
    throw new Error("Missing required environment variables for access token generation.");
  }

  return jwt.sign(
    {
      _id: this._id,
      walletAddress: this.walletAddress,
      userName: this.userName,
      profilePicture: this.profilePicture,
    },
    accessTokenSecret,
    { expiresIn: accessTokenExpires }
  );
};

userSchema.methods.generateRefreshToken = function () {
  const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
  const refreshTokenExpires = process.env.REFRESH_TOKEN_EXPIRES;

  // Ensure the environment variables are defined
  if (!refreshTokenSecret || !refreshTokenExpires) {
    throw new Error("Missing required environment variables for refresh token generation.");
  }

  return jwt.sign(
    { _id: this._id },
    refreshTokenSecret,
    { expiresIn: refreshTokenExpires }
  );
};

const User = mongoose.model("User", userSchema);
export default User;