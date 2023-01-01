const User = require('../model/User');

// @route   POST api/auth/register
// @desc    Register a user
// @access  Public
exports.register = async (req, res) => {};

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
