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

// Admin routes (must precede parameterized handlers)
router.get('/admin/all', protect, admin, getAllSites);
router.post('/', protect, admin, upload.single('image'), createSite);
router.put('/:id', protect, admin, upload.single('image'), updateSite);
router.delete('/:id', protect, admin, deleteSite);

// Parameterized route last to prevent conflicts
router.get('/:id', getSite);

module.exports = router;
