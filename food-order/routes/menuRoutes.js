const express = require("express");
const router = express.Router();
const { getAllMenu, getMenuById, addMenu, updateMenu, deleteMenu } = require("../controllers/menuController");

router.route("/").get(getAllMenu).post(addMenu);
router.route("/:id").get(getMenuById).put(updateMenu).delete(deleteMenu);

module.exports = router;
