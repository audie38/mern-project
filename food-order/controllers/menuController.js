const Menu = require("../models/menu");
const asyncHandler = require("express-async-handler");

// @desc Get Menus
// @route GET /api/menu
// @access Public
const getAllMenu = asyncHandler(async (req, res) => {
  const response = await Menu.findAll();
  res.status(200).json({ data: response });
});

// @desc Get Menu by Id
// @route GET /api/menu/:id
// @access Public
const getMenuById = asyncHandler(async (req, res) => {
  const menuId = req.params.id;
  if (!menuId) {
    return res.status(400).json({ message: "Invalid Menu Id" });
  }
  const response = await Menu.findByPk(menuId);
  if (!response) {
    return res.status(404).json({ message: "Menu Not Found" });
  }
  res.status(200).json({ data: response });
});

// @desc Add New Menu
// @route POST /api/menu
// @access Public
const addMenu = asyncHandler(async (req, res) => {
  const { name, desc, price } = req.body;
  const menu = await Menu.create({
    name: name,
    description: desc,
    price: price,
  });
  res.status(201).json({ data: menu });
});

// @desc Update Menus
// @route UPDATE /api/menu/:id
// @access Public
const updateMenu = asyncHandler(async (req, res) => {
  const menuId = req.params.id;
  if (!menuId) {
    return res.status(400).json({ message: "Invalid Menu Id" });
  }
  const existingMenu = await Menu.findByPk(menuId);
  if (!existingMenu) {
    return res.status(404).json({ message: "Menu Not Found" });
  }
  const { name, desc, price } = req.body;
  if (name) {
    existingMenu.name = name;
  }
  if (desc) {
    existingMenu.description = desc;
  }
  if (price) {
    existingMenu.price = price;
  }
  await existingMenu.save();
  res.status(200).json({ message: "Menu Updated" });
});

// @desc Delete Menu
// @route DELETE /api/menu/:id
// @access Public
const deleteMenu = asyncHandler(async (req, res) => {
  const menuId = req.params.id;
  if (!menuId) {
    return res.status(400).json({ message: "Invalid Menu Id" });
  }
  const existingMenu = await Menu.findByPk(menuId);
  if (!existingMenu) {
    return res.status(404).json({ message: "Menu Not Found" });
  }
  await existingMenu.destroy();
  res.status(200).json({ message: "Menu Deleted" });
});

module.exports = {
  getAllMenu,
  getMenuById,
  addMenu,
  updateMenu,
  deleteMenu,
};
