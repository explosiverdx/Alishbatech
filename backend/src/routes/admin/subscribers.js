const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/auth');
const Newsletter = require('../../models/Newsletter');

// All routes require authentication
router.use(authMiddleware);

// GET /api/admin/subscribers - Get all subscribers
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const query = {};

    // Filter by subscription status
    if (req.query.subscribed !== undefined) {
      query.subscribed = req.query.subscribed === 'true';
    }

    // Search
    if (req.query.search) {
      query.$or = [
        { email: { $regex: req.query.search, $options: 'i' } },
        { name: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    const subscribers = await Newsletter.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Newsletter.countDocuments(query);

    res.json({
      success: true,
      data: subscribers,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get subscribers error:', error);
    res.status(500).json({
      error: 'Failed to fetch subscribers'
    });
  }
});

// DELETE /api/admin/subscribers/:id - Unsubscribe or delete subscriber
router.delete('/:id', async (req, res) => {
  try {
    const subscriber = await Newsletter.findByIdAndDelete(req.params.id);

    if (!subscriber) {
      return res.status(404).json({
        error: 'Subscriber not found'
      });
    }

    res.json({
      success: true,
      message: 'Subscriber removed successfully'
    });
  } catch (error) {
    console.error('Delete subscriber error:', error);
    res.status(500).json({
      error: 'Failed to remove subscriber'
    });
  }
});

// GET /api/admin/subscribers/stats - Get subscriber statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const total = await Newsletter.countDocuments({ subscribed: true });
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayCount = await Newsletter.countDocuments({
      subscribed: true,
      createdAt: { $gte: today }
    });
    const thisWeek = new Date();
    thisWeek.setDate(thisWeek.getDate() - 7);
    const weekCount = await Newsletter.countDocuments({
      subscribed: true,
      createdAt: { $gte: thisWeek }
    });

    res.json({
      success: true,
      stats: {
        total,
        today: todayCount,
        thisWeek: weekCount
      }
    });
  } catch (error) {
    console.error('Get subscriber stats error:', error);
    res.status(500).json({
      error: 'Failed to fetch statistics'
    });
  }
});

module.exports = router;

