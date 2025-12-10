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
router.get('/:id', getTeamMember);

// Admin routes
router.get('/admin/all', protect, admin, getAllTeamMembers);
router.post('/', protect, admin, upload.single('image'), createTeamMember);
router.put('/reorder', protect, admin, reorderTeamMembers);
router.put('/:id', protect, admin, upload.single('image'), updateTeamMember);
router.delete('/:id', protect, admin, deleteTeamMember);

module.exports = router;
