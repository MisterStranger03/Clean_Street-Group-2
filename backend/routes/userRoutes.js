const express = require('express');
const User = require('../models/User');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authMiddleware = require('../middleware/authMiddleware');
const verifyJWT = require('../middleware/verifyJWT');

// Register user
router.post('/register', async (req, res) => {
  console.log('Register endpoint called with:', req.body);
  const { email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });
    console.log('User exists:', userExists);

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      email,
      password,
      role,
    });

    console.log('User created:', user);

    if (user) {
      res.status(201).json({
        _id: user.id,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Error during user creation:', error);
    res.status(500).json({ message: error.message });
  }
});

// Login user
router.post('/login', async (req, res) => {
  console.log('Login endpoint called with:', req.body);
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log('User found:', user);

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
      });

      req.session.user = {
        id: user.id,
        email: user.email,
        role: user.role,
        token,
      };

      console.log('Login successful:', req.session.user);

      res.json({
        message: 'Login successful',
        user: req.session.user,
      });
    } else {
      console.log('Invalid email or password');
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error in login endpoint:', error);
    res.status(500).json({ message: error.message });
  }
});

// Edit profile
router.put('/profile', verifyJWT, async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (user) {
      user.email = email || user.email;
      user.role = role || user.role;

      if (password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser.id,
        email: updatedUser.email,
        role: updatedUser.role,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;