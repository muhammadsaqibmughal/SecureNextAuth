import express from "express";
import userRegistration from "../controllers/userRegistration.js";
import verifyEmail from "../controllers/userEmailVerification.js";
import userLogin from "../controllers/userLogin.js";
import getNewAccessToken from "../controllers/getNewAccessToken.js";
import userProfile from "../controllers/userProfile.js";
import "../config/passport-jwt-strategy.js";
import passport from "passport";
import accessTokenAutoRefresh from "../middleware/accessTokenAutoRefresh.js";
import userLogout from "../controllers/userLogout.js";
import changePassword from "../controllers/changePassword.js";
import sendUserPasswordResetEmail from "../controllers/sendUserPasswordResetEmail.js";
import userPasswordReset from "../controllers/userPasswordReset.js";


const router = express.Router();

router.post("/register", userRegistration);
router.post("/verify-email", verifyEmail);
router.post("/login", userLogin);
router.post("/refresh-token", getNewAccessToken);
router.post("/reset-password-link", sendUserPasswordResetEmail);
router.post("/reset-password/:id/:token", userPasswordReset);

// protected route
router.get("/me",accessTokenAutoRefresh, passport.authenticate("jwt",{session:false}),userProfile);

router.post("/change-password",accessTokenAutoRefresh, passport.authenticate("jwt",{session:false}),changePassword);

router.post("/logout",accessTokenAutoRefresh, passport.authenticate("jwt",{session:false}),userLogout);



export default router;
