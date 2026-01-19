import '../../styles/demos/DemoPage.css';

export default function PerformanceOptimizationDemo() {
  const beforeAfter = [
    { metric: 'Load Time', before: '4.2s', after: '0.8s', improvement: '81%' },
    { metric: 'First Contentful Paint', before: '2.8s', after: '0.4s', improvement: '86%' },
    { metric: 'Time to Interactive', before: '5.1s', after: '1.2s', improvement: '76%' },
    { metric: 'Lighthouse Score', before: '45/100', after: '98/100', improvement: '118%' },
  ];

  const optimizations = [
    { technique: 'Code Splitting', impact: 'High', status: '✓ Implemented' },
    { technique: 'Image Optimization', impact: 'High', status: '✓ Implemented' },
    { technique: 'Lazy Loading', impact: 'Medium', status: '✓ Implemented' },
    { technique: 'CDN Implementation', impact: 'High', status: '✓ Implemented' },
    { technique: 'Database Query Optimization', impact: 'High', status: '✓ Implemented' },
    { technique: 'Caching Strategy', impact: 'Medium', status: '✓ Implemented' },
  ];

  return (
    <div className="demo-page" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
      <div className="demo-hero">
        <h1>E-Commerce Performance Optimization Demo</h1>
        <p>Optimized e-commerce site achieving 95+ Lighthouse score and 60% faster load times</p>
      </div>

      <div className="demo-content">
        <section className="demo-section">
          <h2>Before & After Comparison</h2>
          <div className="comparison-table">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600 }}>Metric</th>
                  <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 600, color: '#ef4444' }}>Before</th>
                  <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 600, color: '#10b981' }}>After</th>
                  <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 600 }}>Improvement</th>
                </tr>
              </thead>
              <tbody>
                {beforeAfter.map((item, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '1rem', fontWeight: 600 }}>{item.metric}</td>
                    <td style={{ padding: '1rem', textAlign: 'center', color: '#ef4444', fontWeight: 600 }}>{item.before}</td>
                    <td style={{ padding: '1rem', textAlign: 'center', color: '#10b981', fontWeight: 600 }}>{item.after}</td>
                    <td style={{ padding: '1rem', textAlign: 'center', fontWeight: 700, color: '#10b981' }}>{item.improvement}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="demo-section">
          <h2>Core Web Vitals</h2>
          <div className="vitals-showcase">
            <div className="vital-card">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡</div>
              <h3>LCP</h3>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#10b981', marginBottom: '0.5rem' }}>0.8s</div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Largest Contentful Paint</div>
              <div style={{ marginTop: '0.5rem', padding: '0.25rem 0.75rem', background: '#d1fae5', color: '#059669', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 600, display: 'inline-block' }}>
                Excellent
              </div>
            </div>
            <div className="vital-card">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👆</div>
              <h3>FID</h3>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#10b981', marginBottom: '0.5rem' }}>12ms</div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>First Input Delay</div>
              <div style={{ marginTop: '0.5rem', padding: '0.25rem 0.75rem', background: '#d1fae5', color: '#059669', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 600, display: 'inline-block' }}>
                Excellent
              </div>
            </div>
            <div className="vital-card">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📐</div>
              <h3>CLS</h3>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#10b981', marginBottom: '0.5rem' }}>0.02</div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Cumulative Layout Shift</div>
              <div style={{ marginTop: '0.5rem', padding: '0.25rem 0.75rem', background: '#d1fae5', color: '#059669', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 600, display: 'inline-block' }}>
                Excellent
              </div>
            </div>
          </div>
        </section>

        <section className="demo-section">
          <h2>Optimization Techniques Applied</h2>
          <div className="optimization-list">
            {optimizations.map((opt, index) => (
              <div key={index} className="optimization-item">
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                    <h4 style={{ fontWeight: 600 }}>{opt.technique}</h4>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      background: opt.impact === 'High' ? '#fee2e2' : '#fef3c7',
                      color: opt.impact === 'High' ? '#dc2626' : '#d97706'
                    }}>
                      {opt.impact} Impact
                    </span>
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    {opt.technique === 'Code Splitting' && 'Reduced initial bundle from 450KB to 120KB'}
                    {opt.technique === 'Image Optimization' && 'WebP format reduced image sizes by 70%'}
                    {opt.technique === 'Lazy Loading' && 'Deferred loading of below-fold content'}
                    {opt.technique === 'CDN Implementation' && 'Global CDN reduced latency by 60%'}
                    {opt.technique === 'Database Query Optimization' && 'Query time reduced from 450ms to 25ms'}
                    {opt.technique === 'Caching Strategy' && '94% cache hit rate for static assets'}
                  </div>
                </div>
                <div style={{ color: '#10b981', fontWeight: 600 }}>{opt.status}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="demo-section">
          <h2>Performance Timeline</h2>
          <div className="timeline-demo">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ width: '100px', fontSize: '0.875rem', color: '#6b7280' }}>0ms</div>
              <div style={{ flex: 1, height: '4px', background: '#e5e7eb', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '10%', top: '-6px', width: '12px', height: '12px', background: '#10b981', borderRadius: '50%' }}></div>
                <div style={{ position: 'absolute', left: '10%', top: '16px', fontSize: '0.75rem', color: '#6b7280', whiteSpace: 'nowrap' }}>FCP: 0.4s</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ width: '100px', fontSize: '0.875rem', color: '#6b7280' }}>400ms</div>
              <div style={{ flex: 1, height: '4px', background: '#e5e7eb', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '20%', top: '-6px', width: '12px', height: '12px', background: '#10b981', borderRadius: '50%' }}></div>
                <div style={{ position: 'absolute', left: '20%', top: '16px', fontSize: '0.75rem', color: '#6b7280', whiteSpace: 'nowrap' }}>LCP: 0.8s</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '100px', fontSize: '0.875rem', color: '#6b7280' }}>800ms</div>
              <div style={{ flex: 1, height: '4px', background: '#e5e7eb', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '30%', top: '-6px', width: '12px', height: '12px', background: '#10b981', borderRadius: '50%' }}></div>
                <div style={{ position: 'absolute', left: '30%', top: '16px', fontSize: '0.75rem', color: '#6b7280', whiteSpace: 'nowrap' }}>TTI: 1.2s</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
