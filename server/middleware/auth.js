const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.cookies.accessToken;
    console.log(token);
  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = auth;