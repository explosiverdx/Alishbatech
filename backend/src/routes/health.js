const express = require('express');
const router = express.Router();

// GET /api/health - Health check endpoint
router.get('/', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'AlishbaTech API',
    version: '1.0.0',
    uptime: process.uptime(),
  });
});

module.exports = router;

