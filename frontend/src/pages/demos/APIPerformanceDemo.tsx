import '../../styles/demos/DemoPage.css';

export default function APIPerformanceDemo() {
  return (
    <div className="demo-page" style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' }}>
      <div className="demo-hero">
        <h1>API Performance Optimization Demo</h1>
        <p>Optimized REST API reducing response time by 75% and handling 10x more traffic</p>
      </div>
      <div className="demo-content">
        <section className="demo-section">
          <h2>Performance Metrics</h2>
          <div className="demo-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            <div className="demo-card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚡</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#10b981' }}>25ms</div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Avg Response Time</div>
              <div style={{ fontSize: '0.75rem', color: '#10b981', marginTop: '0.5rem' }}>↓ 75% improvement</div>
            </div>
            <div className="demo-card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📊</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#3b82f6' }}>10,000</div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Requests/sec</div>
              <div style={{ fontSize: '0.75rem', color: '#10b981', marginTop: '0.5rem' }}>↑ 10x capacity</div>
            </div>
            <div className="demo-card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💾</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f59e0b' }}>94%</div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Cache Hit Rate</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
