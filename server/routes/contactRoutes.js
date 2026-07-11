const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Contact form submission
router.post('/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('subject').trim().notEmpty().withMessage('Subject is required'),
    body('message').trim().notEmpty().withMessage('Message is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const { name, email, phone, subject, message } = req.body;

      // TODO: Save to database
      // TODO: Send email notification
      
      console.log('Contact form submission:', { name, email, phone, subject, message });

      res.json({
        success: true,
        message: 'Thank you for contacting us. We will get back to you soon!'
      });
    } catch (error) {
      console.error('Contact form error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to send message. Please try again later.'
      });
    }
  }
);

module.exports = router;
