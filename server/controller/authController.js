const User = require('../schema/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, email, password, profileImage } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: 'Please fill in all fields',
    });
  }

  const foundUser = await User.findOne({ email }).lean().exec();

  if (foundUser) {
    return res.status(400).json({
      message: 'User already exists',
    });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await User.create({
    username,
    email,
    password: hashedPassword,
    profileImage,
  });

  res.status(201).json({
    message: 'User created successfully',
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: 'Please fill in all fields',
    });
  }

  const foundUser = await User.findOne({
    email,
  })
    .lean()
    .exec();

  if (!foundUser) {
    return res.status(400).json({
      message: 'Invalid credentials',
    });
  }

  const isPasswordValid = await bcrypt.compare(password, foundUser.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: 'Invalid credentials',
    });
  }

  const accessToken = jwt.sign(
    {
      id: foundUser._id,
      username: foundUser.username,
      email: foundUser.email,
    },
    process.env.ACCESS_TOKEN,
    {
      expiresIn: '1d',
    }
  );

  const refreshToken = jwt.sign(
    {
      id: foundUser._id,
    },
    process.env.REFRESH_TOKEN,
    {
      expiresIn: '7d',
    }
  );

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  });

  res.status(200).json({
    message: 'User logged in successfully',
    accessToken,
  });
};

exports.refresh = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies.refreshToken) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }

  const refreshToken = cookies.refreshToken;

  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);

  if (!decoded) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }

  const foundUser = await User.findOne({
    _id: decoded.id,
  });

  if (!foundUser) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }

  const accessToken = jwt.sign(
    {
      id: foundUser._id,
      username: foundUser.username,
      email: foundUser.email,
    },
    process.env.ACCESS_TOKEN,
    {
      expiresIn: '1d',
    }
  );

  res.status(200).json({
    accessToken,
  });
};

exports.logout = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies.refreshToken) {
    return res.status(203).json({
      message: 'No content',
    });
  }

  res.clearCookie('refreshToken');

  res.status(200).json({
    message: 'User logged out successfully',
  });
};
