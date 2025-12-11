/**
 * Netlify Functions - Express API wrapper
 * Backend-only deployment: all /api/* routes are served here
 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
const path = require('path');
const connectDB = require('../config/database');
const errorHandler = require('../middleware/errorHandler');

// Initialize DB connection once
connectDB();

const app = express();

// CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      'https://javelinassociates.org',
      'https://www.javelinassociates.org',
      'http://localhost:3000',
      'http://localhost:5000',
      process.env.CLIENT_URL || 'https://javelinassociates.org'
    ].filter(Boolean);

    // Always allow - in production CORS errors won't block requests in Netlify
    callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running on Netlify' });
});

// Routes
app.use('/api/auth', require('../routes/authRoutes'));
app.use('/api/team', require('../routes/teamRoutes'));
app.use('/api/sites', require('../routes/sitesRoutes'));
app.use('/api/gallery', require('../routes/galleryRoutes'));
app.use('/api/news', require('../routes/newsRoutes'));
app.use('/api/contact', require('../routes/newContactRoutes'));
app.use('/api/applications', require('../routes/applicationRoutes'));
app.use('/api/services', require('../routes/serviceRoutes'));
app.use('/api/appointments', require('../routes/appointmentRoutes'));

// Error handler
app.use(errorHandler);

module.exports.handler = serverless(app);
