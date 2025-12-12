require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware - CORS Configuration
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, postman)
    if (!origin) return callback(null, true);
    
    // List of allowed origins
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:5000',
      'https://v9hw7bw6-3000.uks1.devtunnels.ms',
      'javelinassociates.netlify.app',
      'https://javelinassociates.org',
      process.env.CLIENT_URL
    ].filter(Boolean);
    
    // Check if origin is allowed or use wildcard for dev tunnels
    if (allowedOrigins.indexOf(origin) !== -1 || origin.includes('devtunnels.ms')) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all origins in development
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/team', require('./routes/teamRoutes'));
app.use('/api/sites', require('./routes/sitesRoutes'));
app.use('/api/gallery', require('./routes/galleryRoutes'));
app.use('/api/news', require('./routes/newsRoutes'));
app.use('/api/contact', require('./routes/newContactRoutes'));
app.use('/api/applications', require('./routes/applicationRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Start server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log('Server running on port', PORT);
  });
};

startServer();
