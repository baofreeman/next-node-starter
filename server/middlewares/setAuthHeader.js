const { isTokenExpire } = require("../utils/isTokenExpried");

const setAuthHeader = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (accessToken || !isTokenExpire(accessToken)) {
      req.headers["authorization"] = `Bearer ${accessToken}`;
    }
    next();
  } catch (error) {
    console.error("Error adding access token to header:", error.message);
  }
};

module.exports = { setAuthHeader };
