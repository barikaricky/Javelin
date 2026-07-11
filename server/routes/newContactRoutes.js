const express = require('express');
const router = express.Router();
const {
  submitContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact,
  getContactInfo,
  updateContactInfo,
  getContactStats
} = require('../controllers/contactController');
const { protect, admin } = require('../middleware/auth');

// Public routes
router.post('/', submitContact);
router.get('/info', getContactInfo);

// Admin routes
router.get('/admin/all', protect, admin, getContacts);
router.get('/admin/stats', protect, admin, getContactStats);
router.get('/admin/:id', protect, admin, getContact);
router.put('/admin/:id', protect, admin, updateContact);
router.delete('/admin/:id', protect, admin, deleteContact);
router.put('/info', protect, admin, updateContactInfo);

module.exports = router;
