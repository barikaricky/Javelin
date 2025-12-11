const express = require('express');
const router = express.Router();
const {
  getGalleryItems,
  getAllGalleryItems,
  getGalleryItem,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  getCategories
} = require('../controllers/galleryController');
const { protect, admin } = require('../middleware/auth');
const { upload } = require('../middleware/uploadMiddleware');

// Public routes
router.get('/', getGalleryItems);
router.get('/categories', getCategories);

// Admin routes (register before parameter routes)
router.get('/admin/all', protect, admin, getAllGalleryItems);
router.post('/', protect, admin, upload.single('image'), createGalleryItem);
router.put('/:id', protect, admin, upload.single('image'), updateGalleryItem);
router.delete('/:id', protect, admin, deleteGalleryItem);

// Parameterized route last
router.get('/:id', getGalleryItem);

module.exports = router;
