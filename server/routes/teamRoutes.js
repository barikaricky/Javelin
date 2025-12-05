const express = require('express');
const router = express.Router();
const {
  getTeamMembers,
  getTeamMember,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember
} = require('../controllers/teamController');
const { protect, headPosterOnly } = require('../middleware/auth');

router.route('/')
  .get(getTeamMembers)
  .post(protect, headPosterOnly, createTeamMember);

router.route('/:id')
  .get(getTeamMember)
  .put(protect, headPosterOnly, updateTeamMember)
  .delete(protect, headPosterOnly, deleteTeamMember);

module.exports = router;
