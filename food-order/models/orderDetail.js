const Sequelize = require("sequelize");
const sequelize = require("../config/dbConn");

const Order = require("./order");

const OrderDetail = sequelize.define("orderDetail", {
  orderDetailId: {
    type: Sequelize.BIGINT,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  amount: Sequelize.INTEGER,
  price: Sequelize.DECIMAL,
});

OrderDetail.belongsTo(Order, { constraints: true, onDelete: "CASCADE", foreignKey: "orderId", targetKey: "orderId" });
Order.hasMany(OrderDetail, { foreignKey: "orderId", sourceKey: "orderId" });

module.exports = OrderDetail;
