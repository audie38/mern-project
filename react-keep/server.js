require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const path = require("path");
const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOptions");
const sequelize = require("./config/db");
const cookieParser = require("cookie-parser");

app.use(logger);
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(path.resolve(), "client/dist")));
app.get("/", (req, res) => {
  res.sendFile(path.resolve(path.resolve(), "client/dist", "index.html"));
});

app.use("/api/user", require("./routes/usersRoutes"));
app.use("/api/note", require("./routes/notesRoutes"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

sequelize
  .sync()
  .then(() => {
    console.log("Connected to DB...");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
    logEvents(`${err}`, "dbErr.log");
  });
