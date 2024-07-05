const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config');

const auth = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    const user = await User.findOne({
      _id: decoded._id,
    });
    if (!user) throw new Error();
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      message: 'Please authenticate',
    });
  }
};

module.exports = auth;