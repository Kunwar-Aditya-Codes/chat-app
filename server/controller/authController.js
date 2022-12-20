import User from '../schema/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      throw new Error('Please fill in all fields');
    }

    const foundUser = await User.findOne({ email }).lean().exec();

    if (foundUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: 'User created successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error('Please fill in all fields');
    }

    const foundUser = await User.findOne({
      email,
    })
      .lean()
      .exec();

    if (!foundUser) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, foundUser.password);

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const accessToken = jwt.sign(
      {
        id: foundUser._id,
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
      // httpOnly: true,
      // sameSite: 'none',
      // secure: true,
    });

    res.status(200).json({
      message: 'User logged in successfully',
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

export const refresh = async (req, res, next) => {};

export const logout = async (req, res, next) => {};
