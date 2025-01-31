const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection function
async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log('Successfully connected to MongoDB');
    return mongoose.connection;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

// User model (same as in register.model.js)
const registerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  plan: {
    type: String,
    required: true,
    enum: ['Basic Plan', 'Premium Plan', 'Pro Plan'],
    default: 'Basic Plan'
  },
  registrationDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Register = mongoose.model('Register', registerSchema);

// Function to insert a new user
async function insertUser(userData) {
  try {
    const newUser = new Register(userData);
    const savedUser = await newUser.save();
    console.log('User inserted successfully:', savedUser);
    return savedUser;
  } catch (error) {
    console.error('Error inserting user:', error);
    throw error;
  }
}

// Function to find users
async function findUsers(query = {}) {
  try {
    const users = await Register.find(query);
    console.log('Found users:', users);
    return users;
  } catch (error) {
    console.error('Error finding users:', error);
    throw error;
  }
}

// Function to delete all users (use carefully!)
async function deleteAllUsers() {
  try {
    const result = await Register.deleteMany({});
    console.log(`Deleted ${result.deletedCount} users`);
    return result;
  } catch (error) {
    console.error('Error deleting users:', error);
    throw error;
  }
}

// Main function to demonstrate operations
async function main() {
  try {
    // Connect to database
    await connectToDatabase();

    // Example: Insert a user
    const newUser = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      plan: 'Premium Plan'
    };
    await insertUser(newUser);

    // Find all users
    await findUsers();

    // Optional: Uncomment to delete all users
    // await deleteAllUsers();
  } catch (error) {
    console.error('Operation failed:', error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
  }
}

// Uncomment the line below to run the script directly
// main();

module.exports = {
  connectToDatabase,
  insertUser,
  findUsers,
  deleteAllUsers
};
