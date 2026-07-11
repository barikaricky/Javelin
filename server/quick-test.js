require('dotenv').config();

console.log('=== Quick MongoDB Connection Test ===\n');

const uri = process.env.MONGODB_URI;
console.log('Testing URI (masked):', uri?.replace(/:[^:@]+@/, ':****@'));

// Parse the connection string to check its validity
try {
  const url = new URL(uri.replace('mongodb+srv://', 'https://'));
  console.log('\nParsed Connection Details:');
  console.log('  Protocol: mongodb+srv');
  console.log('  Username:', url.username);
  console.log('  Password: ****');
  console.log('  Host:', url.hostname);
  console.log('  Database:', uri.split('/').pop().split('?')[0]);
  console.log('  Has Auth:', url.username && url.password ? 'Yes' : 'No');
} catch (err) {
  console.error('Error parsing URI:', err.message);
}

console.log('\n--- Attempting Mongoose Connection ---');

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const timeout = setTimeout(() => {
  console.error('\n✗ CONNECTION TIMEOUT (15 seconds)');
  console.error('\nPossible Issues:');
  console.error('  1. IP Address not whitelisted in MongoDB Atlas');
  console.error('     Solution: Go to Network Access and add 0.0.0.0/0 (allow all) or your current IP');
  console.error('  2. Incorrect credentials');
  console.error('     Solution: Verify username/password in MongoDB Atlas Database Access');
  console.error('  3. Cluster is paused or deleted');
  console.error('     Solution: Check MongoDB Atlas cluster status');
  console.error('  4. Firewall blocking outbound connections');
  console.error('     Solution: Check Windows Firewall settings');
  process.exit(1);
}, 15000);

mongoose.connect(uri, {
  serverSelectionTimeoutMS: 15000,
})
.then(() => {
  clearTimeout(timeout);
  console.log('\n✓ SUCCESS! MongoDB Atlas Connected');
  console.log('  Host:', mongoose.connection.host);
  console.log('  Database:', mongoose.connection.name);
  process.exit(0);
})
.catch((error) => {
  clearTimeout(timeout);
  console.error('\n✗ CONNECTION FAILED');
  console.error('  Error:', error.message);
  
  if (error.message.includes('authentication failed') || error.message.includes('auth')) {
    console.error('\n  ISSUE: Authentication Failed');
    console.error('  Action Required:');
    console.error('    1. Go to MongoDB Atlas > Database Access');
    console.error('    2. Verify user "barika" exists');
    console.error('    3. Reset password to: Living57754040');
    console.error('    4. Ensure user has "readWrite" role on "javelin-security" database');
  } else if (error.message.includes('IP') || error.message.includes('not allowed')) {
    console.error('\n  ISSUE: IP Not Whitelisted');
    console.error('  Action Required:');
    console.error('    1. Go to MongoDB Atlas > Network Access');
    console.error('    2. Click "Add IP Address"');
    console.error('    3. Select "Allow Access from Anywhere" (0.0.0.0/0)');
    console.error('    4. Save and wait 2-3 minutes');
  } else {
    console.error('\n  General connection issue - check MongoDB Atlas cluster status');
  }
  
  process.exit(1);
});
