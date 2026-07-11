/**
 * Netlify Functions - Proxy for Express API
 * This function routes all /api/* requests to the backend
 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
const path = require('path');
const connectDB = require('../../server/config/database');
const errorHandler = require('../../server/middleware/errorHandler');

const app = express();

// Middleware - CORS Configuration
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'https://javelinassociates.org',
      'https://www.javelinassociates.org',
      'http://localhost:3000',
      'http://localhost:5000',
      process.env.CLIENT_URL || 'https://javelinassociates.org'
    ].filter(Boolean);
    
    if (allowedOrigins.indexOf(origin) !== -1 || origin.includes('devtunnels.ms')) {
      callback(null, true);
    } else {
      callback(null, true); // Allow for development
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files from server directory
app.use('/uploads', express.static(path.join(__dirname, '../../server/uploads')));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running on Netlify' });
});

// Routes - Import from server
app.use('/api/auth', require('../../server/routes/authRoutes'));
app.use('/api/team', require('../../server/routes/teamRoutes'));
app.use('/api/sites', require('../../server/routes/sitesRoutes'));
app.use('/api/gallery', require('../../server/routes/galleryRoutes'));
app.use('/api/news', require('../../server/routes/newsRoutes'));
app.use('/api/contact', require('../../server/routes/newContactRoutes'));
app.use('/api/applications', require('../../server/routes/applicationRoutes'));
app.use('/api/services', require('../../server/routes/serviceRoutes'));
app.use('/api/appointments', require('../../server/routes/appointmentRoutes'));

// Error Handler
app.use(errorHandler);

// Export as serverless function
module.exports.handler = serverless(app);
