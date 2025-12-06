const express = require('express');
const router = express.Router();

// GET /api/services - Get all services
router.get('/', (req, res) => {
  try {
    const services = [
      {
        id: 1,
        title: 'Web Development',
        description: 'Custom websites and web applications built with modern frameworks like Next.js, React, and Node.js for optimal performance and user experience.',
        icon: 'desktop',
        price: 'Starting at $5,000',
        duration: '4-8 weeks',
        features: [
          'Responsive Design',
          'SEO Optimization',
          'Performance Tuning',
          'Cross-browser Compatibility',
          'API Integration',
        ],
      },
      {
        id: 2,
        title: 'Mobile Apps',
        description: 'Native and cross-platform mobile applications for iOS and Android that deliver seamless experiences across all devices.',
        icon: 'mobile',
        price: 'Starting at $8,000',
        duration: '8-12 weeks',
        features: [
          'iOS & Android Development',
          'Cross-platform Solutions',
          'App Store Deployment',
          'Push Notifications',
          'Offline Functionality',
        ],
      },
      {
        id: 3,
        title: 'Cloud Solutions',
        description: 'Scalable cloud infrastructure and deployment solutions using AWS, Azure, and Google Cloud for reliable and secure operations.',
        icon: 'cloud',
        price: 'Starting at $3,000',
        duration: '2-4 weeks',
        features: [
          'Cloud Migration',
          'Infrastructure Setup',
          'Auto-scaling Configuration',
          'Security Implementation',
          'Cost Optimization',
        ],
      },
      {
        id: 4,
        title: 'UI/UX Design',
        description: 'Beautiful, intuitive interfaces designed with user-centered principles to create engaging digital experiences.',
        icon: 'design',
        price: 'Starting at $2,500',
        duration: '2-4 weeks',
        features: [
          'User Research',
          'Wireframing & Prototyping',
          'Visual Design',
          'Usability Testing',
          'Design Systems',
        ],
      },
      {
        id: 5,
        title: 'Performance Optimization',
        description: 'Speed optimization, SEO, and performance tuning to ensure your digital products run at peak efficiency.',
        icon: 'speed',
        price: 'Starting at $1,500',
        duration: '1-2 weeks',
        features: [
          'Speed Optimization',
          'SEO Improvement',
          'Code Refactoring',
          'Database Optimization',
          'Performance Monitoring',
        ],
      },
      {
        id: 6,
        title: 'Security & Maintenance',
        description: 'Comprehensive security audits, regular updates, and ongoing maintenance to keep your systems safe and up-to-date.',
        icon: 'security',
        price: 'Starting at $500/month',
        duration: 'Ongoing',
        features: [
          'Security Audits',
          'Regular Updates',
          'Bug Fixes',
          'Monitoring & Alerts',
          'Backup Solutions',
        ],
      },
    ];

    res.json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error) {
    console.error('Services GET error:', error);
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

module.exports = router;

