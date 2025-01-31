const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }, 
  email: {
    type: String,
    required: true,
    unique: true
  },
  plan: {
    type: String,
    required: true,
    enum: ['Basic Plan', 'Premium Plan', 'Pro Plan']
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'inactive'],
    default: 'pending'
  }
});

module.exports = mongoose.model('User', userSchema);
