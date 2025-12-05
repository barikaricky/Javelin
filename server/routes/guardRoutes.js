const express = require('express');
const router = express.Router();
const {
  getGuards,
  getReadyGuards,
  getGuard,
  createGuard,
  updateGuard,
  updateDeploymentStatus,
  deleteGuard,
  getGuardStats
} = require('../controllers/guardController');
const { protect, headPosterOnly } = require('../middleware/auth');

router.get('/ready', getReadyGuards);
router.get('/stats', protect, getGuardStats);

router.route('/')
  .get(getGuards)
  .post(protect, headPosterOnly, createGuard);

router.route('/:id')
  .get(getGuard)
  .put(protect, headPosterOnly, updateGuard)
  .delete(protect, headPosterOnly, deleteGuard);

router.put('/:id/deployment', protect, headPosterOnly, updateDeploymentStatus);

module.exports = router;
