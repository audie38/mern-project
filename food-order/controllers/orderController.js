const Order = require("../models/order");
const OrderDetail = require("../models/orderDetail");
const asyncHandler = require("express-async-handler");

// @desc Get All Orders
// @route GET /api/order
// @access Public
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.findAll({ include: OrderDetail });
  res.status(200).json({ data: orders });
});

// @desc Get Order by Id
// @route GET /api/order/:id
// @access Public
const getOrderById = asyncHandler(async (req, res) => {
  const orderId = req.params.id;
  if (!orderId) {
    return res.status(400).json({ message: "Invalid Order Id" });
  }
  const order = await Order.findByPk(orderId, { include: OrderDetail });
  res.status(200).json({ data: order });
});

// @desc Add Orders
// @route POST /api/order
// @access Public
const addNewOrder = asyncHandler(async (req, res) => {
  const { order, details } = req.body;
  const newOrder = await Order.create({
    name: order.name,
    street: order.street,
    city: order.city,
    postalCode: order.postalCode,
    totalOrderPrice: order.totalOrderPrice,
  });
  if (newOrder) {
    const transformDetailsData = details.map((detail) => {
      return {
        orderId: newOrder.orderId,
        name: detail.name,
        amount: detail.amount,
        price: detail.price,
      };
    });
    const newOrderDetails = await OrderDetail.bulkCreate(transformDetailsData, { validate: true });
    const result = {
      order: newOrder,
      details: newOrderDetails,
    };
    res.status(201).json({ data: result });
  }
});

// @desc Update Orders
// @route PUT /api/order/:id
// @access Public
const updateOrder = asyncHandler(async (req, res) => {
  const orderId = req.params.id;
  if (!orderId) {
    return res.status(400).json({ message: "Invalid Order Id" });
  }
  const existingOrder = await Order.findByPk(orderId, { include: OrderDetail });
  if (!existingOrder) {
    return res.status(404).json({ message: "Order Not Found" });
  }

  const { order, details } = req.body;
  (existingOrder.name = order.name), (existingOrder.street = order.street), (existingOrder.city = order.city), (existingOrder.postalCode = order.postalCode), (existingOrder.totalOrderPrice = order.totalOrderPrice);

  const deleteDetails = await OrderDetail.destroy({ where: { orderId: orderId } });
  if (deleteDetails) {
    const transformDetailsData = details.map((detail) => {
      return {
        orderId: orderId,
        name: detail.name,
        amount: detail.amount,
        price: detail.price,
      };
    });
    await OrderDetail.bulkCreate(transformDetailsData);
  }

  await existingOrder.save();
  res.status(200).json({ message: "Order Updated" });
});

// @desc Delete Orders
// @route DELETE /api/order/:id
// @access Public
const deleteOrder = asyncHandler(async (req, res) => {
  const orderId = req.params.id;
  if (!orderId) {
    return res.status(400).json({ message: "Invalid Order Id" });
  }
  const existingOrder = await Order.findByPk(orderId);
  if (!existingOrder) {
    return res.status(404).json({ message: "Order Not Found" });
  }
  const deleteDetails = await OrderDetail.destroy({ where: { orderId: orderId } });
  if (deleteDetails) {
    await existingOrder.destroy();
    res.status(200).json({ message: "Order Deleted" });
  }
});

module.exports = {
  getAllOrders,
  getOrderById,
  addNewOrder,
  updateOrder,
  deleteOrder,
};
