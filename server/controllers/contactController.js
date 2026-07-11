const Contact = require('../models/Contact');
const ContactInfo = require('../models/ContactInfo');
const nodemailer = require('nodemailer');

// Create transporter for sending emails
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// @desc    Submit contact form (public)
// @route   POST /api/contact
// @access  Public
const submitContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, subject, and message'
      });
    }
    
    // Save to database
    const contact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message
    });
    
    // Send notification email to admin
    try {
      if (process.env.EMAIL_USER && process.env.ADMIN_EMAIL) {
        const transporter = createTransporter();
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.ADMIN_EMAIL,
          subject: `New Contact Form Submission: ${subject}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          `
        });
      }
    } catch (emailError) {
      console.error('Failed to send notification email:', emailError);
      // Don't fail the request if email fails
    }
    
    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully. We will get back to you soon.',
      data: { id: contact._id }
    });
  } catch (error) {
    console.error('Submit contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get all contact messages (admin)
// @route   GET /api/contact/admin
// @access  Private/Admin
const getContacts = async (req, res) => {
  try {
    const { status, page, limit } = req.query;
    const filter = {};
    
    if (status) filter.status = status;
    
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 20;
    const skip = (pageNum - 1) * limitNum;
    
    const total = await Contact.countDocuments(filter);
    const contacts = await Contact.find(filter)
      .populate('repliedBy', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);
    
    res.json({
      success: true,
      count: contacts.length,
      total,
      pages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      data: contacts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get single contact message
// @route   GET /api/contact/:id
// @access  Private/Admin
const getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)
      .populate('repliedBy', 'name');
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }
    
    // Mark as read if new
    if (contact.status === 'new') {
      contact.status = 'read';
      await contact.save();
    }
    
    res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update contact status/notes
// @route   PUT /api/contact/:id
// @access  Private/Admin
const updateContact = async (req, res) => {
  try {
    const { status, notes } = req.body;
    
    let contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }
    
    if (status) contact.status = status;
    if (notes !== undefined) contact.notes = notes;
    
    if (status === 'replied') {
      contact.repliedAt = new Date();
      contact.repliedBy = req.user._id;
    }
    
    await contact.save();
    
    res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Delete contact message
// @route   DELETE /api/contact/:id
// @access  Private/Admin
const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }
    
    await contact.deleteOne();
    
    res.json({
      success: true,
      message: 'Contact message deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get contact info (public)
// @route   GET /api/contact/info
// @access  Public
const getContactInfo = async (req, res) => {
  try {
    const contactInfo = await ContactInfo.getContactInfo();
    
    res.json({
      success: true,
      data: contactInfo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update contact info
// @route   PUT /api/contact/info
// @access  Private/Admin
const updateContactInfo = async (req, res) => {
  try {
    let contactInfo = await ContactInfo.findOne();
    
    if (!contactInfo) {
      contactInfo = await ContactInfo.create(req.body);
    } else {
      // Deep merge for nested objects
      const updateFields = req.body;
      
      if (updateFields.address) {
        contactInfo.address = { ...contactInfo.address.toObject(), ...updateFields.address };
      }
      if (updateFields.phone) {
        contactInfo.phone = { ...contactInfo.phone.toObject(), ...updateFields.phone };
      }
      if (updateFields.email) {
        contactInfo.email = { ...contactInfo.email.toObject(), ...updateFields.email };
      }
      if (updateFields.businessHours) {
        contactInfo.businessHours = { ...contactInfo.businessHours.toObject(), ...updateFields.businessHours };
      }
      if (updateFields.socialLinks) {
        contactInfo.socialLinks = { ...contactInfo.socialLinks.toObject(), ...updateFields.socialLinks };
      }
      if (updateFields.companyName) contactInfo.companyName = updateFields.companyName;
      if (updateFields.googleMapsEmbed) contactInfo.googleMapsEmbed = updateFields.googleMapsEmbed;
      if (updateFields.coordinates) contactInfo.coordinates = updateFields.coordinates;
      
      await contactInfo.save();
    }
    
    res.json({
      success: true,
      data: contactInfo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get contact stats
// @route   GET /api/contact/stats
// @access  Private/Admin
const getContactStats = async (req, res) => {
  try {
    const stats = await Contact.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    
    const totalMessages = await Contact.countDocuments();
    const unreadCount = await Contact.countDocuments({ status: 'new' });
    
    res.json({
      success: true,
      data: {
        total: totalMessages,
        unread: unreadCount,
        byStatus: stats.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {})
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

module.exports = {
  submitContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact,
  getContactInfo,
  updateContactInfo,
  getContactStats
};
