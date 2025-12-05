const Application = require('../models/Application');
const nodemailer = require('nodemailer');

// Email transporter configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Send application confirmation email
const sendConfirmationEmail = async (application) => {
  try {
    const transporter = createTransporter();
    
    await transporter.sendMail({
      from: `"Javelin Associates" <${process.env.EMAIL_USER || 'noreply@javelinassociates.com'}>`,
      to: application.personalDetails.email,
      subject: `Application Received - ${application.applicationNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #003366, #0055a4); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">Javelin Associates</h1>
          </div>
          <div style="padding: 30px; background: #f8f9fa;">
            <h2 style="color: #003366;">Application Received!</h2>
            <p>Dear ${application.personalDetails.fullName},</p>
            <p>Thank you for applying for the <strong>${application.personalDetails.position}</strong> position at Javelin Associates.</p>
            <p>Your application has been received and is currently being reviewed by our HR team.</p>
            <div style="background: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0;"><strong>Application Number:</strong> ${application.applicationNumber}</p>
              <p style="margin: 10px 0 0;"><strong>Status:</strong> Under Review</p>
            </div>
            <p>We will contact you within 3-5 business days regarding the next steps.</p>
            <p>Best regards,<br>Javelin Associates HR Team</p>
          </div>
          <div style="background: #003366; padding: 15px; text-align: center; color: white; font-size: 12px;">
            <p style="margin: 0;">© ${new Date().getFullYear()} Javelin Associates. All rights reserved.</p>
          </div>
        </div>
      `
    });
    
    console.log('Confirmation email sent to:', application.personalDetails.email);
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
};

// @desc    Create new application
// @route   POST /api/applications
// @access  Public
exports.createApplication = async (req, res) => {
  try {
    const {
      fullName, email, phone, alternatePhone, dateOfBirth, gender,
      maritalStatus, nationality, stateOfOrigin, lga, address,
      position, experience, education, skills,
      guarantor1_name, guarantor1_phone, guarantor1_email, guarantor1_relationship,
      guarantor1_occupation, guarantor1_address,
      guarantor2_name, guarantor2_phone, guarantor2_email, guarantor2_relationship,
      guarantor2_occupation, guarantor2_address
    } = req.body;

    // Get uploaded files
    const files = req.files || {};

    // Build personal details
    const personalDetails = {
      fullName,
      email,
      phone,
      alternatePhone: alternatePhone || '',
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
      gender: gender || '',
      maritalStatus: maritalStatus || '',
      nationality: nationality || 'Nigerian',
      stateOfOrigin: stateOfOrigin || '',
      lga: lga || '',
      address: address || '',
      position,
      experience: experience || '',
      education: education || '',
      skills: skills || ''
    };

    // Build guarantors array
    const guarantors = [
      {
        name: guarantor1_name,
        phone: guarantor1_phone,
        email: guarantor1_email,
        relationship: guarantor1_relationship,
        occupation: guarantor1_occupation || '',
        address: guarantor1_address || '',
        passportPhoto: files.guarantor1PassportPhoto?.[0]?.path || ''
      },
      {
        name: guarantor2_name,
        phone: guarantor2_phone,
        email: guarantor2_email,
        relationship: guarantor2_relationship,
        occupation: guarantor2_occupation || '',
        address: guarantor2_address || '',
        passportPhoto: files.guarantor2PassportPhoto?.[0]?.path || ''
      }
    ];

    // Build documents
    const guarantorIds = [];
    if (files.guarantor1IdFront?.[0]?.path) guarantorIds.push(files.guarantor1IdFront[0].path);
    if (files.guarantor1IdBack?.[0]?.path) guarantorIds.push(files.guarantor1IdBack[0].path);
    if (files.guarantor2IdFront?.[0]?.path) guarantorIds.push(files.guarantor2IdFront[0].path);
    if (files.guarantor2IdBack?.[0]?.path) guarantorIds.push(files.guarantor2IdBack[0].path);

    const documents = {
      cv: files.cv?.[0]?.path || '',
      passport: files.passport?.[0]?.path || '',
      certificate: files.certificate?.[0]?.path || '',
      guarantorIds
    };

    // Create application
    const application = await Application.create({
      personalDetails,
      guarantors,
      documents,
      status: 'pending'
    });

    // Send confirmation email (async, don't wait)
    sendConfirmationEmail(application).catch(console.error);

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully! We will review and contact you soon.',
      data: {
        applicationNumber: application.applicationNumber,
        id: application._id
      }
    });
  } catch (error) {
    console.error('Create application error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to submit application. Please try again.'
    });
  }
};

// @desc    Get all applications
// @route   GET /api/applications
// @access  Private (Head Poster)
exports.getApplications = async (req, res) => {
  try {
    const { status, search, page = 1, limit = 10 } = req.query;

    const query = {};

    // Filter by status
    if (status && status !== 'all') {
      query.status = status;
    }

    // Search by name or email
    if (search) {
      query.$or = [
        { 'personalDetails.fullName': { $regex: search, $options: 'i' } },
        { 'personalDetails.email': { $regex: search, $options: 'i' } },
        { applicationNumber: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const applications = await Application.find(query)
      .select('personalDetails.fullName personalDetails.email personalDetails.position status createdAt applicationNumber')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Application.countDocuments(query);
    const totalPages = Math.ceil(total / parseInt(limit));

    res.json({
      success: true,
      data: applications,
      total,
      totalPages,
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch applications'
    });
  }
};

// @desc    Get single application
// @route   GET /api/applications/:id
// @access  Private (Head Poster)
exports.getApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate('reviewedBy', 'name email')
      .populate('emailHistory.sentBy', 'name email');

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    res.json({
      success: true,
      data: application
    });
  } catch (error) {
    console.error('Get application error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch application'
    });
  }
};

// @desc    Update application status
// @route   PUT /api/applications/:id/status
// @access  Private (Head Poster)
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status, notes } = req.body;

    const validStatuses = ['pending', 'reviewing', 'shortlisted', 'interview', 'accepted', 'rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    application.status = status;
    if (notes) {
      application.adminNotes = notes;
    }
    application.reviewedBy = req.user._id;
    application.reviewedAt = new Date();

    await application.save();

    res.json({
      success: true,
      message: 'Application status updated successfully',
      data: application
    });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update status'
    });
  }
};

// @desc    Reply to applicant via email
// @route   POST /api/applications/:id/reply
// @access  Private (Head Poster)
exports.replyToApplicant = async (req, res) => {
  try {
    const { subject, message } = req.body;

    if (!subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Subject and message are required'
      });
    }

    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    // Send email
    const transporter = createTransporter();

    await transporter.sendMail({
      from: `"Javelin Associates HR" <${process.env.EMAIL_USER || 'hr@javelinassociates.com'}>`,
      to: application.personalDetails.email,
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #003366, #0055a4); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">Javelin Associates</h1>
          </div>
          <div style="padding: 30px; background: #f8f9fa;">
            <p>Dear ${application.personalDetails.fullName},</p>
            <div style="white-space: pre-wrap; line-height: 1.6;">${message}</div>
          </div>
          <div style="background: #003366; padding: 15px; text-align: center; color: white; font-size: 12px;">
            <p style="margin: 0;">Application Reference: ${application.applicationNumber}</p>
            <p style="margin: 5px 0 0;">© ${new Date().getFullYear()} Javelin Associates. All rights reserved.</p>
          </div>
        </div>
      `
    });

    // Save email to history
    application.emailHistory.push({
      subject,
      message,
      sentBy: req.user._id,
      sentAt: new Date()
    });

    await application.save();

    res.json({
      success: true,
      message: 'Email sent successfully'
    });
  } catch (error) {
    console.error('Reply to applicant error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email. Please check email configuration.'
    });
  }
};

// @desc    Delete application
// @route   DELETE /api/applications/:id
// @access  Private (Head Poster)
exports.deleteApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    res.json({
      success: true,
      message: 'Application deleted successfully'
    });
  } catch (error) {
    console.error('Delete application error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete application'
    });
  }
};

// @desc    Get application statistics
// @route   GET /api/applications/stats/overview
// @access  Private (Head Poster)
exports.getApplicationStats = async (req, res) => {
  try {
    const stats = await Application.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const total = await Application.countDocuments();
    const recent = await Application.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    });

    const byStatus = {
      pending: 0,
      reviewing: 0,
      shortlisted: 0,
      interview: 0,
      accepted: 0,
      rejected: 0
    };

    stats.forEach(s => {
      if (byStatus.hasOwnProperty(s._id)) {
        byStatus[s._id] = s.count;
      }
    });

    res.json({
      success: true,
      data: {
        total,
        recent,
        byStatus
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics'
    });
  }
};
