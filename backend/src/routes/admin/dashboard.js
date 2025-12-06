const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/auth');
const Contact = require('../../models/Contact');
const Project = require('../../models/Project');
const Newsletter = require('../../models/Newsletter');

// All routes require authentication
router.use(authMiddleware);

// GET /api/admin/dashboard/stats - Get dashboard statistics
router.get('/stats', async (req, res) => {
  try {
    // Get today's date range
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Get this week's date range
    const thisWeek = new Date();
    thisWeek.setDate(thisWeek.getDate() - 7);

    // Get this month's date range
    const thisMonth = new Date();
    thisMonth.setMonth(thisMonth.getMonth() - 1);

    // Contact statistics
    const totalContacts = await Contact.countDocuments();
    const todayContacts = await Contact.countDocuments({
      createdAt: { $gte: today, $lt: tomorrow }
    });
    const weekContacts = await Contact.countDocuments({
      createdAt: { $gte: thisWeek }
    });

    // Project statistics
    const totalProjects = await Project.countDocuments({ status: 'active' });
    const featuredProjects = await Project.countDocuments({ featured: true });

    // Newsletter statistics
    const totalSubscribers = await Newsletter.countDocuments({ subscribed: true });
    const todaySubscribers = await Newsletter.countDocuments({
      subscribed: true,
      createdAt: { $gte: today, $lt: tomorrow }
    });

    // Recent contacts (last 5)
    const recentContacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email subject createdAt');

    res.json({
      success: true,
      stats: {
        contacts: {
          total: totalContacts,
          today: todayContacts,
          thisWeek: weekContacts
        },
        projects: {
          total: totalProjects,
          featured: featuredProjects
        },
        subscribers: {
          total: totalSubscribers,
          today: todaySubscribers
        },
        recentContacts
      }
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({
      error: 'Failed to fetch dashboard statistics'
    });
  }
});

module.exports = router;

