import bcrypt from "bcrypt";
import UserModel from "../models/User.js";
import generateToken from "../utlis/generateToken.js";
import setTokenCookies from "../utlis/setTokenCookies.js";

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if all fields are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: "failed", message: "Email and Password are required" });
    }

    // Check if email exists in database
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ status: "failed", message: "Invalid Email or Password" });
    }

    // Check if user is verified
    if (!user.is_verfied) {
      return res
        .status(401)
        .json({ status: "failed", message: "Your account is not verified" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ status: "failed", message: "Invalid Email or Password" });
    }

    // Generate tokens
    const { accessToken, refreshToken, accessTokenExp, refreshTokenExp } =
      await generateToken(user);

    // Set cookies
    setTokenCookies(
      res,
      accessToken,
      refreshToken,
      accessTokenExp,
      refreshTokenExp
    );

    // Send success response
    return res.status(200).json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        roles: user.roles[0],
      },
      status: "success",
      message: "Login successful",
      access_token: accessToken,
      refresh_token: refreshToken,
      access_token_exp: accessTokenExp,
      is_auth: true,
    });
  } catch (err) {
    console.error("Login Error:", err.stack);
    return res
      .status(500)
      .json({ status: "failed", message: "User login failed" });
  }
};

export default userLogin;
