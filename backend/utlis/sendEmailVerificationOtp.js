import dotenv from "dotenv";
dotenv.config();
import transporter from "../config/emailConfig.js";
import EmailVerificationModel from "../models/emailVerification.js";

const sendEmailVerificationOtp = async (user) => {
  // generate a random 4-digit number
  const otp = Math.floor(1000 + Math.random() * 9000);

  //   save otp in database
  await new EmailVerificationModel({
    userId: user._id,
    otp: otp,
  }).save();

  //   OTP verification Link
  const otpVerificationLink = `${process.env.FRONTEND_HOST}/account/verify-email`;

  // html template for otp
  const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Email Verification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f7;
      color: #333333;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 6px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #007BFF;
      color: #ffffff;
      padding: 20px;
      text-align: center;
      font-size: 24px;
    }
    .content {
      padding: 30px;
    }
    .content p {
      font-size: 16px;
      line-height: 1.5;
    }
    .btn {
      display: inline-block;
      margin-top: 20px;
      background-color: #007BFF;
      color: #ffffff;
      padding: 12px 24px;
      text-decoration: none;
      border-radius: 4px;
      font-weight: bold;
    }
    .footer {
      font-size: 12px;
      text-align: center;
      color: #999999;
      padding: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">Verify Your Email</div>
    <div class="content">
      <p>Hello,</p>
      <p>Thank you for signing up. Please verify your email address with our website by entering the following one-time password(OTP): ${otpVerificationLink}</p>
      <h2>OTP : ${otp}</h2>
      <p>This OTP is valide for 15 minutes. if didn't request this OTP. please ignore this email</p>
    </div>
    <div class="footer">
      &copy; 2025 PharmaConnect+. All rights reserved.
    </div>
  </div>
</body>
</html>
`;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: user.email,
    subject: "PharmaConnect+ OTP Verification-Verify You Account",
    html: htmlContent,
  });
  return otp;
};

export default sendEmailVerificationOtp;
