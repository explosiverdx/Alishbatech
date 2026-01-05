// MongoDB connection and database utility functions
const mongoose = require('mongoose');

// Import models
const Contact = require('../models/Contact');
const Project = require('../models/Project');
const Newsletter = require('../models/Newsletter');
const Blog = require('../models/Blog');

/**
 * Connect to MongoDB
 */
async function connectDB() {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/alishbatech';
    
    const conn = await mongoose.connect(mongoURI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Save contact form submission to database
 */
async function saveContactSubmission(data) {
  try {
    const contact = new Contact({
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      subject: data.subject,
      message: data.message
    });
    
    const savedContact = await contact.save();
    console.log('✅ Contact saved to database:', savedContact._id);
    return savedContact;
  } catch (error) {
    console.error('❌ Error saving contact:', error.message);
    throw error;
  }
}

/**
 * Get all projects from database
 */
async function getProjects(filters = {}) {
  try {
    let query = {};
    
    // Apply filters
    if (filters.category) {
      query.category = filters.category;
    }
    
    if (filters.featured !== undefined) {
      query.featured = filters.featured === 'true' || filters.featured === true;
    }
    
    if (filters.status) {
      query.status = filters.status;
    } else {
      query.status = 'active'; // Only get active projects by default
    }
    
    let projectsQuery = Project.find(query).sort({ createdAt: -1 });
    
    // Apply limit if specified
    if (filters.limit) {
      projectsQuery = projectsQuery.limit(parseInt(filters.limit));
    }
    
    const projects = await projectsQuery.exec();
    console.log(`✅ Retrieved ${projects.length} projects from database`);
    return projects;
  } catch (error) {
    console.error('❌ Error fetching projects:', error.message);
    throw error;
  }
}

/**
 * Get a single project by ID
 */
async function getProjectById(id) {
  try {
    const project = await Project.findById(id);
    return project;
  } catch (error) {
    console.error('❌ Error fetching project:', error.message);
    throw error;
  }
}

/**
 * Create a new project
 */
async function createProject(data) {
  try {
    const project = new Project(data);
    const savedProject = await project.save();
    console.log('✅ Project created:', savedProject._id);
    return savedProject;
  } catch (error) {
    console.error('❌ Error creating project:', error.message);
    throw error;
  }
}

/**
 * Update a project
 */
async function updateProject(id, data) {
  try {
    const project = await Project.findByIdAndUpdate(
      id,
      { ...data, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    console.log('✅ Project updated:', id);
    return project;
  } catch (error) {
    console.error('❌ Error updating project:', error.message);
    throw error;
  }
}

/**
 * Delete a project
 */
async function deleteProject(id) {
  try {
    const project = await Project.findByIdAndDelete(id);
    console.log('✅ Project deleted:', id);
    return project;
  } catch (error) {
    console.error('❌ Error deleting project:', error.message);
    throw error;
  }
}

/**
 * Save newsletter subscription
 */
async function saveNewsletterSubscription(data) {
  try {
    // Check if email already exists
    let subscriber = await Newsletter.findOne({ email: data.email });
    
    if (subscriber) {
      // Update existing subscriber
      subscriber.name = data.name || subscriber.name;
      subscriber.subscribed = true;
      subscriber.updatedAt = new Date();
      await subscriber.save();
      console.log('✅ Newsletter subscription updated:', subscriber.email);
      return subscriber;
    } else {
      // Create new subscriber
      subscriber = new Newsletter({
        email: data.email,
        name: data.name,
        subscribed: true
      });
      await subscriber.save();
      console.log('✅ Newsletter subscription saved:', subscriber.email);
      return subscriber;
    }
  } catch (error) {
    console.error('❌ Error saving newsletter subscription:', error.message);
    throw error;
  }
}

/**
 * Get all newsletter subscribers
 */
async function getNewsletterSubscribers() {
  try {
    const subscribers = await Newsletter.find({ subscribed: true }).sort({ createdAt: -1 });
    return subscribers;
  } catch (error) {
    console.error('❌ Error fetching newsletter subscribers:', error.message);
    throw error;
  }
}

/**
 * Get all blogs from database
 */
async function getBlogs(filters = {}) {
  try {
    let query = {};
    
    // Only get published blogs if published filter is not explicitly set to false
    // If published is false in filters, it means admin wants all blogs (don't filter)
    if (filters.published !== false && filters.published !== 'false') {
      query.published = true;
    }
    // If filters.published === false, don't add published filter (get all blogs)
    
    // Apply filters
    if (filters.category) {
      query.category = filters.category;
    }
    
    if (filters.featured !== undefined) {
      query.featured = filters.featured === 'true' || filters.featured === true;
    }
    
    let blogsQuery = Blog.find(query).sort({ createdAt: -1 });
    
    // Apply limit if specified, otherwise default to 50 to prevent huge responses
    if (filters.limit) {
      blogsQuery = blogsQuery.limit(parseInt(filters.limit));
    } else {
      blogsQuery = blogsQuery.limit(50); // Default limit to prevent huge responses
    }
    
    const blogs = await blogsQuery.exec();
    console.log(`✅ Retrieved ${blogs.length} blogs from database`);
    return blogs;
  } catch (error) {
    console.error('❌ Error fetching blogs:', error.message);
    throw error;
  }
}

/**
 * Get a single blog by ID or slug
 */
async function getBlogById(idOrSlug) {
  try {
    let blog = null;
    
    // Check if it's a valid MongoDB ObjectId (24 hex characters)
    const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(idOrSlug);
    
    if (isValidObjectId) {
      // Try to find by ID first
      blog = await Blog.findById(idOrSlug);
    }
    
    // If not found by ID or not a valid ObjectId, try to find by slug
    if (!blog) {
      blog = await Blog.findOne({ slug: idOrSlug, published: true });
    }
    
    // Only return if blog is published (for public routes)
    if (blog && blog.published) {
      // Increment views
      blog.views = (blog.views || 0) + 1;
      await blog.save();
      return blog;
    }
    
    return null;
  } catch (error) {
    console.error('❌ Error fetching blog:', error.message);
    throw error;
  }
}

/**
 * Get a single blog by ID or slug (admin - includes unpublished)
 */
async function getBlogByIdAdmin(idOrSlug) {
  try {
    // Try to find by ID first, then by slug
    let blog = await Blog.findById(idOrSlug);
    if (!blog) {
      blog = await Blog.findOne({ slug: idOrSlug });
    }
    return blog;
  } catch (error) {
    console.error('❌ Error fetching blog:', error.message);
    throw error;
  }
}

/**
 * Create a new blog
 */
async function createBlog(data) {
  try {
    // Ensure slug is set if not provided
    if (!data.slug || data.slug.trim() === '') {
      if (data.title) {
        data.slug = data.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
        
        if (!data.slug || data.slug.trim() === '') {
          data.slug = 'blog-post-' + Date.now();
        }
      } else {
        data.slug = 'blog-post-' + Date.now();
      }
    }
    
    // Handle duplicate slug by appending timestamp
    let slug = data.slug;
    let counter = 1;
    let existingBlog = await Blog.findOne({ slug: slug });
    
    while (existingBlog) {
      slug = `${data.slug}-${counter}`;
      existingBlog = await Blog.findOne({ slug: slug });
      counter++;
    }
    
    data.slug = slug;
    
    const blog = new Blog(data);
    const savedBlog = await blog.save();
    console.log('✅ Blog created:', savedBlog._id);
    return savedBlog;
  } catch (error) {
    console.error('❌ Error creating blog:', error.message);
    // Handle duplicate key error
    if (error.code === 11000) {
      throw new Error('A blog with this slug already exists');
    }
    throw error;
  }
}

/**
 * Update a blog
 */
async function updateBlog(id, data) {
  try {
    const blog = await Blog.findByIdAndUpdate(
      id,
      { ...data, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    console.log('✅ Blog updated:', id);
    return blog;
  } catch (error) {
    console.error('❌ Error updating blog:', error.message);
    throw error;
  }
}

/**
 * Delete a blog
 */
async function deleteBlog(id) {
  try {
    const blog = await Blog.findByIdAndDelete(id);
    console.log('✅ Blog deleted:', id);
    return blog;
  } catch (error) {
    console.error('❌ Error deleting blog:', error.message);
    throw error;
  }
}

module.exports = {
  connectDB,
  saveContactSubmission,
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  saveNewsletterSubscription,
  getNewsletterSubscribers,
  getBlogs,
  getBlogById,
  getBlogByIdAdmin,
  createBlog,
  updateBlog,
  deleteBlog,
};
