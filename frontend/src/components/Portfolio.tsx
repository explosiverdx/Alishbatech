import { useState, useEffect } from 'react';
import '../styles/Portfolio.css';
import { projectsAPI } from '../lib/api';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  featured?: boolean;
  demoUrl?: string;
}

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await projectsAPI.getAll();
      if (response.success) {
        setProjects(response.data);
      } else {
        setError('Failed to load projects');
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="portfolio" className="portfolio">
        <div className="portfolio-container">
          <div className="portfolio-header">
            <h2 className="portfolio-title">Our Portfolio</h2>
            <p className="portfolio-subtitle">
              Showcasing our latest projects and success stories
            </p>
          </div>
          <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
            <div className="loading-spinner" style={{ 
              width: '3rem', 
              height: '3rem', 
              border: '4px solid #e5e7eb', 
              borderTopColor: '#3b82f6', 
              borderRadius: '50%', 
              animation: 'spin 1s linear infinite',
              margin: '0 auto 1rem'
            }}></div>
            <p style={{ color: '#4b5563' }}>Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="portfolio" className="portfolio">
        <div className="portfolio-container">
          <div className="portfolio-header">
            <h2 className="portfolio-title">Our Portfolio</h2>
            <p className="portfolio-subtitle">
              Showcasing our latest projects and success stories
            </p>
          </div>
          <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#ef4444' }}>
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

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
          {projects.map((project) => (
            <div key={project.id} className="project-card">
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
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    className="service-demo-button"
                    style={{ marginTop: '1rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    View Demo
                  </a>
                )}
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
