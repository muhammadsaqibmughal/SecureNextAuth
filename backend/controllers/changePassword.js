import bcrypt from "bcrypt";
import UserModel from "../models/User.js";

const changePassword = async (req, res) => {
  try {
    const { currentPassword, password } = req.body;

   
    if (!currentPassword || !password) {
      return res.status(400).json({
        status: "failed",
        message: "Current password, new password, and confirmation are required",
      });
    }

    // Fetch the user from DB
    const user = await UserModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "User not found",
      });
    }

    // Compare currentPassword with stored hash
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        status: "failed",
        message: "Current password is incorrect",
      });
    }

    // Hash and update the new password
    const newHashPassword = await bcrypt.hash(password, 10);
    await UserModel.findByIdAndUpdate(req.user._id, {
      $set: { password: newHashPassword },
    });

    return res.status(200).json({
      status: "success",
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Password change error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Unable to change password, please try again later",
    });
  }
};

export default changePassword;
