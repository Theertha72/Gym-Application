const router = require('express').Router();
const Register = require('../models/register.model');

router.route('/').post(async (req, res) => {
  const { name, phone, degree } = req.body;
  
  const newRegistration = new Register({
    name,
    phone,
    degree
  });

  try {
    await newRegistration.save();
    res.json('Registration successful!');
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json('Error: Phone number already registered');
    } else {
      res.status(400).json('Error: ' + err);
    }
  }
});

module.exports = router;
