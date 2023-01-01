const jwt = require('jsonwebtoken');

const tokenVerifyHandler = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized!' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Forbidden!' });
    req.email = decoded.email;
    req.userId = decoded.id;
    next();
  });
};

module.exports = tokenVerifyHandler;
