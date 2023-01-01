const User = require('../model/User');
const bcrypt = require('bcrypt');

// @route   POST api/auth/register
// @desc    Register a user
// @access  Public
exports.register = async (req, res) => {
  const { username, email, password, profilePic } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: 'Please enter all fields',
    });
  }

  const foundUser = await User.findOne({ email }).lean().exec();

  if (foundUser) {
    return res.status(400).json({
      message: 'User already exists',
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    profilePic,
  });

  return res.status(201).json({
    message: 'User created successfully',
  });
};

// @route   POST api/auth/login
// @desc    Login a user
// @access  Public
exports.login = async (req, res) => {};

// @route   GET api/auth/refresh
// @desc    Refresh token
// @access  Private
exports.refresh = async (req, res) => {};

// @route   GET api/auth/logout
// @desc    Logout a user
// @access  Private
exports.logout = async (req, res) => {};
