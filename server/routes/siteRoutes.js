const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getSites,
  getSite,
  createSite,
  updateSite,
  deleteSite,
  getSiteStats
} = require('../controllers/siteController');

// Public routes
router.get('/', getSites);
router.get('/stats', getSiteStats);
router.get('/:id', getSite);

// Protected routes (head_poster only)
router.post('/', protect, authorize('head_poster', 'admin'), createSite);
router.put('/:id', protect, authorize('head_poster', 'admin'), updateSite);
router.delete('/:id', protect, authorize('head_poster', 'admin'), deleteSite);

module.exports = router;
