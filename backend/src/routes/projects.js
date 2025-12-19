const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// In-memory database (replace with real database in production)
let projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    category: 'Web Development',
    description: 'A modern e-commerce solution with real-time inventory management and seamless checkout experience.',
    longDescription: 'Built a comprehensive e-commerce platform featuring real-time inventory tracking, secure payment processing via Stripe, advanced product filtering, and an intuitive admin dashboard.',
    image: '🛒',
    tags: ['Next.js', 'Stripe', 'PostgreSQL'],
    featured: true,
    completedDate: '2024-10',
    clientName: 'TechStore Inc.',
    testimonial: 'AlishbaTech delivered an exceptional platform that exceeded our expectations.',
  },
  {
    id: 2,
    title: 'Healthcare App',
    category: 'Mobile Development',
    description: 'HIPAA-compliant mobile application for patient management and telemedicine consultations.',
    longDescription: 'Developed a HIPAA-compliant healthcare application enabling secure patient-doctor consultations, appointment scheduling, medical records management, and prescription tracking.',
    image: '🏥',
    tags: ['React Native', 'Node.js', 'AWS'],
    featured: true,
    completedDate: '2024-09',
    clientName: 'HealthCare Plus',
    testimonial: 'The team delivered a secure and user-friendly healthcare solution.',
  },
  {
    id: 3,
    title: 'FinTech Dashboard',
    category: 'Web Application',
    description: 'Real-time financial analytics dashboard with advanced data visualization and reporting.',
    image: '📊',
    tags: ['React', 'D3.js', 'Python'],
    featured: true,
    completedDate: '2024-08',
    clientName: 'Finance Pro',
  },
  {
    id: 4,
    title: 'Social Media Platform',
    category: 'Full Stack',
    description: 'Scalable social networking platform with real-time messaging and content sharing.',
    image: '💬',
    tags: ['Next.js', 'WebSocket', 'MongoDB'],
    featured: false,
    completedDate: '2024-07',
    clientName: 'SocialConnect',
  },
  {
    id: 5,
    title: 'AI-Powered CRM',
    category: 'Enterprise Solution',
    description: 'Customer relationship management system with AI-driven insights and automation.',
    image: '🤖',
    tags: ['TypeScript', 'TensorFlow', 'GraphQL'],
    featured: true,
    completedDate: '2024-06',
    clientName: 'Enterprise Corp',
  },
  {
    id: 6,
    title: 'Learning Management System',
    category: 'EdTech',
    description: 'Comprehensive LMS with video streaming, assessments, and progress tracking.',
    image: '📚',
    tags: ['Next.js', 'Video.js', 'Firebase'],
    featured: false,
    completedDate: '2024-05',
    clientName: 'EduTech Solutions',
  },
];

// GET /api/projects - Get all projects with filters
router.get('/', (req, res) => {
  try {
    const { category, featured, limit } = req.query;
    let filteredProjects = [...projects];

    // Filter by category
    if (category) {
      filteredProjects = filteredProjects.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by featured status
    if (featured === 'true') {
      filteredProjects = filteredProjects.filter((p) => p.featured);
    }

    // Limit results
    if (limit) {
      const limitNum = parseInt(limit, 10);
      filteredProjects = filteredProjects.slice(0, limitNum);
    }

    res.json({
      success: true,
      count: filteredProjects.length,
      data: filteredProjects,
    });
  } catch (error) {
    console.error('Projects GET error:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// GET /api/projects/:id - Get single project
router.get('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const project = projects.find((p) => p.id === id);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error('Project GET error:', error);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// POST /api/projects - Create new project
router.post(
  '/',
  [
    body('title').notEmpty().trim().withMessage('Title is required'),
    body('category').notEmpty().trim().withMessage('Category is required'),
    body('description').notEmpty().trim().withMessage('Description is required'),
  ],
  (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: 'Validation failed',
          details: errors.array(),
        });
      }

      const { title, category, description, tags, featured } = req.body;

      const newProject = {
        id: projects.length + 1,
        title,
        category,
        description,
        image: '📁',
        tags: tags || [],
        featured: featured || false,
        completedDate: new Date().toISOString().slice(0, 7),
        clientName: 'New Client',
      };

      projects.push(newProject);

      res.status(201).json({
        success: true,
        message: 'Project created successfully',
        data: newProject,
      });
    } catch (error) {
      console.error('Project POST error:', error);
      res.status(500).json({ error: 'Failed to create project' });
    }
  }
);

// PUT /api/projects/:id - Update project
router.put('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const projectIndex = projects.findIndex((p) => p.id === id);

    if (projectIndex === -1) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const updatedProject = {
      ...projects[projectIndex],
      ...req.body,
      id, // Ensure ID doesn't change
    };

    projects[projectIndex] = updatedProject;

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: updatedProject,
    });
  } catch (error) {
    console.error('Project PUT error:', error);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// DELETE /api/projects/:id - Delete project
router.delete('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const projectIndex = projects.findIndex((p) => p.id === id);

    if (projectIndex === -1) {
      return res.status(404).json({ error: 'Project not found' });
    }

    projects.splice(projectIndex, 1);

    res.json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error) {
    console.error('Project DELETE error:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

module.exports = router;

