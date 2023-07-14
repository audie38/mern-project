require("dotenv").config();

const allowedOrigin = process.env.ALLOWED_ORIGIN.split(",") || [];

module.exports = allowedOrigin;
