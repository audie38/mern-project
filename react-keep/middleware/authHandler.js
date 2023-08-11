const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/users");

const protect = asyncHandler(async (req, res, next) => {
  let token = req?.cookies?.jwt;
  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userExists = await User.findByPk(decoded.userId, {
      attributes: {
        exclude: ["password"],
      },
    });
    if (!userExists) {
      return res.status(401).json({ message: "Not Authorized, Invalid Token" });
    }
    req.user = userExists;
    next();
  } else {
    return res.status(401).json({ message: "Not Authorized, Token Not Found" });
  }
});

module.exports = protect;
