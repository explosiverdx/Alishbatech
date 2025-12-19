import '../styles/Hero.css';

export default function Hero() {
  return (
    <section id="home" className="hero">
      {/* Animated Background Elements */}
      <div className="hero-background">
        <div className="hero-bg-blob hero-bg-blob-1"></div>
        <div className="hero-bg-blob hero-bg-blob-2"></div>
        <div className="hero-bg-blob hero-bg-blob-3"></div>
      </div>

      <div className="hero-content">
        <div className="hero-inner">
          <h1 className="hero-title">
            Welcome to <span className="gradient">AlishbaTech</span>
          </h1>
          <p className="hero-subtitle">
            Transforming Ideas into Digital Reality with Cutting-Edge Technology Solutions
          </p>
          <p className="hero-description">
            We specialize in web development, mobile apps, cloud solutions, and digital transformation that drive business growth.
          </p>
          <div className="hero-buttons">
            <a href="#contact" className="hero-btn-primary">
              Get Started
            </a>
            <a href="#portfolio" className="hero-btn-secondary">
              View Our Work
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="hero-scroll-indicator">
          <svg
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  );
}
