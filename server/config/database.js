const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return true;
  }

  try {
    mongoose.set('strictQuery', false);
    
    console.log('Connecting to MongoDB Atlas...');
    
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/javelin-security', {
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 45000,
    });

    isConnected = true;
    console.log('✓ MongoDB Connected Successfully!');
    console.log('  Host:', conn.connection.host);
    console.log('  Database:', conn.connection.name);
    return true;
  } catch (error) {
    console.error('✗ MongoDB Connection Failed!');
    console.error('  Error:', error.message);
    
    // Provide helpful diagnostics
    if (error.message.includes('authentication failed') || error.message.includes('auth')) {
      console.error('\n  ACTION REQUIRED:');
      console.error('  - Verify MongoDB Atlas credentials');
      console.error('  - Check Database Access settings');
    } else if (error.message.includes('ENOTFOUND') || error.message.includes('timeout')) {
      console.error('\n  ACTION REQUIRED:');
      console.error('  - Add your IP to MongoDB Atlas Network Access');
      console.error('  - Allow access from anywhere (0.0.0.0/0)');
      console.error('  - Check internet connection');
    }
    
    console.log('\n  Server will continue running but database operations will fail');
    console.log('  Fix the issue above and restart the server\n');
    return false;
  }
};

module.exports = connectDB;
