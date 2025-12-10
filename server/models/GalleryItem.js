const mongoose = require('mongoose');

const galleryItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['work-in-action', 'events', 'team', 'facilities', 'other'],
    default: 'work-in-action'
  },
  image: {
    type: String,
    required: [true, 'Image is required']
  },
  imagePublicId: {
    type: String // Cloudinary public ID for deletion
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

// Index for ordering and category filtering
galleryItemSchema.index({ order: 1 });
galleryItemSchema.index({ category: 1 });

module.exports = mongoose.model('GalleryItem', galleryItemSchema);
