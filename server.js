const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Import models
const Register = require('./models/register.model');
const User = require('./models/User');

// Middleware
app.use(cors());
app.use(express.json());

// Set mongoose strictQuery to suppress warning
mongoose.set('strictQuery', false);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connection established successfully'))
.catch((error) => console.error('MongoDB connection error:', error));

// Register route
app.post('/api/users/register', async (req, res) => {
  try {
    const { name, email, plan } = req.body;
    
    console.log('Received registration request:', { name, email, plan });

    // Validate input
    if (!name || !email || !plan) {
      console.error('Incomplete registration data');
      return res.status(400).json({ 
        message: 'Please provide name, email, and plan' 
      });
    }
    
    // Check if user already exists
    const existingUser = await Register.findOne({ email });
    if (existingUser) {
      console.warn('Email already registered:', email);
      return res.status(400).json({ 
        message: 'Email already registered' 
      });
    }

    // Create new user
    const newUser = new Register({
      name,
      email,
      plan
    });

    // Save user to database
    const savedUser = await newUser.save();
    console.log('User registered successfully:', savedUser);
    
    res.status(201).json({ 
      message: 'Registration successful!',
      user: { 
        name: savedUser.name, 
        email: savedUser.email, 
        plan: savedUser.plan 
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    
    // More detailed error handling
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    
    res.status(500).json({ 
      message: 'Registration failed', 
      error: error.message 
    });
  }
});

// Get all users route with more details
app.get('/api/users', async (req, res) => {
  try {
    const users = await Register.find().select('name email plan registrationDate');
    res.json({
      total: users.length,
      users: users
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Failed to retrieve users', 
      error: error.message 
    });
  }
});

// User Registration Route with WhatsApp Integration
app.post('/api/users/new-register', async (req, res) => {
  try {
    const { name, email, plan } = req.body;
    
    // Validate input
    if (!name || !email || !plan) {
      return res.status(400).json({ 
        message: 'Please provide name, email, and plan' 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        message: 'User with this email already exists' 
      });
    }

    // Create new user
    const newUser = new User({
      name,
      email,
      plan,
      status: 'active'
    });

    // Save user to database
    const savedUser = await newUser.save();
    
    // Prepare WhatsApp message (URL-encoded)
    const whatsappMessage = encodeURIComponent(`*New Gym Registration*\n
Name: ${name}\n
Email: ${email}\n
Selected Plan: ${plan}\n
Thank you for registering!`);

    // WhatsApp share URL
    const whatsappUrl = `https://wa.me/918870152376?text=${whatsappMessage}`;
    
    res.status(201).json({ 
      message: 'User registered successfully!',
      user: { 
        id: savedUser._id,
        name: savedUser.name, 
        email: savedUser.email, 
        plan: savedUser.plan 
      },
      whatsappUrl: whatsappUrl
    });
  } catch (error) {
    console.error('User registration error:', error);
    
    // More detailed error handling
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    
    res.status(500).json({ 
      message: 'Registration failed', 
      error: error.message 
    });
  }
});

// Get all users route
app.get('/api/users/all', async (req, res) => { 
  try {
    const users = await User.find({}, 'name email plan registrationDate status');
    res.json({
      total: users.length,
      users: users
    });
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ 
      message: 'Failed to retrieve users', 
      error: error.message 
    });
  }
});

// Get user by ID route
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id, 'name email plan registrationDate status');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({ 
      message: 'Failed to retrieve user', 
      error: error.message 
    });
  }
});

// Update user route
app.put('/api/users/:id', async (req, res) => {
  try {
    const { name, plan, status } = req.body;
    
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id, 
      { name, plan, status }, 
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'User updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ 
      message: 'Failed to update user', 
      error: error.message 
    });
  }
});

// Delete user route
app.delete('/api/users/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'User deleted successfully',
      user: deletedUser
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ 
      message: 'Failed to delete user', 
      error: error.message 
    });
  }
});

const PORT = process.env.PORT;

// Create server with error handling
const server = app.listen(PORT)
  .on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use. Please try a different port or close the application using this port.`);
      process.exit(1);
    } else {
      console.error('Server error:', err);
    }
  })
  .on('listening', () => {
    console.log(`Server is running on port ${PORT}`);
  });

module.exports = app;
