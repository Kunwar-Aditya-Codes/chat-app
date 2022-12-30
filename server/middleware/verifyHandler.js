const jwt = require('jsonwebtoken');

const verifyJwt = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized!' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Forbidden!' });
    req.userId = decoded.id;
    req.username = decoded.username;
    req.email = decoded.email;
    next();
  });
};

module.exports = verifyJwt;
