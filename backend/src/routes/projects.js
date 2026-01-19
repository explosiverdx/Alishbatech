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
    demoUrl: '/demo/ecommerce-platform',
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
    demoUrl: '/demo/healthcare-app',
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
    demoUrl: '/demo/fintech-dashboard',
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
    demoUrl: '/demo/social-media-platform',
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
    demoUrl: '/demo/ai-powered-crm',
  },
  {
    id: 6,
    title: 'Learning Management System',
    category: 'EdTech',
    description: 'Comprehensive LMS with video streaming, assessments, and progress tracking.',
    longDescription: 'Developed a full-featured learning management system with live video streaming, interactive assessments, progress analytics, and certificate generation.',
    image: '📚',
    tags: ['Next.js', 'Video.js', 'Firebase'],
    featured: false,
    completedDate: '2024-05',
    clientName: 'EduTech Solutions',
    demoUrl: '/demo/learning-management-system',
  },
  {
    id: 7,
    title: 'Food Delivery App',
    category: 'Mobile Development',
    description: 'On-demand food delivery application with real-time tracking and multiple payment options.',
    longDescription: 'Built a comprehensive food delivery platform with real-time order tracking, GPS integration, multiple payment gateways, restaurant management dashboard, and customer loyalty program.',
    image: '🍔',
    tags: ['Flutter', 'Firebase', 'Stripe', 'Google Maps'],
    featured: true,
    completedDate: '2024-11',
    clientName: 'Foodie Express',
    testimonial: 'The app has transformed our business operations and customer experience.',
    demoUrl: '/demo/food-delivery-app',
  },
  {
    id: 8,
    title: 'Real Estate Portal',
    category: 'Web Development',
    description: 'Advanced property listing platform with virtual tours and AI-powered recommendations.',
    longDescription: 'Created a sophisticated real estate platform featuring 360° virtual property tours, AI-powered property recommendations, mortgage calculator, neighborhood insights, and advanced search filters.',
    image: '🏠',
    tags: ['React', 'Three.js', 'Node.js', 'PostgreSQL'],
    featured: true,
    completedDate: '2024-10',
    clientName: 'PropertyHub',
    testimonial: 'Outstanding platform that significantly increased our property sales.',
    demoUrl: '/demo/real-estate-portal',
  },
  {
    id: 9,
    title: 'Fitness Tracking App',
    category: 'Mobile Development',
    description: 'Comprehensive fitness and wellness app with workout plans and progress analytics.',
    longDescription: 'Developed a feature-rich fitness application with personalized workout plans, nutrition tracking, progress analytics, social features, and integration with wearable devices.',
    image: '💪',
    tags: ['React Native', 'Redux', 'MongoDB', 'Chart.js'],
    featured: false,
    completedDate: '2024-09',
    clientName: 'FitLife',
    demoUrl: '/demo/fitness-tracking-app',
  },
  {
    id: 10,
    title: 'Cloud Migration Solution',
    category: 'Cloud Solutions',
    description: 'Seamless migration of legacy systems to AWS with zero downtime.',
    longDescription: 'Executed a comprehensive cloud migration strategy, moving enterprise applications from on-premise infrastructure to AWS with zero downtime, implementing auto-scaling, load balancing, and disaster recovery.',
    image: '☁️',
    tags: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
    featured: true,
    completedDate: '2024-08',
    clientName: 'TechCorp Global',
    testimonial: 'The migration was flawless and improved our system performance by 300%.',
    demoUrl: '/demo/cloud-migration-solution',
  },
  {
    id: 11,
    title: 'E-Learning Platform UI/UX',
    category: 'UI/UX Design',
    description: 'Modern and intuitive design system for an online education platform.',
    longDescription: 'Designed a complete design system and user interface for an e-learning platform, including user research, wireframing, prototyping, and usability testing. Created a cohesive visual identity and improved user engagement by 250%.',
    image: '🎨',
    tags: ['Figma', 'Adobe XD', 'Design Systems', 'User Research'],
    featured: true,
    completedDate: '2024-07',
    clientName: 'LearnHub',
    testimonial: 'The design significantly improved our user retention and satisfaction rates.',
    demoUrl: '/demo/e-learning-platform-ui',
  },
  {
    id: 12,
    title: 'E-Commerce Performance Optimization',
    category: 'Performance Optimization',
    description: 'Optimized e-commerce site achieving 95+ Lighthouse score and 60% faster load times.',
    longDescription: 'Performed comprehensive performance optimization including code splitting, image optimization, lazy loading, database query optimization, CDN implementation, and caching strategies. Reduced load time from 4.2s to 0.8s.',
    image: '⚡',
    tags: ['Next.js', 'Redis', 'CDN', 'Webpack'],
    featured: false,
    completedDate: '2024-06',
    clientName: 'ShopFast',
    demoUrl: '/demo/ecommerce-performance-optimization',
  },
  {
    id: 13,
    title: 'Banking Security System',
    category: 'Security & Maintenance',
    description: 'Enterprise-grade security implementation with 24/7 monitoring and threat detection.',
    longDescription: 'Implemented comprehensive security measures including SSL/TLS encryption, two-factor authentication, fraud detection algorithms, security audits, penetration testing, and 24/7 monitoring with automated threat response.',
    image: '🔒',
    tags: ['Security', 'AWS', 'Monitoring', 'Compliance'],
    featured: true,
    completedDate: '2024-05',
    clientName: 'SecureBank',
    testimonial: 'Our security posture improved dramatically with zero breaches since implementation.',
    demoUrl: '/demo/banking-security-system',
  },
  {
    id: 14,
    title: 'Task Management SaaS',
    category: 'Web Application',
    description: 'Collaborative project management tool with real-time updates and team collaboration.',
    longDescription: 'Built a comprehensive SaaS project management platform with real-time collaboration, task assignment, time tracking, reporting dashboards, integrations with popular tools, and team workspaces.',
    image: '📋',
    tags: ['Vue.js', 'Node.js', 'PostgreSQL', 'Socket.io'],
    featured: false,
    completedDate: '2024-04',
    clientName: 'TaskFlow',
    demoUrl: '/demo/task-management',
  },
  {
    id: 15,
    title: 'Travel Booking Platform',
    category: 'Web Development',
    description: 'Full-featured travel booking system with hotel, flight, and car rental integration.',
    longDescription: 'Developed a complete travel booking platform integrating multiple APIs for flights, hotels, and car rentals. Features include price comparison, booking management, payment processing, and customer reviews.',
    image: '✈️',
    tags: ['Next.js', 'Express', 'MongoDB', 'Payment Gateway'],
    featured: true,
    completedDate: '2024-03',
    clientName: 'TravelWise',
    testimonial: 'The platform has become our competitive advantage in the market.',
    demoUrl: '/demo/travel-booking-platform',
  },
  {
    id: 16,
    title: 'IoT Dashboard',
    category: 'Cloud Solutions',
    description: 'Real-time IoT device monitoring and control dashboard with analytics.',
    longDescription: 'Created a comprehensive IoT dashboard for monitoring and controlling connected devices. Features include real-time data visualization, device management, alert systems, historical analytics, and automated responses.',
    image: '📡',
    tags: ['React', 'MQTT', 'AWS IoT', 'Grafana'],
    featured: false,
    completedDate: '2024-02',
    clientName: 'SmartHome Solutions',
    demoUrl: '/demo/iot-dashboard',
  },
  {
    id: 17,
    title: 'Healthcare UI Redesign',
    category: 'UI/UX Design',
    description: 'Complete redesign of patient portal with improved accessibility and user experience.',
    longDescription: 'Redesigned a healthcare patient portal focusing on accessibility, user experience, and compliance. Conducted extensive user research, created wireframes and prototypes, and implemented a design system that improved patient satisfaction scores by 180%.',
    image: '🏥',
    tags: ['UI/UX', 'Accessibility', 'Healthcare', 'Design Systems'],
    featured: true,
    completedDate: '2024-01',
    clientName: 'MedCare Network',
    testimonial: 'The redesign made our platform more accessible and user-friendly.',
    demoUrl: '/demo/healthcare-ui-redesign',
  },
  {
    id: 18,
    title: 'API Performance Optimization',
    category: 'Performance Optimization',
    description: 'Optimized REST API reducing response time by 75% and handling 10x more traffic.',
    longDescription: 'Optimized a high-traffic REST API through database query optimization, caching strategies, connection pooling, API rate limiting, and microservices architecture. Achieved 75% reduction in response time and 10x increase in throughput.',
    image: '🚀',
    tags: ['Node.js', 'Redis', 'PostgreSQL', 'Microservices'],
    featured: false,
    completedDate: '2023-12',
    clientName: 'APIGateway Inc.',
    demoUrl: '/demo/api-performance-optimization',
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

