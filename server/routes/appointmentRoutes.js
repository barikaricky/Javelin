const express = require('express');
const router = express.Router();
const {
  createAppointment,
  getAllAppointments,
  getAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentStats
} = require('../controllers/appointmentController');
const { protect, admin } = require('../middleware/auth');

// Public route - anyone can book an appointment
router.post('/', createAppointment);

// Admin routes - require authentication
router.get('/', protect, admin, getAllAppointments);
router.get('/stats', protect, admin, getAppointmentStats);
router.get('/:id', protect, admin, getAppointment);
router.put('/:id', protect, admin, updateAppointment);
router.delete('/:id', protect, admin, deleteAppointment);

module.exports = router;
