const { connectToDatabase, insertUser, findUsers, deleteAllUsers } = require('./dbOperations');

async function runTests() {
  try {
    // Connect to database
    await connectToDatabase();

    // Insert a test user
    const testUser = {
      name: 'Test User',
      email: `test.user.${Date.now()}@example.com`,
      plan: 'Basic Plan'
    };
    const insertedUser = await insertUser(testUser);
    console.log('Inserted User:', insertedUser);

    // Find all users
    const allUsers = await findUsers();
    console.log('All Users:', allUsers);
  } catch (error) {
    console.error('Test failed:', error);
  }
}

runTests();
