const mongoose = require('mongoose');
require('dotenv').config();

async function debugMongoConnection() {
  try {
    // Detailed connection options
    const connectionOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    };

    console.log('Attempting to connect to MongoDB...');
    console.log('Connection URI:', process.env.MONGODB_URI);

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, connectionOptions);

    // Create a test schema and model
    const TestSchema = new mongoose.Schema({
      name: String,
      createdAt: { type: Date, default: Date.now }
    });
    const TestModel = mongoose.model('DebugTest', TestSchema);

    // Create a test document
    const testDoc = new TestModel({ name: 'MongoDB Connection Test' });
    await testDoc.save();

    console.log('Successfully connected to MongoDB');
    console.log('Test document created:', testDoc);

    // List all collections in the database
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Existing Collections:');
    collections.forEach(collection => {
      console.log(`- ${collection.name}`);
    });

    // Close the connection
    await mongoose.connection.close();
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    
    // Detailed error logging
    if (error.name === 'MongoNetworkError') {
      console.error('Network error. Possible causes:');
      console.error('1. MongoDB server not running');
      console.error('2. Incorrect connection URI');
      console.error('3. Firewall blocking connection');
    }
  }
}

// Run the debug function
debugMongoConnection();
