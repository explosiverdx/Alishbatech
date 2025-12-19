import '../styles/About.css';

export default function About() {

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

        {/* Detailed About Content */}
        <div className="about-content">
          <div className="about-text">
            <p className="about-paragraph">
              At <strong>AlishbaTech</strong>, we believe technology should empower businesses to reach their full potential. 
              We're not just developers—we're your strategic partners in navigating the ever-evolving digital landscape.
            </p>
            <p className="about-paragraph">
              Our expertise spans cutting-edge web applications, mobile solutions, cloud infrastructure, and AI-driven 
              innovations. Whether you're a startup looking to make your mark or an established enterprise seeking 
              digital transformation, we craft tailor-made solutions that align with your unique business objectives.
            </p>
            <p className="about-paragraph">
              What sets us apart is our commitment to excellence, transparent communication, and a client-centric approach 
              that ensures your vision becomes reality. We combine technical prowess with creative thinking to deliver 
              solutions that don't just work—they thrive.
            </p>
          </div>
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
