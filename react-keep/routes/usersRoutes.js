const express = require("express");
const router = express.Router();

const protect = require("../middleware/authHandler");
const { registerUser, authUser, logoutUser, getUser, updateUser, deleteUser } = require("../controllers/usersControllers");

router.route("/").get(protect, getUser).post(registerUser).put(protect, updateUser).delete(protect, deleteUser);
router.route("/auth").post(authUser);
router.route("/logout").post(logoutUser);

module.exports = router;
