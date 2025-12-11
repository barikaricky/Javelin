const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');

const fixUserRole = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/javelin';
    console.log('Connecting to MongoDB...');
    
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');

    // Find all users
    const users = await User.find({});
    console.log(`\nFound ${users.length} user(s) in database:`);
    
    users.forEach(user => {
      console.log(`- Email: ${user.email}, Role: ${user.role}, Active: ${user.isActive}`);
    });

    if (users.length === 0) {
      console.log('\n❌ No users found in database!');
      console.log('Please register a user first at http://localhost:3000/admin/register');
      process.exit(0);
    }

    // Update all users to admin role and make them active
    console.log('\n🔧 Fixing user roles and status...');
    
    for (const user of users) {
      user.role = 'admin';
      user.isActive = true;
      await user.save();
      console.log(`✅ Updated ${user.email} to role: admin, isActive: true`);
    }

    console.log('\n✨ All users updated successfully!');
    console.log('You can now login with your credentials.');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

fixUserRole();
