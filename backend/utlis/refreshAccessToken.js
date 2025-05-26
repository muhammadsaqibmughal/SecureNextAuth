import UserModel from "../models/User.js";
import UserRefreshTokenModel from "../models/userRefreshToken.js";
import generateToken from "./generateToken.js";
import verifyRefreshToken from "./verifyRefreshToken.js";

const refreshAccessToken = async (req) => {
  try {
    const oldRefreshToken = req.cookies.refreshToken;

    const { tokenDetails, error, message } = await verifyRefreshToken(
      oldRefreshToken
    );
    if (error) {
      return { error: true, message };
    }

    const user = await UserModel.findById(tokenDetails._id);
    if (!user) {
      return { error: true, message: "User not found" };
    }

    const userRefreshToken = await UserRefreshTokenModel.findOne({
      userId: tokenDetails._id,
    });

    if (
      oldRefreshToken !== userRefreshToken.token ||
      userRefreshToken.blacklisted
    ) {
      
      return { error: true, message: "Unauthorized access" };
    }

    const { accessToken, refreshToken, accessTokenExp, refreshTokenExp } =
      await generateToken(user);

    return {
      error: false,
      newAccessToken: accessToken,
      newRefreshToken: refreshToken,
      newAccessTokenExp: accessTokenExp,
      newRefreshTokenExp: refreshTokenExp,
    };
  } catch (err) {
    console.error("Refresh access token error:", err);
    return { error: true, message: "Internal server error" };
  }
};

export default refreshAccessToken;
