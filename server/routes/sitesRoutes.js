const express = require('express');
const router = express.Router();
const {
  getSites,
  getAllSites,
  getSite,
  createSite,
  updateSite,
  deleteSite
} = require('../controllers/siteController');
const { protect, admin } = require('../middleware/auth');
const { upload } = require('../middleware/uploadMiddleware');

// Public routes
router.get('/', getSites);
router.get('/:id', getSite);

// Admin routes
router.get('/admin/all', protect, admin, getAllSites);
router.post('/', protect, admin, upload.single('image'), createSite);
router.put('/:id', protect, admin, upload.single('image'), updateSite);
router.delete('/:id', protect, admin, deleteSite);

module.exports = router;
