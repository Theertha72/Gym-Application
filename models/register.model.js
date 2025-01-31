const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

const registerSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return validator.isEmail(v);
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  plan: {
    type: String,
    required: [true, 'Plan selection is required'],
    enum: {
      values: ['Basic Plan', 'Premium Plan', 'Pro Plan'],
      message: '{VALUE} is not a valid plan'
    },
    default: 'Basic Plan'
  },
  registrationDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Create a compound unique index on email to ensure uniqueness
registerSchema.index({ email: 1 }, { unique: true });

const Register = mongoose.model('Register', registerSchema);

module.exports = Register;
