import UserModel from "../models/User.js";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import passport from "passport";

var otps = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_ACCESS_TOKEN_KEY,
};

passport.use(
  new JwtStrategy(otps, async function (jwt_payload, done) {
    try {
      const user = await UserModel.findOne({ _id: jwt_payload._id }).select(
        "-password"
      );
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);
