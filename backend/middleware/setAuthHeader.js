import isTokenExpire from "../utlis/isTokenExpired.js";
const setAuthHeader = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (accessToken || !isTokenExpire(accessToken)) {
      req.headers["authorization"] = `Bearer ${accessToken}`;
    }
    next();
  } catch (err) {
    console.error("Error in adding accesss token to header", err.message);
  }
};

export default setAuthHeader;
