const Sequelize = require("sequelize");
const sequelize = require("../config/dbConn");

const Menu = sequelize.define("menu", {
  id: {
    type: Sequelize.BIGINT,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  description: Sequelize.TEXT,
  price: Sequelize.DECIMAL,
});

module.exports = Menu;
