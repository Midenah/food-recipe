const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');

// Register new user
exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({
      email,
    });
    if (userExists)
      return res.status(400).json({
        message: 'User already exists',
      });

    const user = new User({
      name,
      email,
      password,
      role,
    });

    // Hash password before saving
    user.password = await bcrypt.hash(password, 10);

    await user.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      config.jwtSecret,
      {
        expiresIn: '3d',
      }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error,
    });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      email,
    });
    if (!user)
      return res.status(400).json({
        message: 'Invalid credentials',
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({
        message: 'Invalid credentials',
      });

    const token = jwt.sign(
      {
        _id: user._id,
      },
      config.jwtSecret,
      {
        expiresIn: '3d',
      }
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error,
    });
  }
};
