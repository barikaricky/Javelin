require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define User schema directly to avoid model issues
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ['admin', 'superadmin'], default: 'admin' },
  isActive: { type: Boolean, default: true },
  lastLogin: Date
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

const createAdminUser = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log('✓ MongoDB Connected\n');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@javelin.com' });
    
    if (existingAdmin) {
      console.log('✓ Admin user already exists');
      console.log('  Email:', existingAdmin.email);
      console.log('  Role:', existingAdmin.role);
      console.log('\nYou can login with:');
      console.log('  Email: admin@javelin.com');
      console.log('  Password: admin123\n');
      await mongoose.connection.close();
      process.exit(0);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    // Create admin user directly
    const adminUser = new User({
      name: 'Admin',
      email: 'admin@javelin.com',
      password: hashedPassword,
      role: 'superadmin',
      isActive: true
    });

    await adminUser.save();

    console.log('✓ Admin user created successfully!');
    console.log('================================');
    console.log('Email: admin@javelin.com');
    console.log('Password: admin123');
    console.log('Role: superadmin');
    console.log('================================\n');
    console.log('You can now login to the admin portal!\n');
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('✗ Error:', error.message);
    if (error.code === 11000) {
      console.log('\nAdmin user already exists. You can login with:');
      console.log('  Email: admin@javelin.com');
      console.log('  Password: admin123\n');
    }
    await mongoose.connection.close();
    process.exit(1);
  }
};

console.log('Creating admin user for Javelin Security...\n');
createAdminUser();
