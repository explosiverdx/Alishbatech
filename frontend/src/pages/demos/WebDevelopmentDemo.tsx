import '../../styles/demos/DemoPage.css';

export default function WebDevelopmentDemo() {
  return (
    <div className="demo-page">
      <div className="demo-hero">
        <h1>Web Development Demo</h1>
        <p>Experience our modern web development capabilities</p>
      </div>

      <div className="demo-content">
        <section className="demo-section">
          <h2>Interactive Features Showcase</h2>
          <div className="demo-grid">
            <div className="demo-card">
              <div className="demo-card-icon">📱</div>
              <h3>Responsive Design</h3>
              <p>Try resizing this window to see responsive behavior</p>
              <div className="responsive-demo">
                <div className="device-mockup mobile">Mobile View</div>
                <div className="device-mockup tablet">Tablet View</div>
                <div className="device-mockup desktop">Desktop View</div>
              </div>
            </div>

            <div className="demo-card">
              <div className="demo-card-icon">⚡</div>
              <h3>Performance Metrics</h3>
              <div className="metrics-demo">
                <div className="metric">
                  <span className="metric-label">Load Time</span>
                  <span className="metric-value">0.8s</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Lighthouse Score</span>
                  <span className="metric-value">98/100</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Core Web Vitals</span>
                  <span className="metric-value">Pass</span>
                </div>
              </div>
            </div>

            <div className="demo-card">
              <div className="demo-card-icon">🎨</div>
              <h3>Modern UI Components</h3>
              <div className="component-demo">
                <button className="demo-button primary">Primary Button</button>
                <button className="demo-button secondary">Secondary Button</button>
                <input type="text" className="demo-input" placeholder="Input field" />
                <div className="demo-card-small">Card Component</div>
              </div>
            </div>
          </div>
        </section>

        <section className="demo-section">
          <h2>Technology Stack</h2>
          <div className="tech-stack">
            <div className="tech-item">
              <span className="tech-name">React</span>
              <div className="tech-bar">
                <div className="tech-progress" style={{ width: '95%' }}></div>
              </div>
            </div>
            <div className="tech-item">
              <span className="tech-name">Next.js</span>
              <div className="tech-bar">
                <div className="tech-progress" style={{ width: '90%' }}></div>
              </div>
            </div>
            <div className="tech-item">
              <span className="tech-name">Node.js</span>
              <div className="tech-bar">
                <div className="tech-progress" style={{ width: '88%' }}></div>
              </div>
            </div>
            <div className="tech-item">
              <span className="tech-name">TypeScript</span>
              <div className="tech-bar">
                <div className="tech-progress" style={{ width: '92%' }}></div>
              </div>
            </div>
          </div>
        </section>

        <section className="demo-section">
          <h2>Live Code Example</h2>
          <div className="code-demo">
            <pre className="code-block">
{`// Modern React Component
import { useState, useEffect } from 'react';

function WebApp() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData);
  }, []);
  
  return (
    <div className="app">
      {data.map(item => (
        <Card key={item.id} {...item} />
      ))}
    </div>
  );
}`}
            </pre>
          </div>
        </section>
      </div>
    </div>
  );
}
