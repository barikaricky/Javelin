const express = require('express');
const router = express.Router();
const {
  getTeamMembers,
  getAllTeamMembers,
  getTeamMember,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  reorderTeamMembers
} = require('../controllers/teamController');
const { protect, admin } = require('../middleware/auth');
const { upload } = require('../middleware/uploadMiddleware');

// Public routes
router.get('/', getTeamMembers);

// Admin routes (place before parameterized routes to avoid conflicts)
router.get('/admin/all', protect, admin, getAllTeamMembers);
router.put('/reorder', protect, admin, reorderTeamMembers);
router.post('/', protect, admin, upload.single('image'), createTeamMember);
router.put('/:id', protect, admin, upload.single('image'), updateTeamMember);
router.delete('/:id', protect, admin, deleteTeamMember);

// Parameterized routes should come last
router.get('/:id', getTeamMember);

module.exports = router;
