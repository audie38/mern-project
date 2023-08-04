const Sequelize = require("sequelize");
const sequelize = require("../config/dbConn");

const Order = sequelize.define("order", {
  orderId: {
    type: Sequelize.BIGINT,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  street: Sequelize.TEXT,
  city: Sequelize.STRING,
  postalCode: Sequelize.STRING,
  totalOrderPrice: Sequelize.DECIMAL,
});

module.exports = Order;
