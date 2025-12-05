require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Models
const User = require('../models/User');
const Activity = require('../models/Activity');
const BonusBenefit = require('../models/BonusBenefit');
const TeamMember = require('../models/TeamMember');
const Guard = require('../models/Guard');
const GalleryImage = require('../models/GalleryImage');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/javelin-security';

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Activity.deleteMany({});
    await BonusBenefit.deleteMany({});
    await TeamMember.deleteMany({});
    await Guard.deleteMany({});
    await GalleryImage.deleteMany({});

    // Create Head Poster user
    console.log('👤 Creating Head Poster user...');
    const headPoster = await User.create({
      name: 'Head Poster Admin',
      email: 'admin@javelin.com',
      password: 'admin123',
      role: 'head_poster',
      isActive: true
    });
    console.log(`   ✅ Created: ${headPoster.email} (password: admin123)`);

    // Create sample activities
    console.log('📢 Creating sample activities...');
    const activities = await Activity.insertMany([
      {
        title: 'Javelin Associates Expands to Abuja',
        description: 'We are excited to announce the opening of our new branch in Abuja, expanding our security services to the Federal Capital Territory.',
        type: 'news',
        priority: 'high',
        isPublished: true,
        postedBy: headPoster._id
      },
      {
        title: 'Annual Security Training Program',
        description: 'All security personnel will undergo comprehensive training including first aid, fire safety, and customer service skills.',
        type: 'event',
        priority: 'medium',
        isPublished: true,
        postedBy: headPoster._id
      },
      {
        title: 'Javelin Wins Best Security Company Award',
        description: 'Javelin Associates has been recognized as the Best Security Services Provider in Rivers State for 2024.',
        type: 'achievement',
        priority: 'high',
        isPublished: true,
        postedBy: headPoster._id
      }
    ]);
    console.log(`   ✅ Created ${activities.length} activities`);

    // Create sample bonuses/benefits
    console.log('🎁 Creating sample bonuses and benefits...');
    const bonuses = await BonusBenefit.insertMany([
      {
        title: 'New Client Discount',
        description: 'Get 15% off your first month of security services when you sign a 6-month contract.',
        type: 'discount',
        value: '15%',
        targetAudience: 'clients',
        isActive: true,
        terms: 'Valid for new clients only. Minimum 6-month contract required.',
        postedBy: headPoster._id
      },
      {
        title: 'Employee Health Insurance',
        description: 'Comprehensive health insurance coverage for all full-time security personnel and their immediate family.',
        type: 'benefit',
        targetAudience: 'employees',
        isActive: true,
        postedBy: headPoster._id
      },
      {
        title: 'Referral Bonus Program',
        description: 'Earn ₦20,000 for every new client you refer that signs a contract with us.',
        type: 'bonus',
        value: '₦20,000',
        targetAudience: 'all',
        isActive: true,
        postedBy: headPoster._id
      }
    ]);
    console.log(`   ✅ Created ${bonuses.length} bonuses/benefits`);

    // Create sample team members
    console.log('👥 Creating sample team members...');
    const team = await TeamMember.insertMany([
      {
        name: 'Chief Adebayo Williams',
        position: 'Chief Executive Officer',
        department: 'leadership',
        bio: 'Over 20 years of experience in security management and strategic operations.',
        isActive: true,
        displayOrder: 1,
        social: {
          linkedin: 'https://linkedin.com',
          twitter: 'https://twitter.com'
        },
        postedBy: headPoster._id
      },
      {
        name: 'Mrs. Chidinma Okonkwo',
        position: 'Managing Director',
        department: 'leadership',
        bio: 'Expert in corporate security solutions with 15+ years industry experience.',
        isActive: true,
        displayOrder: 2,
        social: {
          linkedin: 'https://linkedin.com'
        },
        postedBy: headPoster._id
      },
      {
        name: 'Mr. Yusuf Mohammed',
        position: 'Operations Manager',
        department: 'operations',
        bio: 'Military veteran specializing in tactical operations and security protocols.',
        isActive: true,
        displayOrder: 3,
        postedBy: headPoster._id
      },
      {
        name: 'Miss Blessing Eze',
        position: 'HR Manager',
        department: 'hr',
        bio: 'Human resources specialist focused on recruitment and staff development.',
        isActive: true,
        displayOrder: 4,
        postedBy: headPoster._id
      }
    ]);
    console.log(`   ✅ Created ${team.length} team members`);

    // Create sample guards
    console.log('🛡️  Creating sample guards...');
    const guards = await Guard.insertMany([
      {
        name: 'Sergeant Emeka Nwosu',
        guardId: 'JVL-001',
        rank: 'sergeant',
        status: 'available',
        specialization: ['corporate', 'vip'],
        experience: 8,
        rating: 4.8,
        certifications: ['First Aid', 'Fire Safety', 'Armed Security'],
        bio: 'Experienced sergeant with expertise in corporate and VIP protection.',
        isReadyForDeployment: true,
        postedBy: headPoster._id
      },
      {
        name: 'Officer Fatima Bello',
        guardId: 'JVL-002',
        rank: 'senior_officer',
        status: 'available',
        specialization: ['residential', 'event'],
        experience: 5,
        rating: 4.5,
        certifications: ['First Aid', 'Crowd Control'],
        bio: 'Certified security trainer specializing in event security.',
        isReadyForDeployment: true,
        postedBy: headPoster._id
      },
      {
        name: 'Officer Ahmed Hassan',
        guardId: 'JVL-003',
        rank: 'officer',
        status: 'deployed',
        specialization: ['corporate'],
        experience: 3,
        rating: 4.2,
        certifications: ['First Aid'],
        bio: 'Reliable officer currently deployed at corporate site.',
        isReadyForDeployment: false,
        currentDeployment: {
          site: 'TechCorp HQ',
          startDate: new Date('2024-01-15')
        },
        postedBy: headPoster._id
      },
      {
        name: 'Officer Grace Okoro',
        guardId: 'JVL-004',
        rank: 'officer',
        status: 'available',
        specialization: ['residential', 'patrol'],
        experience: 2,
        rating: 4.0,
        certifications: ['First Aid', 'Fire Safety'],
        bio: 'Dedicated officer with strong communication skills.',
        isReadyForDeployment: true,
        postedBy: headPoster._id
      },
      {
        name: 'Officer Daniel Adekunle',
        guardId: 'JVL-005',
        rank: 'officer',
        status: 'training',
        specialization: ['event'],
        experience: 1,
        rating: 3.8,
        certifications: ['First Aid'],
        bio: 'New recruit currently undergoing advanced training.',
        isReadyForDeployment: false,
        postedBy: headPoster._id
      }
    ]);
    console.log(`   ✅ Created ${guards.length} guards`);

    // Create sample gallery images
    console.log('📸 Creating sample gallery images...');
    const gallery = await GalleryImage.insertMany([
      {
        title: 'Security Team Training',
        description: 'Our guards undergoing rigorous training program.',
        category: 'training',
        imageUrl: '/images/training-1.jpg',
        isPublished: true,
        displayOrder: 1,
        postedBy: headPoster._id
      },
      {
        title: 'Corporate Security Deployment',
        description: 'Professional guards at a corporate client site.',
        category: 'operations',
        imageUrl: '/images/corporate-1.jpg',
        isPublished: true,
        displayOrder: 2,
        postedBy: headPoster._id
      },
      {
        title: 'Event Security Coverage',
        description: 'Team providing security at a major event.',
        category: 'events',
        imageUrl: '/images/event-1.jpg',
        isPublished: true,
        displayOrder: 3,
        postedBy: headPoster._id
      }
    ]);
    console.log(`   ✅ Created ${gallery.length} gallery images`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📋 Login Credentials:');
    console.log('   Email: admin@javelin.com');
    console.log('   Password: admin123');
    console.log('\n🌐 Admin Dashboard: http://localhost:3000/admin/login');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
