const userLogout = (req, res) => {
  try {
    res.clearCookie("accessToken", { httpOnly: true, sameSite: "Strict", secure: true });
    res.clearCookie("refreshToken", { httpOnly: true, sameSite: "Strict", secure: true });
    res.clearCookie("is_auth", { httpOnly: true, sameSite: "Strict", secure: true });

    res.status(200).json({ status: "success", message: "Logout successfully" });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: "Unable to logout, please try again",
    });
  }
};

export default userLogout;
