const fs = require('fs');
const path = require('path');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const uploadsDir = path.join(__dirname, '..', 'uploads');
const isServerlessEnv = process.env.NETLIFY === 'true' || !!process.env.AWS_LAMBDA_FUNCTION_NAME;

if (!process.env.CLOUDINARY_CLOUD_NAME && !isServerlessEnv) {
  try {
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
  } catch (error) {
    console.error('Unable to create uploads directory:', error.message);
  }
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Cloudinary storage configuration
const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'javelin-security',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    transformation: [{ width: 1200, height: 1200, crop: 'limit', quality: 'auto' }]
  }
});

// Local storage fallback
const localStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = file.originalname.split('.').pop();
    cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`);
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.'), false);
  }
};

// Choose storage based on environment
const storage = process.env.CLOUDINARY_CLOUD_NAME
  ? cloudinaryStorage
  : isServerlessEnv
    ? multer.memoryStorage()
    : localStorage;

// Multer upload middleware
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Helper function to delete image from Cloudinary
const deleteImage = async (publicId) => {
  if (publicId && process.env.CLOUDINARY_CLOUD_NAME) {
    try {
      await cloudinary.uploader.destroy(publicId);
      return true;
    } catch (error) {
      console.error('Error deleting image from Cloudinary:', error);
      return false;
    }
  }
  return false;
};

// Helper function to get image URL from upload result
const getImageUrl = (file) => {
  if (!file) return null;

  if (file.path) {
    // Cloudinary returns path with full URL
    return file.path;
  }

  if (file.buffer) {
    // Netlify/Serverless fallback: embed as Base64 data URL
    const base64 = file.buffer.toString('base64');
    return `data:${file.mimetype};base64,${base64}`;
  }

  if (file.filename) {
    // Local storage returns filename
    return `/uploads/${file.filename}`;
  }

  return null;
};

// Helper to get public ID from Cloudinary URL
const getPublicIdFromUrl = (url) => {
  if (!url || !url.includes('cloudinary')) return null;
  const parts = url.split('/');
  const filename = parts[parts.length - 1];
  const folder = parts[parts.length - 2];
  return `${folder}/${filename.split('.')[0]}`;
};

module.exports = {
  upload,
  deleteImage,
  getImageUrl,
  getPublicIdFromUrl,
  cloudinary
};
