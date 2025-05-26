import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
import sendEmailVerificationOtp from "../utlis/sendEmailVerificationOtp.js";

// userRegistration
const userRegistration = async (req, res) => {
  try {
    const { name, email, password, password_confirmation } = req.body;

    // check if all required fields are provided
    if (!name || !email || !password || !password_confirmation) {
      return res
        .status(400)
        .json({ status: "failed", message: "All fields are required" });
    }

    // check if password and password_confirmation match
    if (password !== password_confirmation) {
      return res.status(400).json({
        status: "failed",
        message: "password and confirm password does not match",
      });
    }

    // check if email already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ status: "failed", message: "Email Already exist" });
    }

    // password hashing
    const hashPassword = await bcrypt.hash(password, 10);

    // create new user
    const newUser = await new UserModel({
      name,
      email,
      password: hashPassword,
    }).save();

  
    sendEmailVerificationOtp(newUser);

    // send Success response
    res.status(201).json({
      status: "success",
      message: "Registration Success",
      user: { id: newUser._id, email: newUser.email },
    });
  } catch (err) {
    //   catch block
    console.log("Registration Error", err);
    res.status(500).json({
      status: "faiked",
      message: "Unable to Register,Please try again",
    });
  }
};

export default userRegistration;
