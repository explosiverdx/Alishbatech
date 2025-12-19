const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/auth');
const { body, validationResult } = require('express-validator');
const {
  getBlogs,
  getBlogByIdAdmin,
  createBlog,
  updateBlog,
  deleteBlog
} = require('../../utils/database');

// All routes require authentication
router.use(authMiddleware);

// GET /api/admin/blogs - Get all blogs (including unpublished)
router.get('/', async (req, res) => {
  try {
    const filters = { ...req.query, published: false }; // Set to false to get all blogs
    const blogs = await getBlogs(filters);

    res.json({
      success: true,
      count: blogs.length,
      data: blogs
    });
  } catch (error) {
    console.error('Get blogs error:', error);
    res.status(500).json({
      error: 'Failed to fetch blogs'
    });
  }
});

// GET /api/admin/blogs/:id - Get single blog
router.get('/:id', async (req, res) => {
  try {
    const blog = await getBlogByIdAdmin(req.params.id);

    if (!blog) {
      return res.status(404).json({
        error: 'Blog not found'
      });
    }

    res.json({
      success: true,
      data: blog
    });
  } catch (error) {
    console.error('Get blog error:', error);
    res.status(500).json({
      error: 'Failed to fetch blog'
    });
  }
});

// POST /api/admin/blogs - Create blog
router.post(
  '/',
  [
    body('title').notEmpty().trim().withMessage('Title is required'),
    body('excerpt').notEmpty().trim().withMessage('Excerpt is required'),
    body('content').notEmpty().trim().withMessage('Content is required'),
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

      const blog = await createBlog(req.body);

      res.status(201).json({
        success: true,
        message: 'Blog created successfully',
        data: blog
      });
    } catch (error) {
      console.error('Create blog error:', error);
      res.status(500).json({
        error: 'Failed to create blog: ' + error.message
      });
    }
  }
);

// PUT /api/admin/blogs/:id - Update blog
router.put('/:id', async (req, res) => {
  try {
    const blog = await updateBlog(req.params.id, req.body);

    if (!blog) {
      return res.status(404).json({
        error: 'Blog not found'
      });
    }

    res.json({
      success: true,
      message: 'Blog updated successfully',
      data: blog
    });
  } catch (error) {
    console.error('Update blog error:', error);
    res.status(500).json({
      error: 'Failed to update blog: ' + error.message
    });
  }
});

// DELETE /api/admin/blogs/:id - Delete blog
router.delete('/:id', async (req, res) => {
  try {
    const blog = await deleteBlog(req.params.id);

    if (!blog) {
      return res.status(404).json({
        error: 'Blog not found'
      });
    }

    res.json({
      success: true,
      message: 'Blog deleted successfully'
    });
  } catch (error) {
    console.error('Delete blog error:', error);
    res.status(500).json({
      error: 'Failed to delete blog'
    });
  }
});

module.exports = router;

