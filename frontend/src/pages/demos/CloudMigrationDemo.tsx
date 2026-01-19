import '../../styles/demos/DemoPage.css';

export default function CloudMigrationDemo() {
  const services = [
    { name: 'Web Server', status: 'Migrated', progress: 100, instances: 3 },
    { name: 'Database', status: 'Migrating', progress: 75, instances: 2 },
    { name: 'Cache Layer', status: 'Migrated', progress: 100, instances: 5 },
    { name: 'File Storage', status: 'Pending', progress: 0, instances: 1 },
  ];

  const metrics = [
    { label: 'Uptime', value: '99.98%', change: '+0.5%' },
    { label: 'Response Time', value: '45ms', change: '-60%' },
    { label: 'Cost Savings', value: '$2,400/mo', change: '-44%' },
    { label: 'Scalability', value: 'Auto', change: 'Enabled' },
  ];

  return (
    <div className="demo-page" style={{ background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)' }}>
      <div className="demo-hero">
        <h1>Cloud Migration Solution Demo</h1>
        <p>Seamless migration of legacy systems to AWS with zero downtime</p>
      </div>

      <div className="demo-content">
        <section className="demo-section">
          <h2>Migration Status</h2>
          <div className="migration-services">
            {services.map((service, index) => (
              <div key={index} className="migration-item">
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <h4 style={{ fontWeight: 600 }}>{service.name}</h4>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      background: service.status === 'Migrated' ? '#d1fae5' : service.status === 'Migrating' ? '#fef3c7' : '#fee2e2',
                      color: service.status === 'Migrated' ? '#059669' : service.status === 'Migrating' ? '#d97706' : '#dc2626'
                    }}>
                      {service.status}
                    </span>
                  </div>
                  <div style={{ marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                      <span style={{ color: '#6b7280' }}>Progress</span>
                      <span style={{ fontWeight: 600 }}>{service.progress}%</span>
                    </div>
                    <div style={{ height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ 
                        height: '100%', 
                        width: `${service.progress}%`, 
                        background: service.status === 'Migrated' ? 'linear-gradient(90deg, #10b981, #059669)' : 
                                   service.status === 'Migrating' ? 'linear-gradient(90deg, #f59e0b, #d97706)' : '#e5e7eb',
                        borderRadius: '4px'
                      }}></div>
                    </div>
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Instances: {service.instances}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="demo-section">
          <h2>Performance Metrics</h2>
          <div className="demo-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            {metrics.map((metric, index) => (
              <div key={index} className="demo-card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>{metric.label}</div>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#111827', marginBottom: '0.5rem' }}>
                  {metric.value}
                </div>
                <div style={{ 
                  color: metric.change.startsWith('-') ? '#10b981' : '#3b82f6',
                  fontWeight: 600,
                  fontSize: '0.875rem'
                }}>
                  {metric.change}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="demo-section">
          <h2>Infrastructure Architecture</h2>
          <div className="architecture-diagram">
            <div className="arch-layer">
              <div style={{ fontWeight: 600, marginBottom: '1rem', color: '#3b82f6' }}>Load Balancer</div>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <div style={{ padding: '1rem', background: '#dbeafe', borderRadius: '0.5rem', minWidth: '100px', textAlign: 'center' }}>LB-1</div>
                <div style={{ padding: '1rem', background: '#dbeafe', borderRadius: '0.5rem', minWidth: '100px', textAlign: 'center' }}>LB-2</div>
              </div>
            </div>
            <div style={{ textAlign: 'center', margin: '1rem 0', fontSize: '1.5rem' }}>↓</div>
            <div className="arch-layer">
              <div style={{ fontWeight: 600, marginBottom: '1rem', color: '#10b981' }}>Application Servers</div>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                {[1, 2, 3].map(i => (
                  <div key={i} style={{ padding: '1rem', background: '#d1fae5', borderRadius: '0.5rem', minWidth: '100px', textAlign: 'center' }}>
                    App-{i}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ textAlign: 'center', margin: '1rem 0', fontSize: '1.5rem' }}>↓</div>
            <div className="arch-layer">
              <div style={{ fontWeight: 600, marginBottom: '1rem', color: '#f59e0b' }}>Database Cluster</div>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <div style={{ padding: '1rem', background: '#fef3c7', borderRadius: '0.5rem', minWidth: '100px', textAlign: 'center' }}>Primary</div>
                <div style={{ padding: '1rem', background: '#fef3c7', borderRadius: '0.5rem', minWidth: '100px', textAlign: 'center' }}>Replica</div>
              </div>
            </div>
          </div>
        </section>

        <section className="demo-section">
          <h2>Cost Comparison</h2>
          <div className="cost-comparison">
            <div className="cost-column">
              <h3 style={{ marginBottom: '1rem', color: '#ef4444' }}>Before Migration</h3>
              <div style={{ padding: '1.5rem', background: '#fee2e2', borderRadius: '0.5rem' }}>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#dc2626', marginBottom: '0.5rem' }}>$5,000/mo</div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  <div>• On-premise servers</div>
                  <div>• Manual scaling</div>
                  <div>• High maintenance</div>
                </div>
              </div>
            </div>
            <div style={{ fontSize: '2rem', color: '#6b7280', alignSelf: 'center' }}>→</div>
            <div className="cost-column">
              <h3 style={{ marginBottom: '1rem', color: '#10b981' }}>After Migration</h3>
              <div style={{ padding: '1.5rem', background: '#d1fae5', borderRadius: '0.5rem' }}>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#059669', marginBottom: '0.5rem' }}>$2,800/mo</div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  <div>• AWS cloud infrastructure</div>
                  <div>• Auto-scaling enabled</div>
                  <div>• Reduced maintenance</div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem', padding: '1.5rem', background: '#f0f9ff', borderRadius: '0.5rem' }}>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#0284c7' }}>44% Cost Reduction</div>
            <div style={{ fontSize: '1rem', color: '#6b7280', marginTop: '0.5rem' }}>Saving $2,200 per month</div>
          </div>
        </section>
      </div>
    </div>
  );
}
