import jwt from "jsonwebtoken";
import UserRefreshTokenModel from "../models/userRefreshToken.js";

const generateToken = async (user) => {
  try {
    const payload = { _id: user._id, roles: user.roles };

    // Generate access token with expiration
    const accessTokenExp = Math.floor(Date.now() / 1000) + 100; // 100 sec
    const accessToken = jwt.sign(
      { ...payload, exp: accessTokenExp },
      process.env.JWT_ACCESS_TOKEN_KEY
    );

    // Generate refresh token with expiration
    const refreshTokenExp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 5; // 5 days
    const refreshToken = jwt.sign(
      { ...payload, exp: refreshTokenExp },
      process.env.JWT_REFRESH_TOKEN_KEY
    );

    const userRefreshToken = await UserRefreshTokenModel.findOneAndDelete({
      userId: user._id,
    });

    // save new access and refresh token
    await new UserRefreshTokenModel({
      userId: user._id,
      token: refreshToken,
    }).save();

    return Promise.resolve({
      accessToken,
      refreshToken,
      accessTokenExp,
      refreshTokenExp,
    });
  } catch (err) {
    return Promise.reject(err);
  }
};

export default generateToken;
