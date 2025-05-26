import refreshAccessToken from "../utlis/refreshAccessToken.js";
import setTokenCookies from "../utlis/setTokenCookies.js";
 
const getNewAccessToken = async (req, res) => {
  try {
    const result = await refreshAccessToken(req);

    if (result.error) {
      return res.status(401).json({
        status: "failed",
        message: result.message || "Unauthorized",
      });
    }

    const {
      newAccessToken,
      newRefreshToken,
      newAccessTokenExp,
      newRefreshTokenExp,
    } = result;

    setTokenCookies(
      res,
      newAccessToken,
      newRefreshToken,
      newAccessTokenExp,
      newRefreshTokenExp
    );

    return res.status(200).json({
      status: "success",
      message: "New token generated",
      access_token: newAccessToken,
      refresh_token: newRefreshToken,
      access_token_exp: newAccessTokenExp,
    });
  } catch (err) {
    console.error("New access token generation error:", err.stack);
    return res.status(500).json({
      status: "failed",
      message: "Unable to generate new token, please try again later",
    });
  }
};

export default getNewAccessToken;
