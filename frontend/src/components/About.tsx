import '../styles/About.css';

export default function About() {
  const stats = [
    { number: '100+', label: 'Projects Completed' },
    { number: '50+', label: 'Happy Clients' },
    { number: '5+', label: 'Years Experience' },
    { number: '24/7', label: 'Support Available' },
  ];

  const features = [
    {
      icon: '⚡',
      title: 'Fast Delivery',
      description: 'Agile development process ensuring quick turnaround times without compromising quality.',
    },
    {
      icon: '🎯',
      title: 'Client-Focused',
      description: 'Your success is our priority. We work closely with you every step of the way.',
    },
    {
      icon: '🔧',
      title: 'Expert Team',
      description: 'Skilled developers, designers, and strategists dedicated to your project.',
    },
    {
      icon: '🌟',
      title: 'Quality Assured',
      description: 'Rigorous testing and quality control to deliver flawless solutions.',
    },
  ];

  return (
    <section id="about" className="about">
      <div className="about-container">
        <div className="about-header">
          <h2 className="about-title">About AlishbaTech</h2>
          <p className="about-subtitle">
            We are a team of passionate technologists committed to building innovative solutions 
            that drive business growth and digital transformation.
          </p>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="mission">
          <h3 className="mission-title">Our Mission</h3>
          <p className="mission-text">
            To empower businesses with innovative technology solutions that create lasting value, 
            enhance user experiences, and drive sustainable growth in the digital age.
          </p>
        </div>
      </div>
    </section>
  );
}
