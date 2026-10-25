const Appointment = require('../models/Appointment');
const nodemailer = require('nodemailer');

const escapeHtml = (value) => String(value || '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

const appointmentEmailFields = [
  ['Client name', 'clientName'],
  ['Company / organization', 'companyName'],
  ['Email address', 'email'],
  ['Phone number', 'phone'],
  ['Meeting type', 'meetingType'],
  ['Preferred date', 'preferredDate'],
  ['Preferred time', 'preferredTime'],
  ['Alternate date', 'alternateDate'],
  ['Alternate time', 'alternateTime'],
  ['Service interest', 'serviceInterest'],
  ['Additional message', 'message']
];

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Public
exports.createAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Quote notification email is not configured: EMAIL_USER and EMAIL_PASS are required');
      return res.status(503).json({
        success: false,
        message: 'Your request was saved, but email delivery is not configured. Please contact us directly.'
      });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: Number(process.env.EMAIL_PORT) === 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    const details = appointmentEmailFields.map(([label, key]) => {
      const value = appointment[key];
      const displayValue = value
        ? key.toLowerCase().includes('date') && value instanceof Date
          ? value.toLocaleDateString('en-NG', { dateStyle: 'long' })
          : value
        : 'Not provided';

      return { label, value: String(displayValue) };
    });
    const text = [
      'A new quote / consultation request has been submitted.',
      `Appointment ID: ${appointment._id}`,
      '',
      ...details.map(({ label, value }) => `${label}: ${value}`)
    ].join('\n');
    const html = `
      <h2>New Quote / Consultation Request</h2>
      <p><strong>Appointment ID:</strong> ${escapeHtml(appointment._id)}</p>
      <table style="border-collapse:collapse;width:100%">
        <tbody>
          ${details.map(({ label, value }) => `
            <tr>
              <th style="border:1px solid #ddd;padding:8px;text-align:left">${escapeHtml(label)}</th>
              <td style="border:1px solid #ddd;padding:8px;white-space:pre-wrap">${escapeHtml(value)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        to: process.env.QUOTE_EMAIL || 'info@javelin.org',
        replyTo: appointment.email,
        subject: 'New Javelin quote request',
        text,
        html
      });
    } catch (emailError) {
      console.error('Quote notification email failed:', emailError);
      return res.status(502).json({
        success: false,
        message: 'Your request was saved, but we could not deliver its email notification. Please contact us directly.'
      });
    }

    res.status(201).json({
      success: true,
      message: 'Your quote request has been sent successfully.',
      data: appointment
    });
  } catch (error) {
    console.error('Create appointment or send quote email failed:', error);
    res.status(400).json({
      success: false,
      message: 'Unable to complete your request. Please try again or contact us directly.'
    });
  }
};

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private/Admin
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single appointment
// @route   GET /api/appointments/:id
// @access  Private/Admin
exports.getAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update appointment
// @route   PUT /api/appointments/:id
// @access  Private/Admin
exports.updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete appointment
// @route   DELETE /api/appointments/:id
// @access  Private/Admin
exports.deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get appointment statistics
// @route   GET /api/appointments/stats
// @access  Private/Admin
exports.getAppointmentStats = async (req, res) => {
  try {
    const stats = await Appointment.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    
    const total = await Appointment.countDocuments();
    
    res.status(200).json({
      success: true,
      data: {
        total,
        byStatus: stats
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
