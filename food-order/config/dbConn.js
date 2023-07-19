const mongoose = require("mongoose");
const Sequelize = require("sequelize");

// MONGODB
const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.log(error);
  }
};

// MySQL
const dbName = process.env.SQL_DB_NAME || "";
const dbUsername = process.env.SQL_DB_USERNAME || "";
const dbPassword = process.env.SQL_DB_PASSWORD || "";
const dbHost = process.env.SQL_DB_HOST || "";
const connectSQL = new Sequelize(dbName, dbUsername, dbPassword, {
  dialect: "mysql",
  host: dbHost,
});

module.exports = {
  connectMongo,
  connectSQL,
};
