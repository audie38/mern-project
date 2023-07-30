const express = require("express");
const router = express.Router();
const { getAllOrders, getOrderById, addNewOrder, updateOrder, deleteOrder } = require("../controllers/orderController");

router.route("/").get(getAllOrders).post(addNewOrder);
router.route("/:id").get(getOrderById).put(updateOrder).delete(deleteOrder);

module.exports = router;
