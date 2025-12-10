const express = require('express');
const router = express.Router();
const {
  getNewsPosts,
  getAllNewsPosts,
  getNewsPostBySlug,
  getNewsPost,
  createNewsPost,
  updateNewsPost,
  deleteNewsPost,
  getCategories
} = require('../controllers/newsController');
const { protect, admin } = require('../middleware/auth');
const { upload } = require('../middleware/uploadMiddleware');

// Public routes
router.get('/', getNewsPosts);
router.get('/categories', getCategories);
router.get('/slug/:slug', getNewsPostBySlug);
router.get('/:id', getNewsPost);

// Admin routes
router.get('/admin/all', protect, admin, getAllNewsPosts);
router.post('/', protect, admin, upload.single('featuredImage'), createNewsPost);
router.put('/:id', protect, admin, upload.single('featuredImage'), updateNewsPost);
router.delete('/:id', protect, admin, deleteNewsPost);

module.exports = router;
