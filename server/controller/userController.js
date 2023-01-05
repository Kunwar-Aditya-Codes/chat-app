const User = require('../model/User');

// @route   GET api/user/:userId
// @desc    Get a user
// @access  Private
exports.getUser = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const foundUser = await User.findById(userId)
    .select('-password')
    .lean()
    .exec();

  if (!foundUser) {
    return res.status(203).json({ message: 'No user found' });
  }

  res.status(200).json(foundUser);
};

// @route   GET api/user
// @desc    Get logged in user
// @access  Private
exports.getLoggedInUser = async (req, res) => {
  const foundUser = await User.findById(req.userId)
    .select('-password')
    .lean()
    .exec();

  if (!foundUser) {
    return res.status(203).json({ message: 'No user found' });
  }

  res.status(200).json(foundUser);
};

// @route   POST api/user/search?query=...
// @desc    Search for users
// @access  Private
exports.searchUsers = async (req, res) => {
  const { query } = req.query;
  const userId = req.userId;

  if (!query) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const foundUsers = await User.find({
    $and: [
      { _id: { $ne: userId } },
      {
        $or: [
          { username: { $regex: query, $options: 'i' } },
          { email: { $regex: query, $options: 'i' } },
        ],
      },
    ],
  });

  res.status(200).json(foundUsers);
};
