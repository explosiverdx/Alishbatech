const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const { saveNewsletterSubscription } = require('../utils/database');

// POST /api/newsletter - Subscribe to newsletter
router.post(
  '/',
  [
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('name').optional().trim(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: 'Validation failed',
          details: errors.array(),
        });
      }

      const { email, name } = req.body;

      console.log('Newsletter Subscription:', {
        email,
        name: name || 'Not provided',
        timestamp: new Date().toISOString(),
      });

      // Save to database
      await saveNewsletterSubscription({ email, name });

      // Add to email marketing service (implement in production)
      // await addToMailingList({ email, name });

      res.status(200).json({
        success: true,
        message: 'Successfully subscribed to newsletter!',
      });
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      res.status(500).json({
        error: 'Failed to subscribe. Please try again later.',
      });
    }
  }
);

module.exports = router;

