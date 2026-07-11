const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: [true, 'Please provide client name'],
    trim: true
  },
  companyName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  phone: {
    type: String,
    required: [true, 'Please provide phone number']
  },
  meetingType: {
    type: String,
    required: [true, 'Please select meeting type'],
    enum: ['in-person', 'phone-call', 'video-call']
  },
  preferredDate: {
    type: Date,
    required: [true, 'Please provide preferred date']
  },
  preferredTime: {
    type: String,
    required: [true, 'Please provide preferred time']
  },
  alternateDate: {
    type: Date
  },
  alternateTime: {
    type: String
  },
  serviceInterest: {
    type: String,
    required: [true, 'Please specify service interest']
  },
  message: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
