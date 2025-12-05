const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getBookings,
  getBooking,
  createBooking,
  updateBooking,
  updateBookingStatus,
  deleteBooking,
  getBookingStats
} = require('../controllers/bookingController');

// Public routes
router.post('/', createBooking); // Anyone can create a booking
router.get('/:id', getBooking);  // Can lookup by bookingId

// Protected routes (admin only)
router.get('/', protect, authorize('head_poster', 'admin'), getBookings);
router.get('/stats/overview', protect, authorize('head_poster', 'admin'), getBookingStats);
router.put('/:id', protect, authorize('head_poster', 'admin'), updateBooking);
router.put('/:id/status', protect, authorize('head_poster', 'admin'), updateBookingStatus);
router.delete('/:id', protect, authorize('head_poster', 'admin'), deleteBooking);

module.exports = router;
