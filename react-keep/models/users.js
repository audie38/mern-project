const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const Users = sequelize.define("users", {
  userId: {
    type: Sequelize.BIGINT,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

module.exports = Users;
