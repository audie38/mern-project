const Sequelize = require("sequelize");

const dbName = process.env.SQL_DB_NAME || "";
const dbUsername = process.env.SQL_DB_USERNAME || "";
const dbPassword = process.env.SQL_DB_PASSWORD || "";
const dbHost = process.env.SQL_DB_HOST || "";
const sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
  dialect: "postgres",
  host: dbHost,
});

module.exports = sequelize;
