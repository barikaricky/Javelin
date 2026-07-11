/**
 * Netlify Functions - Express API wrapper
 * Backend-only deployment: all /api/* routes are served here
 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
const path = require('path');
const connectDB = require('../../config/database');
const errorHandler = require('../../middleware/errorHandler');

// Initialize DB connection once
connectDB();

const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    'https://www.javelinassociates.org',
    'https://javelinassociates.org',
    'https://javelinassocaites.netlify.app',
    'http://localhost:3000',
    'http://localhost:5000'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests explicitly
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static uploads
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running on Netlify' });
});

// Routes
app.use('/api/auth', require('../../routes/authRoutes'));
app.use('/api/team', require('../../routes/teamRoutes'));
app.use('/api/sites', require('../../routes/sitesRoutes'));
app.use('/api/gallery', require('../../routes/galleryRoutes'));
app.use('/api/news', require('../../routes/newsRoutes'));
app.use('/api/contact', require('../../routes/newContactRoutes'));
app.use('/api/applications', require('../../routes/applicationRoutes'));
app.use('/api/services', require('../../routes/serviceRoutes'));
app.use('/api/appointments', require('../../routes/appointmentRoutes'));

// Error handler
app.use(errorHandler);

const serverlessHandler = serverless(app);
const defaultOrigin = corsOptions.origin[0];

module.exports.handler = async (event, context) => {
  const headers = event.headers || {};
  const requestOrigin = headers.origin || headers.Origin;
  const normalizedOrigin = requestOrigin || defaultOrigin;

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': normalizedOrigin,
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
        'Vary': 'Origin'
      },
      body: ''
    };
  }

  const response = await serverlessHandler(event, context);
  const responseHeaders = response.headers ? { ...response.headers } : {};

  responseHeaders['Access-Control-Allow-Origin'] = normalizedOrigin;
  responseHeaders['Access-Control-Allow-Credentials'] = 'true';
  responseHeaders['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
  responseHeaders['Access-Control-Allow-Methods'] = 'GET,POST,PUT,DELETE,OPTIONS';
  responseHeaders['Vary'] = 'Origin';

  response.headers = responseHeaders;

  if (response.multiValueHeaders) {
    response.multiValueHeaders['Access-Control-Allow-Origin'] = [normalizedOrigin];
  }

  return response;
};
