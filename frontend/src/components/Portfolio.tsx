import '../styles/Portfolio.css';

export default function Portfolio() {
  const projects = [
    {
      title: 'E-Commerce Platform',
      category: 'Web Development',
      description: 'A modern e-commerce solution with real-time inventory management and seamless checkout experience.',
      image: '🛒',
      tags: ['Next.js', 'Stripe', 'PostgreSQL'],
    },
    {
      title: 'Healthcare App',
      category: 'Mobile Development',
      description: 'HIPAA-compliant mobile application for patient management and telemedicine consultations.',
      image: '🏥',
      tags: ['React Native', 'Node.js', 'AWS'],
    },
    {
      title: 'FinTech Dashboard',
      category: 'Web Application',
      description: 'Real-time financial analytics dashboard with advanced data visualization and reporting.',
      image: '📊',
      tags: ['React', 'D3.js', 'Python'],
    },
    {
      title: 'Social Media Platform',
      category: 'Full Stack',
      description: 'Scalable social networking platform with real-time messaging and content sharing.',
      image: '💬',
      tags: ['Next.js', 'WebSocket', 'MongoDB'],
    },
    {
      title: 'AI-Powered CRM',
      category: 'Enterprise Solution',
      description: 'Customer relationship management system with AI-driven insights and automation.',
      image: '🤖',
      tags: ['TypeScript', 'TensorFlow', 'GraphQL'],
    },
    {
      title: 'Learning Management System',
      category: 'EdTech',
      description: 'Comprehensive LMS with video streaming, assessments, and progress tracking.',
      image: '📚',
      tags: ['Next.js', 'Video.js', 'Firebase'],
    },
  ];

  return (
    <section id="portfolio" className="portfolio">
      <div className="portfolio-container">
        <div className="portfolio-header">
          <h2 className="portfolio-title">Our Portfolio</h2>
          <p className="portfolio-subtitle">
            Showcasing our latest projects and success stories
          </p>
        </div>

        <div className="portfolio-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-content">
                <div className="project-image">{project.image}</div>
                <div className="project-category">{project.category}</div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="project-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="project-border"></div>
            </div>
          ))}
        </div>

        <div className="portfolio-cta">
          <a href="#contact" className="portfolio-cta-btn">
            Start Your Project
          </a>
        </div>
      </div>
    </section>
  );
}
