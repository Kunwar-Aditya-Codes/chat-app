const User = require('../schema/User');

exports.getSearchUser = async (req, res) => {
  const { search } = req.query;

  const users = await User.find({
    _id: { $ne: req.userId },
    $or: [
      { username: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ],
  })
    .select('-password')
    .exec();

  if (!users) {
    return res.status(404).json({ msg: 'User not found' });
  }

  res.status(200).json({ users });
};
