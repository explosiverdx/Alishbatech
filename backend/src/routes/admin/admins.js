const express = require('express');
const { body, validationResult } = require('express-validator');
const Admin = require('../../models/Admin');
const authMiddleware = require('../../middleware/auth');
const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Middleware to check if user is superadmin
const requireSuperAdmin = (req, res, next) => {
  if (req.admin.role !== 'superadmin') {
    return res.status(403).json({
      error: 'Access denied. Superadmin privileges required.'
    });
  }
  next();
};

// GET /api/admin/admins - Get all admins (superadmin only)
router.get('/', requireSuperAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Build search query
    const searchQuery = search
      ? {
          $or: [
            { username: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } }
          ]
        }
      : {};

    // Get admins
    const admins = await Admin.find(searchQuery)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const total = await Admin.countDocuments(searchQuery);

    res.json({
      success: true,
      data: admins,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    console.error('Get admins error:', error);
    res.status(500).json({
      error: 'Failed to fetch admins'
    });
  }
});

// GET /api/admin/admins/:id - Get single admin (superadmin only)
router.get('/:id', requireSuperAdmin, async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id).select('-password');
    
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
    console.error('Get admin error:', error);
    res.status(500).json({
      error: 'Failed to fetch admin'
    });
  }
});

// POST /api/admin/admins - Create new admin (superadmin only)
router.post(
  '/',
  requireSuperAdmin,
  [
    body('username').notEmpty().trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('role').isIn(['admin', 'superadmin']).withMessage('Role must be admin or superadmin'),
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

      const { username, email, password, role } = req.body;

      // Check if username or email already exists
      const existingAdmin = await Admin.findOne({
        $or: [{ username }, { email }]
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
        role: role || 'admin'
      });

      res.status(201).json({
        success: true,
        message: 'Admin created successfully',
        data: {
          id: admin._id,
          username: admin.username,
          email: admin.email,
          role: admin.role
        }
      });
    } catch (error) {
      console.error('Create admin error:', error);
      res.status(500).json({
        error: 'Failed to create admin'
      });
    }
  }
);

// PUT /api/admin/admins/:id - Update admin (superadmin only)
router.put(
  '/:id',
  requireSuperAdmin,
  [
    body('username').optional().trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
    body('email').optional().isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('role').optional().isIn(['admin', 'superadmin']).withMessage('Role must be admin or superadmin'),
    body('isActive').optional().isBoolean().withMessage('isActive must be a boolean'),
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

      const { id } = req.params;
      const { username, email, password, role, isActive } = req.body;

      // Don't allow admin to modify themselves
      if (id === req.admin._id.toString()) {
        return res.status(400).json({
          error: 'Cannot modify your own account. Use profile settings instead.'
        });
      }

      // Find admin
      const admin = await Admin.findById(id);
      if (!admin) {
        return res.status(404).json({
          error: 'Admin not found'
        });
      }

      // Check if username or email is taken by another admin
      if (username || email) {
        const query = {
          _id: { $ne: id },
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
      if (password) admin.password = password; // Will be hashed by pre-save hook
      if (role) admin.role = role;
      if (typeof isActive !== 'undefined') admin.isActive = isActive;
      if (req.body.profilePicture !== undefined) admin.profilePicture = req.body.profilePicture;
      if (req.body.cloudinaryPublicId !== undefined) admin.cloudinaryPublicId = req.body.cloudinaryPublicId;

      await admin.save();

      res.json({
        success: true,
        message: 'Admin updated successfully',
        data: {
          id: admin._id,
          username: admin.username,
          email: admin.email,
          role: admin.role,
          isActive: admin.isActive
        }
      });
    } catch (error) {
      console.error('Update admin error:', error);
      res.status(500).json({
        error: 'Failed to update admin'
      });
    }
  }
);

// DELETE /api/admin/admins/:id - Delete admin (superadmin only)
router.delete('/:id', requireSuperAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    // Don't allow admin to delete themselves
    if (id === req.admin._id.toString()) {
      return res.status(400).json({
        error: 'Cannot delete your own account'
      });
    }

    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({
        error: 'Admin not found'
      });
    }

    await Admin.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Admin deleted successfully'
    });
  } catch (error) {
    console.error('Delete admin error:', error);
    res.status(500).json({
      error: 'Failed to delete admin'
    });
  }
});

// GET /api/admin/admins/stats/overview - Get admin statistics
router.get('/stats/overview', requireSuperAdmin, async (req, res) => {
  try {
    const totalAdmins = await Admin.countDocuments();
    const activeSuperAdmins = await Admin.countDocuments({ role: 'superadmin', isActive: true });
    const activeAdmins = await Admin.countDocuments({ role: 'admin', isActive: true });
    const inactiveAdmins = await Admin.countDocuments({ isActive: false });

    res.json({
      success: true,
      stats: {
        total: totalAdmins,
        superadmins: activeSuperAdmins,
        admins: activeAdmins,
        inactive: inactiveAdmins
      }
    });
  } catch (error) {
    console.error('Get admin stats error:', error);
    res.status(500).json({
      error: 'Failed to fetch admin statistics'
    });
  }
});

module.exports = router;

