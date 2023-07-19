const User = require("../models/User");
const Note = require("../models/Note");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

// @desc GET all Users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").lean();
  if (!users.length > 0) {
    return res.status(400).json({ message: "No Users Found" });
  }
  res.status(200).json(users);
});

// @desc GET User
// @route GET /users/:id
// @access Private
const getUserById = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    return res.status(400).json({ message: "UserId Required" });
  }
  const users = await User.findById(userId).select("-password").lean();
  if (!users) {
    return res.status(404).json({ message: "No Users Found" });
  }
  res.status(200).json(users);
});

// @desc Create New User
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
  const { username, password, roles } = req.body;
  if (!username || !password || !Array.isArray(roles) || !roles.length) {
    return res.status(400).json({ message: "All Fields are required" });
  }
  const duplicate = await User.findOne({ username }).lean().exec();
  if (duplicate) {
    return res.status(409).json({ message: "Duplicate Username" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const userObj = { username, password: hashedPassword, roles };
  const user = await User.create(userObj);
  if (user) {
    res.status(201).json({ message: `New User ${username} created` });
  } else {
    res.status(400).json({ message: "Invalid User Data Received" });
  }
});

// @desc Update User
// @route PUT /users/:id
// @access Private
const updateUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const { username, roles, active, password } = req.body;

  if (!userId || !username || !Array.isArray(roles) || !roles.length || typeof active !== "boolean") {
    return res.status(400).json({ message: "All Fields are required" });
  }

  const user = await User.findById(userId).exec();

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const duplicate = await User.findOne({ username }).lean().exec();
  if (duplicate && duplicate?._id.toString() !== userId) {
    return res.status(409).json({ message: "Username Cannot be changed" });
  }

  user.username = username;
  user.roles = roles;
  user.active = active;

  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }

  const updatedUser = await user.save();
  res.status(200).json({ message: `${updatedUser.username} Updated` });
});

// @desc Delete User
// @route DELETE /users/:id
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    return res.status(400).json({ message: "Invalid UserId" });
  }

  const note = await Note.findOne({ user: userId }).lean().exec();
  if (note) {
    return res.status(400).json({ message: "User has assigned notes" });
  }

  const user = await User.findById(userId).exec();
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const result = await user.deleteOne();
  const reply = `Username ${result.username} with ID ${result._id} deleted`;
  res.status(200).json(reply);
});

module.exports = {
  getAllUsers,
  getUserById,
  createNewUser,
  updateUser,
  deleteUser,
};
