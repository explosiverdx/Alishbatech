const express = require('express');
const router = express.Router();
const { getBlogs, getBlogById } = require('../utils/database');

// GET /api/blogs - Get all published blogs
router.get('/', async (req, res) => {
  try {
    const filters = req.query;
    console.log('📝 Fetching blogs with filters:', filters);
    const blogs = await getBlogs(filters);
    console.log(`✅ Retrieved ${blogs.length} blogs`);

    // Limit response size by selecting only necessary fields
    const blogsData = blogs.map(blog => ({
      _id: blog._id,
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      featuredImage: blog.featuredImage,
      author: blog.author,
      category: blog.category,
      tags: blog.tags,
      published: blog.published,
      featured: blog.featured,
      views: blog.views,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
      // Include content but it should be manageable
      content: blog.content
    }));

    res.json({
      success: true,
      count: blogsData.length,
      data: blogsData,
    });
  } catch (error) {
    console.error('❌ Blogs GET error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ error: 'Failed to fetch blogs: ' + error.message });
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

