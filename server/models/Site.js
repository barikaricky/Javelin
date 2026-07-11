const mongoose = require('mongoose');

const siteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Site name is required'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  image: {
    type: String,
    default: () => process.env.DEFAULT_SITE_IMAGE || '/assets/images/placeholders/security-placeholder.jpg'
  },
  imagePublicId: {
    type: String // Cloudinary public ID for deletion
  },
  services: [{
    type: String,
    trim: true
  }],
  coordinates: {
    lat: { type: Number },
    lng: { type: Number }
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for ordering
siteSchema.index({ order: 1 });

module.exports = mongoose.model('Site', siteSchema);
