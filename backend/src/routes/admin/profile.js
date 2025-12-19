const express = require('express');
const { body, validationResult } = require('express-validator');
const Admin = require('../../models/Admin');
const authMiddleware = require('../../middleware/auth');
const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// GET /api/admin/profile - Get current admin profile
router.get('/', async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id).select('-password');
    
    if (!admin) {
      return res.status(404).json({
        error: 'Admin not found'
      });
    }

    res.json({
      success: true,
      data: admin
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      error: 'Failed to fetch profile'
    });
  }
});

// PUT /api/admin/profile - Update current admin profile
router.put(
  '/',
  [
    body('username').optional().trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
    body('email').optional().isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('currentPassword').optional().notEmpty().withMessage('Current password is required to change password'),
    body('newPassword').optional().isLength({ min: 6 }).withMessage('New password must be at least 6 characters'),
  ],
  async (req, res) => {
    try {
      // Validate input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: 'Validation failed',
          details: errors.array()
        });
      }

      const { username, email, currentPassword, newPassword, profilePicture, cloudinaryPublicId } = req.body;

      // Find admin
      const admin = await Admin.findById(req.admin._id);
      if (!admin) {
        return res.status(404).json({
          error: 'Admin not found'
        });
      }

      // If changing password, verify current password
      if (newPassword) {
        if (!currentPassword) {
          return res.status(400).json({
            error: 'Current password is required to set a new password'
          });
        }

        const isPasswordValid = await admin.comparePassword(currentPassword);
        if (!isPasswordValid) {
          return res.status(400).json({
            error: 'Current password is incorrect'
          });
        }

        admin.password = newPassword; // Will be hashed by pre-save hook
      }

      // Check if username or email is taken by another admin
      if (username || email) {
        const query = {
          _id: { $ne: req.admin._id },
          $or: []
        };
        
        if (username) query.$or.push({ username });
        if (email) query.$or.push({ email });
        
        if (query.$or.length > 0) {
          const existingAdmin = await Admin.findOne(query);
          if (existingAdmin) {
            return res.status(400).json({
              error: 'Username or email already exists'
            });
          }
        }
      }

      // Update fields
      if (username) admin.username = username;
      if (email) admin.email = email;
      if (profilePicture !== undefined) admin.profilePicture = profilePicture;
      if (cloudinaryPublicId !== undefined) admin.cloudinaryPublicId = cloudinaryPublicId;

      await admin.save();

      // Return updated admin without password
      const updatedAdmin = admin.toObject();
      delete updatedAdmin.password;

      res.json({
        success: true,
        message: 'Profile updated successfully',
        data: updatedAdmin
      });
    } catch (error) {
      console.error('Update profile error:', error);
      res.status(500).json({
        error: 'Failed to update profile'
      });
    }
  }
);

// DELETE /api/admin/profile/picture - Delete profile picture
router.delete('/picture', async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id);
    
    if (!admin) {
      return res.status(404).json({
        error: 'Admin not found'
      });
    }

    admin.profilePicture = '';
    admin.cloudinaryPublicId = '';
    await admin.save();

    res.json({
      success: true,
      message: 'Profile picture deleted successfully'
    });
  } catch (error) {
    console.error('Delete profile picture error:', error);
    res.status(500).json({
      error: 'Failed to delete profile picture'
    });
  }
});

module.exports = router;

