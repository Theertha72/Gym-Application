const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register new user
router.post('/register', async (req, res) => {
  try {
    console.log('Received registration request:', req.body);
    const { name, email, plan } = req.body;

    if (!name || !email || !plan) {
      return res.status(400).json({
        message: 'Please provide all required fields: name, email, and plan'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        message: 'Email already registered. Please use a different email.' 
      });
    }

    // Create new user
    const user = new User({
      name,
      email,
      plan
    });

    // Save user to database
    const savedUser = await user.save();
    console.log('User saved successfully:', savedUser);

    res.status(201).json({ 
      message: 'Registration successful!',
      user: savedUser 
    });
  } catch (error) {
    console.error('Registration error details:', {
      message: error.message,
      code: error.code,
      name: error.name
    });
    
    // Send appropriate error message
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Invalid input data', 
        error: error.message 
      });
    }
    
    res.status(500).json({ 
      message: 'Registration failed', 
      error: error.message 
    });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
