const mongoose = require('mongoose');

const bonusBenefitSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  type: {
    type: String,
    enum: ['bonus', 'benefit', 'discount', 'offer'],
    required: true
  },
  value: {
    type: String,
    default: ''
  },
  targetAudience: {
    type: String,
    enum: ['clients', 'employees', 'all'],
    default: 'clients'
  },
  validFrom: {
    type: Date,
    default: Date.now
  },
  validUntil: {
    type: Date
  },
  isActive: {
    type: Boolean,
    default: true
  },
  terms: {
    type: String,
    default: ''
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('BonusBenefit', bonusBenefitSchema);
