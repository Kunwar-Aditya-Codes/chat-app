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
