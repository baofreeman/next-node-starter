const jwt = require("jsonwebtoken");
const UserRefreshTokenModal = require("../models/UserRefreshToken");

const verifyRefreshToken = async (refreshToken) => {
  try {
    const privateKey = process.env.JWT_REFRESH_TOKEN_SECRET_KEY;

    // Find the refresh token document
    const userRefreshToken = await UserRefreshTokenModal.findOne({
      token: refreshToken,
    });

    // If refresh token not found, reject with an error
    if (!userRefreshToken) {
      return res
        .status(403)
        .json({ status: "failed", message: "Refresh token is missing" });
    }

    // Verify the refresh token
    const tokenDetails = jwt.verify(refreshToken, privateKey);

    // If verification successful, resolve with token details
    return {
      tokenDetails,
      error: false,
      message: "Valid refresh token",
    };
  } catch (error) {
    // If any error occurs during verification or token not found, reject with an error
    throw { error: true, message: "Invalid refresh token" };
  }
};

module.exports = { verifyRefreshToken };
