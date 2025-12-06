// MongoDB connection and database utility functions
const mongoose = require('mongoose');

// Import models
const Contact = require('../models/Contact');
const Project = require('../models/Project');
const Newsletter = require('../models/Newsletter');

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
};
