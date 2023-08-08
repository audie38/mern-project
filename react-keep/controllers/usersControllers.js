const Users = require("../models/users");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const { Op } = require("sequelize");

// @desc    Register New User
// @route   POST /api/user
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, username, email, password } = req.body;
  if (!name || !username || !email | !password) {
    return res.status(400).json({ message: "Please Fill All Required Fields" });
  }
  const usersExists = await Users.findOne({
    where: {
      [Op.or]: [{ email: email }, { username: username }],
    },
  });
  if (usersExists) {
    return res.status(400).json({ message: "Users Already Exists" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = await Users.create({
    name,
    email,
    username,
    password: hashedPassword,
  });

  if (newUser) {
    generateToken(res, newUser.userId);
    return res.status(201).json({
      data: {
        userId: newUser.userId,
        name: newUser.name,
        email: newUser.email,
        username: newUser.username,
      },
    });
  }
  return res.status(400).json({ message: "Invalid User data" });
});

// @desc    Auth User
// @route   POST /api/user/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { account, password } = req.body;
  if (!account || !password) {
    return res.status(401).json({ message: "Credentials cannot be empty" });
  }
  const userExists = await Users.findOne({
    where: {
      [Op.or]: [{ email: account }, { username: account }],
    },
  });
  if (userExists) {
    const validPassword = await bcrypt.compare(password, userExists.password);
    if (validPassword) {
      generateToken(res, userExists.userId);
      return res.status(200).json({
        data: {
          userId: userExists.userId,
          name: userExists.name,
          email: userExists.email,
          username: userExists.username,
        },
      });
    }
    return res.status(401).json({ message: "Invalid Credentials" });
  }

  return res.status(404).json({ message: "User Not Registered" });
});

// @desc    User Logout
// @route   POST /api/user/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  return res.status(200).json({ message: "Logout Success" });
});

// @desc    Get User
// @route   GET /api/user
// @access  Private
const getUser = asyncHandler(async (req, res) => {
  const user = {
    userId: req?.user?.userId,
    name: req?.user?.name,
    username: req?.user?.username,
    email: req?.user?.email,
  };
  return res.status(200).json({ data: user });
});

// @desc    Update User
// @route   PUT /api/user
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  const existingUser = await Users.findByPk(req.user.userId);
  if (!existingUser) {
    return res.status(404).json({ message: "User Not Registered" });
  }
  const { name, password } = req.body;

  if (name) {
    existingUser.name = name;
  }
  if (password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    existingUser.password = hashedPassword;
  }
  const updatedUser = await existingUser.save();
  return res.status(200).json({
    data: {
      userId: updatedUser.userId,
      name: updatedUser.name,
      email: updatedUser.email,
      username: updatedUser.username,
    },
  });
});

// @desc    Delete User
// @route   DELETE /api/user
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
  const existingUser = await Users.findByPk(req.user.userId);
  if (!existingUser) {
    return res.status(404).json({ message: "User Not Registered" });
  }
  const deletedUser = await existingUser.destroy();
  if (deletedUser) {
    return res.status(200).json({ message: "User Deleted" });
  }

  return res.status(500).json({ message: "Failed to Delete User" });
});

module.exports = {
  registerUser,
  authUser,
  logoutUser,
  getUser,
  updateUser,
  deleteUser,
};
