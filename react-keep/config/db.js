const Sequelize = require("sequelize");

const dbHost = process.env.DB_HOST || "";
const dbName = process.env.DB_NAME || "";
const dbUsername = process.env.DB_USERNAME || "";
const dbPassword = process.env.DB_PASSWORD || "";

const sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
  dialect: "postgres",
  host: dbHost,
});

module.exports = sequelize;
