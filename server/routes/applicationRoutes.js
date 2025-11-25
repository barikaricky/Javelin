const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, PDF, DOC, DOCX allowed.'));
    }
  }
});

// Submit application
router.post('/',
  upload.fields([
    { name: 'passport', maxCount: 1 },
    { name: 'cv', maxCount: 1 },
    { name: 'idCard', maxCount: 1 }
  ]),
  [
    body('fullName').trim().notEmpty().withMessage('Full name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('phone').trim().notEmpty().withMessage('Phone number is required'),
    body('state').trim().notEmpty().withMessage('State is required'),
    body('age').isInt({ min: 18, max: 65 }).withMessage('Age must be between 18 and 65'),
    body('position').trim().notEmpty().withMessage('Position is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const applicationData = {
        ...req.body,
        passport: req.files?.passport?.[0]?.path,
        cv: req.files?.cv?.[0]?.path,
        idCard: req.files?.idCard?.[0]?.path,
        submittedAt: new Date()
      };

      // TODO: Save to database
      // TODO: Send email notification to HR
      
      console.log('Application received:', applicationData);

      res.json({
        success: true,
        message: 'Application submitted successfully! We will review and contact you soon.'
      });
    } catch (error) {
      console.error('Application submission error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to submit application. Please try again later.'
      });
    }
  }
);

// Get all applications (for admin)
router.get('/', (req, res) => {
  res.json({ message: 'Applications list endpoint' });
});

module.exports = router;
