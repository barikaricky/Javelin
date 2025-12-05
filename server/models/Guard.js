const mongoose = require('mongoose');

const guardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Guard name is required'],
    trim: true
  },
  guardId: {
    type: String,
    required: [true, 'Guard ID is required'],
    unique: true
  },
  image: {
    type: String,
    default: ''
  },
  rank: {
    type: String,
    enum: ['officer', 'senior_officer', 'supervisor', 'sergeant', 'chief'],
    default: 'officer'
  },
  specialization: [{
    type: String,
    enum: ['residential', 'corporate', 'event', 'vip', 'patrol', 'armed', 'k9']
  }],
  experience: {
    type: Number,
    default: 0
  },
  certifications: [{
    type: String
  }],
  status: {
    type: String,
    enum: ['available', 'deployed', 'on_leave', 'training', 'inactive'],
    default: 'available'
  },
  currentDeployment: {
    site: { type: String, default: '' },
    startDate: { type: Date },
    endDate: { type: Date }
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  bio: {
    type: String,
    default: ''
  },
  isReadyForDeployment: {
    type: Boolean,
    default: true
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Guard', guardSchema);
