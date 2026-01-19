import '../../styles/demos/DemoPage.css';

export default function ELearningUIDemo() {
  return (
    <div className="demo-page" style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' }}>
      <div className="demo-hero">
        <h1>E-Learning Platform UI/UX Demo</h1>
        <p>Modern and intuitive design system for online education</p>
      </div>

      <div className="demo-content">
        <section className="demo-section">
          <h2>Design System - Color Palette</h2>
          <div className="color-showcase">
            <div className="color-group">
              <h3 style={{ marginBottom: '1rem' }}>Primary Colors</h3>
              <div className="colors">
                <div className="color-swatch" style={{ background: '#8b5cf6', width: '120px', height: '120px' }}>
                  <div style={{ color: 'white', padding: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>Primary</div>
                </div>
                <div className="color-swatch" style={{ background: '#7c3aed', width: '120px', height: '120px' }}>
                  <div style={{ color: 'white', padding: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>Primary Dark</div>
                </div>
                <div className="color-swatch" style={{ background: '#a78bfa', width: '120px', height: '120px' }}>
                  <div style={{ color: 'white', padding: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>Primary Light</div>
                </div>
              </div>
            </div>
            <div className="color-group">
              <h3 style={{ marginBottom: '1rem' }}>Semantic Colors</h3>
              <div className="colors">
                <div className="color-swatch" style={{ background: '#10b981', width: '120px', height: '120px' }}>
                  <div style={{ color: 'white', padding: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>Success</div>
                </div>
                <div className="color-swatch" style={{ background: '#ef4444', width: '120px', height: '120px' }}>
                  <div style={{ color: 'white', padding: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>Error</div>
                </div>
                <div className="color-swatch" style={{ background: '#f59e0b', width: '120px', height: '120px' }}>
                  <div style={{ color: 'white', padding: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>Warning</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="demo-section">
          <h2>Typography System</h2>
          <div className="typography-showcase">
            <div className="type-sample">
              <h1 className="type-h1" style={{ fontSize: '3rem' }}>Heading 1 - Bold & Impactful</h1>
              <h2 className="type-h2" style={{ fontSize: '2.25rem' }}>Heading 2 - Clear Hierarchy</h2>
              <h3 className="type-h3" style={{ fontSize: '1.875rem' }}>Heading 3 - Section Titles</h3>
              <h4 style={{ fontSize: '1.5rem', fontWeight: 600, marginTop: '1rem' }}>Heading 4 - Subsection</h4>
              <p className="type-body" style={{ fontSize: '1.125rem', marginTop: '1rem' }}>
                Body text - Readable and comfortable for long-form content. This typeface is optimized for 
                extended reading sessions and maintains excellent legibility across all screen sizes.
              </p>
              <p className="type-caption" style={{ marginTop: '1rem' }}>
                Caption - Small text for labels, metadata, and supplementary information
              </p>
            </div>
          </div>
        </section>

        <section className="demo-section">
          <h2>UI Components</h2>
          <div className="components-showcase">
            <div className="component-group">
              <h3 style={{ marginBottom: '1rem' }}>Buttons</h3>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button className="demo-button primary">Primary Button</button>
                <button className="demo-button secondary">Secondary Button</button>
                <button className="demo-button outline">Outline Button</button>
                <button style={{ padding: '0.75rem 1.5rem', background: 'transparent', border: 'none', color: '#8b5cf6', cursor: 'pointer', fontWeight: 600 }}>Text Button</button>
              </div>
            </div>
            <div className="component-group" style={{ marginTop: '2rem' }}>
              <h3 style={{ marginBottom: '1rem' }}>Form Elements</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
                <input type="text" className="demo-input" placeholder="Text Input" />
                <select className="demo-select">
                  <option>Dropdown Menu</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                </select>
                <textarea className="demo-input" placeholder="Textarea" style={{ minHeight: '100px', resize: 'vertical' }}></textarea>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" />
                  <span>Checkbox Option</span>
                </label>
              </div>
            </div>
            <div className="component-group" style={{ marginTop: '2rem' }}>
              <h3 style={{ marginBottom: '1rem' }}>Cards</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div className="demo-card-small" style={{ padding: '1.5rem' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📚</div>
                  <h4 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Course Card</h4>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Interactive course preview</p>
                </div>
                <div className="demo-card-small" style={{ padding: '1.5rem' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👤</div>
                  <h4 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Profile Card</h4>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>User information display</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="demo-section">
          <h2>Course Page Mockup</h2>
          <div className="mockup-frame">
            <div style={{ padding: '2rem', background: '#f9fafb', borderRadius: '0.5rem' }}>
              <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.875rem', color: '#8b5cf6', fontWeight: 600, marginBottom: '0.5rem' }}>COURSE</div>
                  <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>Introduction to React</h2>
                  <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
                    Learn the fundamentals of React including components, state management, and hooks.
                  </p>
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>⭐ 4.8 (1,245 reviews)</span>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>👥 5,432 students</span>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>⏱️ 8 hours</span>
                  </div>
                  <button className="demo-button primary" style={{ fontSize: '1.125rem', padding: '1rem 2rem' }}>
                    Enroll Now - $49.99
                  </button>
                </div>
                <div style={{ width: '300px', height: '200px', background: '#e5e7eb', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>
                  🎥
                </div>
              </div>
              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '2rem' }}>
                <h3 style={{ fontWeight: 600, marginBottom: '1rem' }}>What you'll learn</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                  {['React Components', 'State Management', 'Hooks API', 'Context API', 'Performance', 'Best Practices'].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: '#10b981' }}>✓</span>
                      <span style={{ fontSize: '0.875rem' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
