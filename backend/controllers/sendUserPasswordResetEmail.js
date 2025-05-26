import transporter from "../config/emailConfig.js";
import UserModel from "../models/User.js";
import jwt from "jsonwebtoken";

const sendUserPasswordResetEmail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({
        status: "failed",
        message: "Email field is required",
      });
    }

    //find user
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(401).json({
        status: "failed",
        message: "Email does not Exit",
      });
    }

    // generate token for password reset
    const secret = user._id + process.env.JWT_ACCESS_TOKEN_KEY;
    const token = jwt.sign({ userID: user._id }, secret, { expiresIn: "15m" });

    // reset link
    const resetLink = `${process.env.FRONTEND_HOST}/account/reset-password-confirm/${user._id}/${token}`;

    // send reset email
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: "Password Reset Link",
      html: `<p>Hello ${user.name}</p><p>Please <a href="${resetLink}">Click Here</a> to reset Password. </p>`,
    });
    res.status(200).json({
      status: "success",
      message: "Password reset email sent. Please check your email",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "failed",
      message: "Unable to send password reset email. Please try again later",
    });
  }
};

export default sendUserPasswordResetEmail;
