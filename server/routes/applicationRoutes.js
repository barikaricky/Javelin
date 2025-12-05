const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const applicationController = require('../controllers/applicationController');
const { protect, headPosterOnly } = require('../middleware/auth');

// Ensure uploads directory exists
const uploadsDir = 'uploads/applications';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  // Allow images for passport photos
  const imageTypes = /jpeg|jpg|png|webp/;
  // Allow documents for CV, certificates, IDs
  const docTypes = /pdf|doc|docx/;
  
  const ext = path.extname(file.originalname).toLowerCase().slice(1);
  const mimetype = file.mimetype;
  
  // Check if it's an image field
  if (file.fieldname.includes('passport') || file.fieldname.includes('Photo')) {
    if (imageTypes.test(ext) || mimetype.startsWith('image/')) {
      return cb(null, true);
    }
    return cb(new Error('Passport photos must be JPEG, PNG, or WebP images.'));
  }
  
  // Check if it's a document field
  if (imageTypes.test(ext) || docTypes.test(ext) || mimetype.startsWith('image/') || mimetype.includes('pdf') || mimetype.includes('document')) {
    return cb(null, true);
  }
  
  cb(new Error('Invalid file type. Allowed: JPEG, PNG, WebP, PDF, DOC, DOCX'));
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max per file
  fileFilter: fileFilter
});

// Define upload fields for application with 2 guarantors
const applicationUpload = upload.fields([
  // Applicant documents
  { name: 'cv', maxCount: 1 },
  { name: 'passport', maxCount: 1 },
  { name: 'certificate', maxCount: 1 },
  // Guarantor 1 documents
  { name: 'guarantor1PassportPhoto', maxCount: 1 },
  { name: 'guarantor1IdFront', maxCount: 1 },
  { name: 'guarantor1IdBack', maxCount: 1 },
  // Guarantor 2 documents
  { name: 'guarantor2PassportPhoto', maxCount: 1 },
  { name: 'guarantor2IdFront', maxCount: 1 },
  { name: 'guarantor2IdBack', maxCount: 1 }
]);

// ===================
// PUBLIC ROUTES
// ===================

// Submit a new application (public)
router.post('/', applicationUpload, applicationController.createApplication);

// ===================
// PROTECTED ADMIN ROUTES
// ===================

// IMPORTANT: Stats route must come BEFORE /:id route to prevent "stats" being interpreted as an ID
// Get application statistics (admin only)
router.get('/stats/overview', protect, headPosterOnly, applicationController.getApplicationStats);

// Get all applications with filtering and pagination (admin only)
router.get('/', protect, headPosterOnly, applicationController.getApplications);

// Get single application by ID (admin only)
router.get('/:id', protect, headPosterOnly, applicationController.getApplication);

// Update application status (admin only)
router.put('/:id/status', protect, headPosterOnly, applicationController.updateApplicationStatus);

// Reply to applicant via email (admin only)
router.post('/:id/reply', protect, headPosterOnly, applicationController.replyToApplicant);

// Delete application (admin only)
router.delete('/:id', protect, headPosterOnly, applicationController.deleteApplication);

module.exports = router;
