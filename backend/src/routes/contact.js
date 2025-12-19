const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const { sendContactEmail } = require('../utils/email');
const { saveContactSubmission } = require('../utils/database');

// GET /api/contact - Get contact information
router.get('/', (req, res) => {
  res.json({
    email: 'info@alishbatech.com',
    phone: '+1 (555) 123-4567',
    address: '123 Tech Street, Innovation City, IC 12345',
    businessHours: {
      weekdays: '9:00 AM - 6:00 PM',
      saturday: '10:00 AM - 4:00 PM',
      sunday: 'Closed',
    },
  });
});

// POST /api/contact - Handle contact form submissions
router.post(
  '/',
  [
    body('name').notEmpty().trim().withMessage('Name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('phone').optional({ checkFalsy: true }).trim(),
    body('subject').notEmpty().trim().withMessage('Subject is required'),
    body('message').notEmpty().trim().withMessage('Message is required'),
  ],
  async (req, res) => {
    try {
      // Validate input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: 'Validation failed',
          details: errors.array(),
        });
      }

      const { name, email, phone, subject, message } = req.body;

      // Log submission
      console.log('Contact Form Submission:', {
        name,
        email,
        phone,
        subject,
        timestamp: new Date().toISOString(),
      });

      // Save to database
      await saveContactSubmission({ name, email, phone, subject, message });

      // Send email notification (implement this in production)
      // await sendContactEmail({ name, email, phone, subject, message });

      res.status(200).json({
        success: true,
        message: 'Message sent successfully! We will get back to you soon.',
        data: { name, email, phone, subject },
      });
    } catch (error) {
      console.error('Contact form error:', error);
      res.status(500).json({
        error: 'Failed to send message. Please try again later.',
      });
    }
  }
);

module.exports = router;

