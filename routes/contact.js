const router = require('express').Router();
const Contact = require('../models/contact.model');
const transporter = require('../config/emailConfig');

router.route('/').post(async (req, res) => {
  const { name, email, message } = req.body;
  
  const newContact = new Contact({
    name,
    email,
    message
  });

  try {
    // Save to database
    await newContact.save();

    // Send email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting Elite Fitness',
      html: `
        <h2>Thank you for reaching out to Elite Fitness!</h2>
        <p>Dear ${name},</p>
        <p>We have received your message:</p>
        <p><em>${message}</em></p>
        <p>We will get back to you shortly.</p>
        <br>
        <p>Best regards,</p>
        <p>Elite Fitness Team</p>
      `
    };

    await transporter.sendMail(mailOptions);
    
    res.json('Message sent successfully and email notification sent!');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

module.exports = router;
