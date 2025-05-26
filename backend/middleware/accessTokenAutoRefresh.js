import refreshAccessToken from "../utlis/refreshAccessToken.js";
import setTokenCookies from "../utlis/setTokenCookies.js";
import isTokenExpire from "../utlis/isTokenExpired.js"

const accessTokenAutoRefresh = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (accessToken || !isTokenExpire(accessToken)) {
      req.headers["authorization"] = `Bearer ${accessToken}`;
    }
    if (!accessToken || isTokenExpire(accessToken)) {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        throw new Error("Refresh Token missing");
      }

      const {newAccessToken,newRefreshToken,newAccessTokenExp,newRefreshTokenExp}= await refreshAccessToken(req,res);

    //   set cookies
    setTokenCookies(res,newAccessToken,newRefreshToken,newAccessTokenExp,newRefreshTokenExp);  
      req.headers["authorization"] = `Bearer ${newAccessToken}`;
    }
    next();
  } catch (err) {
    res.status(401).json({error:"Unauthrized",message:"access token is missing or invalid"})
  }
};

export default accessTokenAutoRefresh;
