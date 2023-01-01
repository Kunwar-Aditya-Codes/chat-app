const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

  await newUser.save();

  return res.status(201).json({
    message: 'User created successfully',
  });
};

// @route   POST api/auth/login
// @desc    Login a user
// @access  Public
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: 'Please enter all fields',
    });
  }

  const foundUser = await User.findOne({ email }).lean().exec();

  if (!foundUser) {
    return res.status(400).json({
      message: 'Invalid credentials',
    });
  }

  const isMatch = await bcrypt.compare(password, foundUser.password);

  if (!isMatch) {
    return res.status(400).json({
      message: 'Invalid credentials',
    });
  }

  const accessToken = jwt.sign(
    { id: foundUser._id, email: foundUser.email },
    process.env.ACCESS_TOKEN,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { id: foundUser._id },
    process.env.REFRESH_TOKEN,
    { expiresIn: '7d' }
  );

  res.cookie('refreshToken', refreshToken, {});

  return res.status(200).json({
    message: 'Logged in successfully',
    accessToken,
  });
};

// @route   GET api/auth/refresh
// @desc    Refresh token
// @access  Private
exports.refresh = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }

  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);

  const foundUser = await User.findById(decoded.id).lean().exec();

  if (!foundUser) {
    return res.status(400).json({
      message: 'Invalid credentials',
    });
  }

  const accessToken = jwt.sign(
    { id: foundUser._id, email: foundUser.email },
    process.env.ACCESS_TOKEN,
    { expiresIn: '15m' }
  );

  return res.status(200).json({
    accessToken,
  });
};

// @route   GET api/auth/logout
// @desc    Logout a user
// @access  Private
exports.logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(203).json({
      message: 'No token',
    });
  }

  res.clearCookie('refreshToken');

  return res.status(200).json({
    message: 'Logged out successfully',
  });
};
