const allowedOrigin = process.env.ALLOWED_ORIGINS.split(",") || [];
const corsOptions = {
  origin: (origin, cb) => {
    if (allowedOrigin.indexOf(origin) !== -1 || !origin) {
      cb(null, true);
    } else {
      cb(new Error("Not Allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
