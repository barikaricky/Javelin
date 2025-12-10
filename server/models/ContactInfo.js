const mongoose = require('mongoose');

// Singleton pattern - only one contact info document
const contactInfoSchema = new mongoose.Schema({
  companyName: {
    type: String,
    default: 'Javelin Security'
  },
  address: {
    street: { type: String, default: '' },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    country: { type: String, default: '' },
    postalCode: { type: String, default: '' }
  },
  phone: {
    primary: { type: String, default: '' },
    secondary: { type: String, default: '' },
    whatsapp: { type: String, default: '' }
  },
  email: {
    general: { type: String, default: '' },
    support: { type: String, default: '' },
    careers: { type: String, default: '' }
  },
  businessHours: {
    weekdays: { type: String, default: 'Mon - Fri: 8:00 AM - 6:00 PM' },
    saturday: { type: String, default: 'Sat: 9:00 AM - 2:00 PM' },
    sunday: { type: String, default: 'Sun: Closed' }
  },
  socialLinks: {
    facebook: { type: String, default: '' },
    twitter: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    instagram: { type: String, default: '' },
    youtube: { type: String, default: '' }
  },
  googleMapsEmbed: {
    type: String,
    default: ''
  },
  coordinates: {
    lat: { type: Number },
    lng: { type: Number }
  }
}, {
  timestamps: true
});

// Static method to get or create single instance
contactInfoSchema.statics.getContactInfo = async function() {
  let contactInfo = await this.findOne();
  if (!contactInfo) {
    contactInfo = await this.create({});
  }
  return contactInfo;
};

module.exports = mongoose.model('ContactInfo', contactInfoSchema);
