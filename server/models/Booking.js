const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    unique: true,
    required: true
  },
  // Client Information
  clientName: {
    type: String,
    required: [true, 'Client name is required'],
    trim: true
  },
  clientEmail: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  clientPhone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  companyName: {
    type: String,
    trim: true
  },
  // Service Details
  serviceType: {
    type: String,
    required: [true, 'Service type is required'],
    enum: [
      'Corporate Security',
      'Residential Security',
      'Event Security',
      'VIP Protection',
      'Industrial Security',
      'Retail Security',
      'Consultation',
      'Other'
    ]
  },
  serviceDescription: {
    type: String,
    trim: true
  },
  // Meeting Details
  preferredDate: {
    type: Date,
    required: [true, 'Preferred meeting date is required']
  },
  preferredTime: {
    type: String,
    required: [true, 'Preferred meeting time is required']
  },
  meetingType: {
    type: String,
    enum: ['in-person', 'phone', 'video'],
    default: 'in-person'
  },
  location: {
    type: String,
    trim: true
  },
  additionalNotes: {
    type: String,
    trim: true
  },
  // Status
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled', 'rescheduled'],
    default: 'pending'
  },
  // Admin Response
  adminNotes: {
    type: String,
    trim: true
  },
  confirmedDate: {
    type: Date
  },
  confirmedTime: {
    type: String
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Generate booking ID before saving
bookingSchema.pre('save', async function(next) {
  if (!this.bookingId) {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    this.bookingId = `JVL-${year}${month}-${random}`;
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);
