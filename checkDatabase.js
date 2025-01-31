const mongoose = require('mongoose');
require('dotenv').config();

async function checkDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Get the database connection
    const connection = mongoose.connection;

    // List all collections in the database
    const collections = await connection.db.listCollections().toArray();
    
    console.log('Collections in the database:');
    collections.forEach(collection => {
      console.log(`- ${collection.name}`);
    });

    // Count documents in each collection
    for (let collection of collections) {
      const count = await connection.db.collection(collection.name).countDocuments();
      console.log(`  ${collection.name}: ${count} documents`);
    }

    // Close the connection
    await mongoose.connection.close();
  } catch (error) {
    console.error('Error checking database:', error);
  }
}

checkDatabase();
