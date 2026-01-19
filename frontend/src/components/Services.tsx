import { useState, useEffect } from 'react';
import { servicesAPI } from '../lib/api';
import '../styles/Services.css';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  demoUrl?: string;
}

// Icon mapping function
const getIcon = (iconName: string) => {
  const icons: { [key: string]: JSX.Element } = {
    desktop: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    mobile: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    cloud: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    design: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
      </svg>
    ),
    speed: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    security: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  };
  return icons[iconName] || icons.desktop;
};

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  demoUrl: string;
  serviceTitle: string;
}

function DemoModal({ isOpen, onClose, demoUrl, serviceTitle }: DemoModalProps) {
  if (!isOpen) return null;

  // Construct full URL for iframe (relative URLs work, but full URL is safer)
  const fullUrl = demoUrl.startsWith('http') 
    ? demoUrl 
    : `${window.location.origin}${demoUrl.startsWith('/') ? '' : '/'}${demoUrl}`;

  return (
    <div className="demo-modal-overlay" onClick={onClose}>
      <div className="demo-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="demo-modal-header">
          <h3 className="demo-modal-title">{serviceTitle} Demo</h3>
          <button className="demo-modal-close" onClick={onClose} aria-label="Close">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="24" height="24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="demo-modal-body">
          <iframe
            src={fullUrl}
            className="demo-iframe"
            title={`${serviceTitle} Demo`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <div className="demo-modal-footer">
            <a
              href={fullUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="demo-external-link"
            >
              Open in New Tab
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDemo, setSelectedDemo] = useState<{ url: string; title: string } | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await servicesAPI.getAll();
      if (response.success) {
        setServices(response.data);
      } else {
        setError('Failed to load services');
      }
    } catch (err) {
      console.error('Error fetching services:', err);
      setError('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoClick = (demoUrl: string, title: string) => {
    setSelectedDemo({ url: demoUrl, title });
  };

  const handleCloseDemo = () => {
    setSelectedDemo(null);
  };

  if (loading) {
    return (
      <section id="services" className="services">
        <div className="services-container">
          <div className="services-loading">
            <div className="loading-spinner"></div>
            <p>Loading services...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="services" className="services">
        <div className="services-container">
          <div className="services-error">
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="services" className="services">
        <div className="services-container">
          <div className="services-header">
            <h2 className="services-title">Our Services</h2>
            <p className="services-subtitle">
              Comprehensive technology solutions tailored to your business needs
            </p>
          </div>

          <div className="services-grid">
            {services.map((service) => (
              <div key={service.id} className="service-card">
                <div className="service-icon">{getIcon(service.icon)}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                {service.demoUrl && (
                  <button
                    className="service-demo-button"
                    onClick={() => handleDemoClick(service.demoUrl!, service.title)}
                  >
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    View Demo
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedDemo && (
        <DemoModal
          isOpen={!!selectedDemo}
          onClose={handleCloseDemo}
          demoUrl={selectedDemo.url}
          serviceTitle={selectedDemo.title}
        />
      )}
    </>
  );
}
