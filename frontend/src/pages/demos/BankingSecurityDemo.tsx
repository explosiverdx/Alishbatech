import '../../styles/demos/DemoPage.css';

export default function BankingSecurityDemo() {
  const securityFeatures = [
    { name: 'SSL/TLS Encryption', status: 'Active', level: 'A+', icon: '🔒' },
    { name: 'Two-Factor Authentication', status: 'Enabled', level: '100%', icon: '🔐' },
    { name: 'Fraud Detection', status: 'Monitoring', level: '24/7', icon: '🛡️' },
    { name: 'Penetration Testing', status: 'Passed', level: 'A+', icon: '✅' },
  ];

  const threats = [
    { type: 'DDoS Attack', status: 'Blocked', time: '2 min ago', severity: 'High' },
    { type: 'Suspicious Login', status: 'Flagged', time: '15 min ago', severity: 'Medium' },
    { type: 'SQL Injection Attempt', status: 'Blocked', time: '1 hour ago', severity: 'High' },
    { type: 'Phishing Attempt', status: 'Blocked', time: '3 hours ago', severity: 'Medium' },
  ];

  return (
    <div className="demo-page" style={{ background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)' }}>
      <div className="demo-hero">
        <h1>Banking Security System Demo</h1>
        <p>Enterprise-grade security implementation with 24/7 monitoring and threat detection</p>
      </div>

      <div className="demo-content">
        <section className="demo-section">
          <h2>Security Status</h2>
          <div className="demo-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
            {securityFeatures.map((feature, index) => (
              <div key={index} className="demo-card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{feature.icon}</div>
                <h3 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>{feature.name}</h3>
                <div style={{ 
                  padding: '0.5rem 1rem', 
                  background: '#d1fae5', 
                  color: '#059669', 
                  borderRadius: '9999px', 
                  fontSize: '0.875rem', 
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  display: 'inline-block'
                }}>
                  {feature.status}
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#10b981' }}>{feature.level}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="demo-section">
          <h2>Threat Detection & Response</h2>
          <div className="threats-list">
            {threats.map((threat, index) => (
              <div key={index} className="threat-item">
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                    <h4 style={{ fontWeight: 600 }}>{threat.type}</h4>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      background: threat.severity === 'High' ? '#fee2e2' : '#fef3c7',
                      color: threat.severity === 'High' ? '#dc2626' : '#d97706'
                    }}>
                      {threat.severity}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Detected: {threat.time}</div>
                </div>
                <div style={{
                  padding: '0.5rem 1rem',
                  background: '#d1fae5',
                  color: '#059669',
                  borderRadius: '9999px',
                  fontSize: '0.875rem',
                  fontWeight: 600
                }}>
                  {threat.status}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="demo-section">
          <h2>Security Audit Results</h2>
          <div className="audit-results">
            <div className="audit-item">
              <div className="audit-check pass">✓</div>
              <div className="audit-details">
                <h4>Vulnerability Scan</h4>
                <p>No critical vulnerabilities found. All dependencies up to date.</p>
                <span className="audit-date">Last scan: Today at 3:00 AM</span>
              </div>
            </div>
            <div className="audit-item">
              <div className="audit-check pass">✓</div>
              <div className="audit-details">
                <h4>Code Security Review</h4>
                <p>No security issues detected in codebase. All best practices followed.</p>
                <span className="audit-date">Last review: 2 days ago</span>
              </div>
            </div>
            <div className="audit-item">
              <div className="audit-check pass">✓</div>
              <div className="audit-details">
                <h4>Penetration Testing</h4>
                <p>All penetration tests passed. System is secure against known attack vectors.</p>
                <span className="audit-date">Last test: 1 week ago</span>
              </div>
            </div>
            <div className="audit-item">
              <div className="audit-check pass">✓</div>
              <div className="audit-details">
                <h4>Compliance Check</h4>
                <p>Fully compliant with PCI DSS, SOC 2, and GDPR requirements.</p>
                <span className="audit-date">Last check: Today</span>
              </div>
            </div>
          </div>
        </section>

        <section className="demo-section">
          <h2>Real-time Monitoring</h2>
          <div className="monitoring-dashboard">
            <div className="monitor-item">
              <div className="monitor-label">Active Sessions</div>
              <div className="monitor-value">1,234</div>
              <div className="monitor-bar">
                <div className="monitor-fill" style={{ width: '82%' }}></div>
              </div>
            </div>
            <div className="monitor-item">
              <div className="monitor-label">Threats Blocked (24h)</div>
              <div className="monitor-value">47</div>
              <div className="monitor-bar">
                <div className="monitor-fill" style={{ width: '94%' }}></div>
              </div>
            </div>
            <div className="monitor-item">
              <div className="monitor-label">System Uptime</div>
              <div className="monitor-value">99.99%</div>
              <div className="monitor-bar">
                <div className="monitor-fill" style={{ width: '99.99%' }}></div>
              </div>
            </div>
            <div className="monitor-item">
              <div className="monitor-label">Security Score</div>
              <div className="monitor-value">98/100</div>
              <div className="monitor-status all-clear">All Systems Secure</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
