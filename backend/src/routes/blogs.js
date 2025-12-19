const express = require('express');
const router = express.Router();
const { getBlogs, getBlogById } = require('../utils/database');

// GET /api/blogs - Get all published blogs
router.get('/', async (req, res) => {
  try {
    const filters = req.query;
    const blogs = await getBlogs(filters);

    res.json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (error) {
    console.error('Blogs GET error:', error);
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

// GET /api/blogs/:slug - Get single blog by slug
router.get('/:slug', async (req, res) => {
  try {
    const blog = await getBlogById(req.params.slug);

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error('Blog GET error:', error);
    res.status(500).json({ error: 'Failed to fetch blog' });
  }
});

module.exports = router;

