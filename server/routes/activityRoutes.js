const express = require('express');
const router = express.Router();
const {
  getActivities,
  getActivity,
  createActivity,
  updateActivity,
  deleteActivity
} = require('../controllers/activityController');
const { protect, headPosterOnly } = require('../middleware/auth');

router.route('/')
  .get(getActivities)
  .post(protect, headPosterOnly, createActivity);

router.route('/:id')
  .get(getActivity)
  .put(protect, headPosterOnly, updateActivity)
  .delete(protect, headPosterOnly, deleteActivity);

module.exports = router;
