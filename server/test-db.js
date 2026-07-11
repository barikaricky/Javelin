require('dotenv').config();
const mongoose = require('mongoose');

console.log('=== MongoDB Connection Diagnostic ===\n');
console.log('1. Environment Check:');
console.log('   NODE_ENV:', process.env.NODE_ENV);
console.log('   MongoDB URI exists:', !!process.env.MONGODB_URI);
console.log('   URI (masked):', process.env.MONGODB_URI?.replace(/:[^:@]+@/, ':****@'));

console.log('\n2. Attempting connection...');

mongoose.set('strictQuery', false);

// Add connection event listeners for detailed debugging
mongoose.connection.on('connecting', () => {
  console.log('   Status: Connecting...');
});

mongoose.connection.on('connected', () => {
  console.log('   Status: Connected!');
});

mongoose.connection.on('error', (err) => {
  console.log('   Status: Error -', err.message);
});

mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 15000,
  socketTimeoutMS: 45000,
})
.then(() => {
  console.log('\n✓ SUCCESS: MongoDB Connected!');
  console.log('   Host:', mongoose.connection.host);
  console.log('   Database:', mongoose.connection.name);
  console.log('   Ready State:', mongoose.connection.readyState);
  console.log('\n=== Connection Test Passed ===');
  process.exit(0);
})
.catch((error) => {
  console.error('\n✗ FAILURE: MongoDB Connection Failed!');
  console.error('   Error Type:', error.name);
  console.error('   Error Message:', error.message);
  
  if (error.message.includes('ENOTFOUND')) {
    console.error('\n   ISSUE: Cannot resolve cluster hostname');
    console.error('   Check: Internet connection & DNS resolution');
  } else if (error.message.includes('authentication failed')) {
    console.error('\n   ISSUE: Authentication failed');
    console.error('   Check: Username and password in MongoDB Atlas');
  } else if (error.message.includes('IP')) {
    console.error('\n   ISSUE: IP address not whitelisted');
    console.error('   Action: Add your IP to MongoDB Atlas Network Access');
  }
  
  console.error('\n=== Connection Test Failed ===');
  process.exit(1);
});
