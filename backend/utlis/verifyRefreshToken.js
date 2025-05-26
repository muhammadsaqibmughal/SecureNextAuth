import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import UserRefreshTokenModel from "../models/userRefreshToken.js";

const verifyRefreshToken = async (refreshToken) => {
  try {
    const privateKey = process.env.JWT_REFRESH_TOKEN_KEY;

    // Find refresh token in database
    const userRefreshToken = await UserRefreshTokenModel.findOne({
      token: refreshToken,
    });

    if (!userRefreshToken) {
      return { error: true, message: "Invalid refresh token" };
    }

    // Verify token
    const tokenDetails = jwt.verify(refreshToken, privateKey);

    return {
      tokenDetails,
      error: false,
      message: "Valid refresh token",
    };
  } catch (err) {
    console.error("Verify refresh token error:", err.stack);
    return { error: true, message: "Invalid refresh token" };
  }
};

export default verifyRefreshToken;
