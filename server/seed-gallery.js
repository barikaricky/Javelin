require('dotenv').config();
const mongoose = require('mongoose');
const GalleryItem = require('./models/GalleryItem');
const connectDB = require('./config/database');

// Gallery images with descriptions based on the provided images
const galleryImages = [
  // Team photos
  {
    title: 'Leadership Team - CEO',
    description: 'Our dedicated CEO leading Javelin Associates with vision and integrity',
    category: 'team',
    image: '/images/md_image.jpg',
    order: 1,
    isActive: true
  },
  {
    title: 'Executive Team Member',
    description: 'Senior executive member of Javelin Associates management team',
    category: 'team',
    image: '/images/javelin-logo.png',
    order: 2,
    isActive: true
  },
  
  // Security operations
  {
    title: 'Construction Site Security Briefing',
    description: 'Security personnel receiving operational briefing at construction site deployment',
    category: 'work-in-action',
    image: '/images/javelin-logo-1.jpg',
    order: 3,
    isActive: true
  },
  {
    title: 'Security Team Lineup',
    description: 'Professional security guards lined up for duty at operational site',
    category: 'work-in-action',
    image: '/images/javelin-site-2.jpg',
    order: 4,
    isActive: true
  },
  {
    title: 'Waterfront Security Patrol',
    description: 'Marine security team conducting waterfront patrol operations with life vests',
    category: 'work-in-action',
    image: '/images/javelin-site-3.jpg',
    order: 5,
    isActive: true
  },
  {
    title: 'Elite Security Guards',
    description: 'Well-trained security personnel ready for deployment',
    category: 'work-in-action',
    image: '/images/javelin-guard-4.jpg',
    order: 6,
    isActive: true
  },
  {
    title: 'Construction Site Security',
    description: 'Security team conducting site security operations at construction zone',
    category: 'work-in-action',
    image: '/images/javelin-logo-2.jpg',
    order: 7,
    isActive: true
  },
  {
    title: 'Industrial Site Security',
    description: 'Guards maintaining security at industrial facility',
    category: 'work-in-action',
    image: '/images/javelin-site-5.jpg',
    order: 8,
    isActive: true
  },
  {
    title: 'Site Security Operations',
    description: 'Professional guards overseeing site security operations',
    category: 'work-in-action',
    image: '/images/site1.jpg',
    order: 9,
    isActive: true
  },
  {
    title: 'Facility Protection',
    description: 'Security team protecting commercial facility',
    category: 'work-in-action',
    image: '/images/site2.jpg',
    order: 10,
    isActive: true
  },
  {
    title: 'Residential Security',
    description: 'Guards providing residential area security services',
    category: 'work-in-action',
    image: '/images/site3.jpg',
    order: 11,
    isActive: true
  },
  
  // Training and events
  {
    title: 'Security Training Session',
    description: 'Comprehensive security training and briefing session for our personnel',
    category: 'events',
    image: '/images/javelin-logo-1.jpg',
    order: 12,
    isActive: true
  },
  {
    title: 'Operational Briefing',
    description: 'Team briefing session for enhanced operational coordination',
    category: 'events',
    image: '/images/javelin-site-2.jpg',
    order: 13,
    isActive: true
  },
  {
    title: 'Fire Safety Training',
    description: 'Personnel undergoing fire safety and emergency response training',
    category: 'events',
    image: '/images/javelin-site-3.jpg',
    order: 14,
    isActive: true
  },
  {
    title: 'First Aid Training',
    description: 'Security team members learning critical first aid and CPR techniques',
    category: 'events',
    image: '/images/javelin-guard-4.jpg',
    order: 15,
    isActive: true
  },
  {
    title: 'Safety Equipment Training',
    description: 'Training session on proper use of safety equipment and gear',
    category: 'events',
    image: '/images/javelin-logo-2.jpg',
    order: 16,
    isActive: true
  },
  
  // K-9 Unit
  {
    title: 'K-9 Security Unit',
    description: 'Professional K-9 handler with trained security dog on patrol',
    category: 'work-in-action',
    image: '/images/javelin-site-5.jpg',
    order: 17,
    isActive: true
  },
  {
    title: 'Canine Security Patrol',
    description: 'Elite K-9 unit conducting security patrol operations',
    category: 'work-in-action',
    image: '/images/site1.jpg',
    order: 18,
    isActive: true
  },
  
  // Facilities
  {
    title: 'Javelin Headquarters',
    description: 'Modern headquarters facility of Javelin Associates Limited',
    category: 'facilities',
    image: '/images/site2.jpg',
    order: 19,
    isActive: true
  },
  {
    title: 'Security Operations Center',
    description: 'State-of-the-art operations center for monitoring and coordination',
    category: 'facilities',
    image: '/images/site3.jpg',
    order: 20,
    isActive: true
  }
];

const seedGallery = async () => {
  try {
    await connectDB();
    
    console.log('Connected to database...');
    console.log('Clearing existing gallery items...');
    
    // Clear existing gallery items
    await GalleryItem.deleteMany({});
    
    console.log('Adding new gallery items...');
    
    // Insert new gallery items
    const items = await GalleryItem.insertMany(galleryImages);
    
    console.log(`✅ Successfully added ${items.length} gallery items`);
    console.log('\nGallery items:');
    items.forEach((item, index) => {
      console.log(`${index + 1}. ${item.title} (${item.category})`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding gallery:', error);
    process.exit(1);
  }
};

// Run the seed function
seedGallery();
