import '../../styles/demos/DemoPage.css';

export default function UIUXDesignDemo() {
  return (
    <div className="demo-page">
      <div className="demo-hero">
        <h1>UI/UX Design Demo</h1>
        <p>Beautiful, intuitive interfaces designed with user-centered principles</p>
      </div>

      <div className="demo-content">
        <section className="demo-section">
          <h2>Design Process</h2>
          <div className="process-timeline">
            <div className="timeline-item">
              <div className="timeline-number">1</div>
              <div className="timeline-content">
                <h3>User Research</h3>
                <p>Understanding user needs, behaviors, and pain points</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-number">2</div>
              <div className="timeline-content">
                <h3>Wireframing</h3>
                <p>Creating low-fidelity layouts and information architecture</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-number">3</div>
              <div className="timeline-content">
                <h3>Prototyping</h3>
                <p>Interactive prototypes for user testing and validation</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-number">4</div>
              <div className="timeline-content">
                <h3>Visual Design</h3>
                <p>High-fidelity designs with branding and aesthetics</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-number">5</div>
              <div className="timeline-content">
                <h3>Usability Testing</h3>
                <p>Testing with real users and iterating based on feedback</p>
              </div>
            </div>
          </div>
        </section>

        <section className="demo-section">
          <h2>Design System Showcase</h2>
          <div className="design-system-demo">
            <div className="color-palette">
              <h3>Color Palette</h3>
              <div className="colors">
                <div className="color-swatch" style={{ backgroundColor: '#3b82f6' }}>Primary</div>
                <div className="color-swatch" style={{ backgroundColor: '#8b5cf6' }}>Secondary</div>
                <div className="color-swatch" style={{ backgroundColor: '#10b981' }}>Success</div>
                <div className="color-swatch" style={{ backgroundColor: '#ef4444' }}>Error</div>
                <div className="color-swatch" style={{ backgroundColor: '#f59e0b' }}>Warning</div>
              </div>
            </div>

            <div className="typography-demo">
              <h3>Typography</h3>
              <div className="type-sample">
                <h1 className="type-h1">Heading 1 - Bold & Impactful</h1>
                <h2 className="type-h2">Heading 2 - Clear Hierarchy</h2>
                <h3 className="type-h3">Heading 3 - Section Titles</h3>
                <p className="type-body">Body text - Readable and comfortable for long-form content</p>
                <p className="type-caption">Caption - Small text for labels and metadata</p>
              </div>
            </div>

            <div className="component-showcase">
              <h3>UI Components</h3>
              <div className="components-grid">
                <button className="demo-button primary">Primary Button</button>
                <button className="demo-button secondary">Secondary</button>
                <button className="demo-button outline">Outline</button>
                <input type="text" className="demo-input" placeholder="Text Input" />
                <select className="demo-select">
                  <option>Dropdown Menu</option>
                </select>
                <div className="demo-card-small">Card Component</div>
              </div>
            </div>
          </div>
        </section>

        <section className="demo-section">
          <h2>Interactive Prototype</h2>
          <div className="prototype-demo">
            <div className="prototype-frame">
              <div className="prototype-header">
                <div className="prototype-nav">
                  <span>Home</span>
                  <span>Products</span>
                  <span>About</span>
                  <span>Contact</span>
                </div>
              </div>
              <div className="prototype-content">
                <div className="prototype-hero">
                  <h2>Welcome to Our Platform</h2>
                  <p>Experience seamless design and intuitive interactions</p>
                  <button className="demo-button primary">Get Started</button>
                </div>
                <div className="prototype-cards">
                  <div className="prototype-card">Feature 1</div>
                  <div className="prototype-card">Feature 2</div>
                  <div className="prototype-card">Feature 3</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
