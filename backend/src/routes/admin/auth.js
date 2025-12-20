const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const Admin = require('../../models/Admin');
const authMiddleware = require('../../middleware/auth');
const router = express.Router();

// JWT secret and expiration
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '7d';

/**
 * Generate JWT Token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRE
  });
};

// POST /api/admin/auth/login - Admin login
router.post(
  '/login',
  [
    body('username').notEmpty().trim().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
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

      const { username, password } = req.body;

      // Find admin by username or email (email is stored lowercase)
      const admin = await Admin.findOne({
        $or: [
          { username: username.trim() },
          { email: username.trim().toLowerCase() }
        ]
      });

      if (!admin) {
        return res.status(401).json({
          error: 'Invalid credentials'
        });
      }

      if (!admin.isActive) {
        return res.status(401).json({
          error: 'Account is inactive. Please contact administrator.'
        });
      }

      // Check password
      const isPasswordValid = await admin.comparePassword(password);

      if (!isPasswordValid) {
        console.log(`❌ Login failed for: ${username} (Password mismatch)`);
        return res.status(401).json({
          error: 'Invalid credentials'
        });
      }

      // Generate token
      const token = generateToken(admin._id);

      res.json({
        success: true,
        message: 'Login successful',
        token,
        admin: {
          id: admin._id,
          username: admin.username,
          email: admin.email,
          role: admin.role
        }
      });
    } catch (error) {
      console.error('Admin login error:', error);
      res.status(500).json({
        error: 'Login failed. Please try again later.'
      });
    }
  }
);

// POST /api/admin/auth/register - Create first admin (only if no admins exist)
router.post(
  '/register',
  [
    body('username').notEmpty().trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  async (req, res) => {
    try {
      // Check if any admin exists
      const adminCount = await Admin.countDocuments();
      
      if (adminCount > 0) {
        return res.status(403).json({
          error: 'Admin registration is disabled. Use login endpoint instead.'
        });
      }

      // Validate input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: 'Validation failed',
          details: errors.array(),
        });
      }

      const { username, email, password } = req.body;

      // Check if username or email already exists
      const existingAdmin = await Admin.findOne({
        $or: [
          { username },
          { email }
        ]
      });

      if (existingAdmin) {
        return res.status(400).json({
          error: 'Username or email already exists'
        });
      }

      // Create admin
      const admin = await Admin.create({
        username,
        email,
        password,
        role: 'superadmin'
      });

      // Generate token
      const token = generateToken(admin._id);

      res.status(201).json({
        success: true,
        message: 'Admin created successfully',
        token,
        admin: {
          id: admin._id,
          username: admin.username,
          email: admin.email,
          role: admin.role
        }
      });
    } catch (error) {
      console.error('Admin registration error:', error);
      console.error('Error stack:', error.stack);
      res.status(500).json({
        error: 'Registration failed. Please try again later.',
        message: error.message,
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
      });
    }
  }
);

// GET /api/admin/auth/me - Get current admin info (protected)
router.get('/me', authMiddleware, async (req, res) => {
  try {
    res.json({
      success: true,
      admin: req.admin
    });
  } catch (error) {
    console.error('Get admin info error:', error);
    res.status(500).json({
      error: 'Failed to get admin information'
    });
  }
});

module.exports = router;

