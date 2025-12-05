const mongoose = require('mongoose');

const guarantorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Guarantor name is required'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Guarantor phone is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Guarantor email is required'],
    trim: true,
    lowercase: true
  },
  relationship: {
    type: String,
    required: [true, 'Relationship to applicant is required'],
    trim: true
  },
  occupation: {
    type: String,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  passportPhoto: {
    type: String // Path to uploaded passport photo
  }
}, { _id: false });

const personalDetailsSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  alternatePhone: {
    type: String,
    trim: true
  },
  dateOfBirth: {
    type: Date
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other', ''],
    default: ''
  },
  maritalStatus: {
    type: String,
    enum: ['single', 'married', 'divorced', 'widowed', ''],
    default: ''
  },
  nationality: {
    type: String,
    default: 'Nigerian'
  },
  stateOfOrigin: {
    type: String,
    trim: true
  },
  lga: {
    type: String,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  position: {
    type: String,
    required: [true, 'Position is required'],
    trim: true
  },
  experience: {
    type: String,
    trim: true
  },
  education: {
    type: String,
    trim: true
  },
  skills: {
    type: String,
    trim: true
  }
}, { _id: false });

const documentsSchema = new mongoose.Schema({
  cv: {
    type: String // Path to uploaded CV
  },
  passport: {
    type: String // Path to uploaded passport photo
  },
  certificate: {
    type: String // Path to uploaded certificate
  },
  guarantorIds: [{
    type: String // Paths to uploaded guarantor IDs
  }]
}, { _id: false });

const applicationSchema = new mongoose.Schema({
  // Application Number (auto-generated)
  applicationNumber: {
    type: String,
    unique: true
  },

  // Personal Information
  personalDetails: personalDetailsSchema,

  // Guarantors (2 required)
  guarantors: {
    type: [guarantorSchema],
    validate: {
      validator: function(v) {
        return v.length >= 2;
      },
      message: 'At least 2 guarantors are required'
    }
  },

  // Documents
  documents: documentsSchema,

  // Application Status
  status: {
    type: String,
    enum: ['pending', 'reviewing', 'shortlisted', 'interview', 'accepted', 'rejected'],
    default: 'pending'
  },

  // Admin Notes
  adminNotes: {
    type: String,
    default: ''
  },

  // Email Communications History
  emailHistory: [{
    subject: String,
    message: String,
    sentBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    sentAt: {
      type: Date,
      default: Date.now
    }
  }],

  // Reviewed By
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reviewedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Generate application number before saving
applicationSchema.pre('save', async function(next) {
  if (!this.applicationNumber) {
    const year = new Date().getFullYear();
    const count = await mongoose.model('Application').countDocuments();
    this.applicationNumber = `JAV-${year}-${String(count + 1).padStart(5, '0')}`;
  }
  next();
});

// Index for searching
applicationSchema.index({ 'personalDetails.fullName': 'text', 'personalDetails.email': 'text' });
applicationSchema.index({ status: 1 });
applicationSchema.index({ createdAt: -1 });

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
