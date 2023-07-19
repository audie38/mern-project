const express = require("express");
const { getAllUsers, getUserById, createNewUser, updateUser, deleteUser } = require("../controllers/userController");
const router = express.Router();

router.route("/").get(getAllUsers).post(createNewUser);
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;
