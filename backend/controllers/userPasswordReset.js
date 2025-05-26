import UserModel from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userPasswordReset = async (req, res) => {
  try {
    const { password, password_confirmation } = req.body;
    const { id, token } = req.params;

    const user = await UserModel.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ status: "failed", message: "User not found" });
    }

    const new_secret = user._id + process.env.JWT_ACCESS_TOKEN_KEY;

    try {
      jwt.verify(token, new_secret);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(400).json({
          status: "failed",
          message: "Token Expired. Please request a new password reset link",
        });
      }
      return res.status(400).json({
        status: "failed",
        message: "Invalid token",
      });
    }

    if (!password || !password_confirmation) {
      return res.status(400).json({
        status: "failed",
        message: "New Password and Confirm new Password are required",
      });
    }

    if (password !== password_confirmation) {
      return res.status(400).json({
        status: "failed",
        message: "New Password and Confirm new Password don't match",
      });
    }

    const newHashPassword = await bcrypt.hash(password, 10);

    await UserModel.findByIdAndUpdate(id, {
      $set: {
        password: newHashPassword,
      },
    });

    res.status(200).json({
      status: "success",
      message: "Password changed Successfully",
    });

  } catch (err) {
    console.error(err); 
    res.status(500).json({
      status: "failed",
      message: "Unable to reset password. Please try again later ",
    });
  }
};

export default userPasswordReset;
