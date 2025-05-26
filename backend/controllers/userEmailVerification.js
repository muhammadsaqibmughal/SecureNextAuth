import EmailVerificationModel from "../models/emailVerification.js";
import UserModel from "../models/User.js";
import sendEmailVerificationOtp from "../utlis/sendEmailVerificationOtp.js";

const verifyEmail = async (req, res) => {
  try {
    //Extract request body parameters
    const { email, otp } = req.body;

    // check if all field are provided or not
    if (!email || !otp) {
      return res.status(400).json({
        status: "Failed",
        message: "All field are required",
      });
    }

    // check email if does not exits
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({
        status: "Failed",
        message: "Email does not exits",
      });
    }

    // check weather user is already verified or not
    if (existingUser.is_verfied) {
      return res.status(400).json({
        status: "Failed",
        message: "Email Already verified",
      });
    }

    // check if there is a matching email verification OTP
    const emailVerification = await EmailVerificationModel.findOne({
      userId: existingUser._id,
      otp,
    });

    // check if their is not otp in database
    if (!emailVerification) {
      if (!existingUser.is_verfied) {
        await sendEmailVerificationOtp(existingUser);
        return res.status(400).json({
          status: "failed",
          message: "Inavlide OTP, new OTP sent to your Email",
        });
      }
      return res
        .status(400)
        .json({ status: "failed", message: "Invalide OTP" });
    }

    const currentTime = new Date();
    // check otp expire
    const expireTime = new Date(
      emailVerification.createdAt.getTime() + 15 * 60 * 1000
    );
    if (currentTime > expireTime) {
      //OTP expire, send new otp
      await sendEmailVerificationOtp(existingUser);
      return res.status(400).json({
        status: "failed",
        message: "OTP expire, new OTP sent to your email",
      });
    }

    // OTP is valide and not expire, mark email as verified
    existingUser.is_verfied = true;
    await existingUser.save();

    // delete email verification document
    await EmailVerificationModel.deleteMany({ userId: existingUser._id });

    return res
      .status(200)
      .json({ status: "success", message: "Email verified successfully" });
  } catch (err) {
    console.log("Email verification Error");
    res.status(500).json({
      status: "Failed",
      message: "Unable to verify Email, please try again later",
    });
  }
};

export default verifyEmail;
