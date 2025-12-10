const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/javelin-security');
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

// Import models
const User = require('./models/User');
const TeamMember = require('./models/TeamMember');
const Site = require('./models/Site');
const GalleryItem = require('./models/GalleryItem');
const ContactInfo = require('./models/ContactInfo');

// Seed data
const seedAdmin = async () => {
  try {
    // Check if admin exists
    const existingAdmin = await User.findOne({ email: 'admin@javelin.com' });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
    } else {
      // Create admin user
      const admin = await User.create({
        name: 'Admin',
        email: 'admin@javelin.com',
        password: 'admin123', // Change this in production!
        role: 'superadmin',
        isActive: true
      });
      console.log('Admin user created:', admin.email);
    }
  } catch (error) {
    console.error('Error seeding admin:', error);
  }
};

// Seed sample team members
const seedTeamMembers = async () => {
  try {
    const count = await TeamMember.countDocuments();
    if (count > 0) {
      console.log('Team members already exist, skipping...');
      return;
    }

    const teamMembers = [
      {
        name: 'John Doe',
        position: 'CEO & Founder',
        bio: 'With over 20 years of experience in the security industry, John founded Javelin Security with a vision to provide comprehensive security solutions.',
        image: '/assets/images/team/placeholder.jpg',
        order: 1,
        socialLinks: {
          linkedin: 'https://linkedin.com',
          twitter: 'https://twitter.com'
        }
      },
      {
        name: 'Jane Smith',
        position: 'Operations Director',
        bio: 'Jane oversees all operational aspects of Javelin Security, ensuring our clients receive the highest quality service.',
        image: '/assets/images/team/placeholder.jpg',
        order: 2,
        socialLinks: {
          linkedin: 'https://linkedin.com'
        }
      },
      {
        name: 'Mike Johnson',
        position: 'Security Manager',
        bio: 'Mike manages our team of security professionals and ensures all sites are properly staffed and secured.',
        image: '/assets/images/team/placeholder.jpg',
        order: 3,
        socialLinks: {
          linkedin: 'https://linkedin.com'
        }
      }
    ];

    await TeamMember.insertMany(teamMembers);
    console.log('Sample team members created');
  } catch (error) {
    console.error('Error seeding team members:', error);
  }
};

// Seed sample sites
const seedSites = async () => {
  try {
    const count = await Site.countDocuments();
    if (count > 0) {
      console.log('Sites already exist, skipping...');
      return;
    }

    const sites = [
      {
        name: 'Lagos Headquarters',
        location: 'Lagos, Nigeria',
        description: 'Our main headquarters providing comprehensive security services across the Lagos metropolitan area.',
        image: '/assets/images/sites/placeholder.jpg',
        services: ['Armed Guards', 'CCTV Monitoring', '24/7 Patrol'],
        order: 1
      },
      {
        name: 'Abuja Branch',
        location: 'Abuja, Nigeria',
        description: 'Serving the Federal Capital Territory with premium security solutions for government and corporate clients.',
        image: '/assets/images/sites/placeholder.jpg',
        services: ['VIP Protection', 'Event Security', 'Access Control'],
        order: 2
      }
    ];

    await Site.insertMany(sites);
    console.log('Sample sites created');
  } catch (error) {
    console.error('Error seeding sites:', error);
  }
};

// Seed sample gallery items
const seedGalleryItems = async () => {
  try {
    const count = await GalleryItem.countDocuments();
    if (count > 0) {
      console.log('Gallery items already exist, skipping...');
      return;
    }

    const galleryItems = [
      {
        title: 'Security Team Training',
        description: 'Our team undergoing advanced security training',
        category: 'team',
        image: '/assets/images/gallery/placeholder.jpg',
        order: 1
      },
      {
        title: 'Corporate Event Security',
        description: 'Providing security for a major corporate event',
        category: 'events',
        image: '/assets/images/gallery/placeholder.jpg',
        order: 2
      },
      {
        title: 'Patrol Operations',
        description: 'Our security personnel on patrol duty',
        category: 'work-in-action',
        image: '/assets/images/gallery/placeholder.jpg',
        order: 3
      }
    ];

    await GalleryItem.insertMany(galleryItems);
    console.log('Sample gallery items created');
  } catch (error) {
    console.error('Error seeding gallery items:', error);
  }
};

// Seed contact info
const seedContactInfo = async () => {
  try {
    const existing = await ContactInfo.findOne();
    if (existing) {
      console.log('Contact info already exists, skipping...');
      return;
    }

    await ContactInfo.create({
      companyName: 'Javelin Security',
      address: {
        street: '123 Security Street',
        city: 'Lagos',
        state: 'Lagos State',
        country: 'Nigeria',
        postalCode: '100001'
      },
      phone: {
        primary: '+234 800 000 0000',
        secondary: '+234 800 000 0001',
        whatsapp: '+234 800 000 0000'
      },
      email: {
        general: 'info@javelinsecurity.com',
        support: 'support@javelinsecurity.com',
        careers: 'careers@javelinsecurity.com'
      },
      businessHours: {
        weekdays: 'Mon - Fri: 8:00 AM - 6:00 PM',
        saturday: 'Sat: 9:00 AM - 2:00 PM',
        sunday: 'Sun: Closed (Emergency calls accepted)'
      },
      socialLinks: {
        facebook: 'https://facebook.com/javelinsecurity',
        twitter: 'https://twitter.com/javelinsecurity',
        linkedin: 'https://linkedin.com/company/javelinsecurity',
        instagram: 'https://instagram.com/javelinsecurity'
      }
    });
    console.log('Contact info created');
  } catch (error) {
    console.error('Error seeding contact info:', error);
  }
};

// Run seeder
const runSeeder = async () => {
  await connectDB();
  
  console.log('\n--- Starting Database Seeder ---\n');
  
  await seedAdmin();
  await seedTeamMembers();
  await seedSites();
  await seedGalleryItems();
  await seedContactInfo();
  
  console.log('\n--- Seeding Complete ---\n');
  console.log('Admin credentials:');
  console.log('Email: admin@javelin.com');
  console.log('Password: admin123');
  console.log('\n⚠️  Please change the admin password after first login!\n');
  
  process.exit(0);
};

runSeeder();
