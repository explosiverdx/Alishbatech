const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();

// Import database connection
const { connectDB } = require('./utils/database');

// Import routes
const contactRoutes = require('./routes/contact');
const projectsRoutes = require('./routes/projects');
const servicesRoutes = require('./routes/services');
const newsletterRoutes = require('./routes/newsletter');
const healthRoutes = require('./routes/health');
const blogsRoutes = require('./routes/blogs');

// Import admin routes
const adminAuthRoutes = require('./routes/admin/auth');
const adminDashboardRoutes = require('./routes/admin/dashboard');
const adminContactsRoutes = require('./routes/admin/contacts');
const adminProjectsRoutes = require('./routes/admin/projects');
const adminSubscribersRoutes = require('./routes/admin/subscribers');
const adminUploadRoutes = require('./routes/admin/upload');
const adminAdminsRoutes = require('./routes/admin/admins');
const adminProfileRoutes = require('./routes/admin/profile');
const adminBlogsRoutes = require('./routes/admin/blogs');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS for all origins (configure for production)
app.use(morgan('dev')); // Logging
app.use(bodyParser.json({ limit: '50mb' })); // Parse JSON bodies with increased limit for blog content
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' })); // Parse URL-encoded bodies with increased limit

// Welcome route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to AlishbaTech API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      contact: '/api/contact',
      projects: '/api/projects',
      services: '/api/services',
      newsletter: '/api/newsletter',
      blogs: '/api/blogs',
    },
  });
});

// API Routes
app.use('/api/health', healthRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/blogs', blogsRoutes);

// Admin Routes
app.use('/api/admin/auth', adminAuthRoutes);
app.use('/api/admin/dashboard', adminDashboardRoutes);
app.use('/api/admin/contacts', adminContactsRoutes);
app.use('/api/admin/projects', adminProjectsRoutes);
app.use('/api/admin/subscribers', adminSubscribersRoutes);
app.use('/api/admin/upload', adminUploadRoutes);
app.use('/api/admin/admins', adminAdminsRoutes);
app.use('/api/admin/profile', adminProfileRoutes);
app.use('/api/admin/blogs', adminBlogsRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.path,
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// Connect to MongoDB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════╗
║   AlishbaTech Backend API Server       ║
║   Running on: http://localhost:${PORT}    ║
║   Environment: ${process.env.NODE_ENV || 'development'}             ║
╚════════════════════════════════════════╝
    `);
  });
});

module.exports = app;

