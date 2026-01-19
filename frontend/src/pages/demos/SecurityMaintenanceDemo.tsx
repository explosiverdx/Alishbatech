import '../../styles/demos/DemoPage.css';

export default function SecurityMaintenanceDemo() {
  return (
    <div className="demo-page">
      <div className="demo-hero">
        <h1>Security & Maintenance Demo</h1>
        <p>Comprehensive security audits, regular updates, and ongoing maintenance</p>
      </div>

      <div className="demo-content">
        <section className="demo-section">
          <h2>Security Dashboard</h2>
          <div className="security-dashboard">
            <div className="security-card secure">
              <div className="security-icon">🔒</div>
              <h3>SSL/TLS Certificate</h3>
              <div className="security-status">Valid ✓</div>
              <p>Expires: 2025-12-31</p>
            </div>
            <div className="security-card secure">
              <div className="security-icon">🛡️</div>
              <h3>Firewall Protection</h3>
              <div className="security-status">Active ✓</div>
              <p>Blocked: 1,234 threats today</p>
            </div>
            <div className="security-card secure">
              <div className="security-icon">🔐</div>
              <h3>Data Encryption</h3>
              <div className="security-status">AES-256 ✓</div>
              <p>All data encrypted at rest</p>
            </div>
            <div className="security-card secure">
              <div className="security-icon">👁️</div>
              <h3>Monitoring</h3>
              <div className="security-status">24/7 Active ✓</div>
              <p>Real-time threat detection</p>
            </div>
          </div>
        </section>

        <section className="demo-section">
          <h2>Security Audit Results</h2>
          <div className="audit-results">
            <div className="audit-item">
              <div className="audit-check pass">✓</div>
              <div className="audit-details">
                <h4>Vulnerability Scan</h4>
                <p>No critical vulnerabilities found</p>
                <span className="audit-date">Last scan: Today</span>
              </div>
            </div>
            <div className="audit-item">
              <div className="audit-check pass">✓</div>
              <div className="audit-details">
                <h4>Dependency Check</h4>
                <p>All dependencies up to date</p>
                <span className="audit-date">Last check: Today</span>
              </div>
            </div>
            <div className="audit-item">
              <div className="audit-check pass">✓</div>
              <div className="audit-details">
                <h4>Penetration Testing</h4>
                <p>No security breaches detected</p>
                <span className="audit-date">Last test: 1 week ago</span>
              </div>
            </div>
            <div className="audit-item">
              <div className="audit-check pass">✓</div>
              <div className="audit-details">
                <h4>Code Review</h4>
                <p>No security issues in codebase</p>
                <span className="audit-date">Last review: 2 days ago</span>
              </div>
            </div>
          </div>
        </section>

        <section className="demo-section">
          <h2>Maintenance Schedule</h2>
          <div className="maintenance-timeline">
            <div className="maintenance-item">
              <div className="maintenance-date">
                <span className="date-day">Daily</span>
              </div>
              <div className="maintenance-task">
                <h4>Automated Backups</h4>
                <p>Full database and file system backups</p>
                <span className="task-status completed">✓ Completed</span>
              </div>
            </div>
            <div className="maintenance-item">
              <div className="maintenance-date">
                <span className="date-day">Weekly</span>
              </div>
              <div className="maintenance-task">
                <h4>Security Updates</h4>
                <p>Apply security patches and updates</p>
                <span className="task-status completed">✓ Completed</span>
              </div>
            </div>
            <div className="maintenance-item">
              <div className="maintenance-date">
                <span className="date-day">Monthly</span>
              </div>
              <div className="maintenance-task">
                <h4>Performance Review</h4>
                <p>Analyze performance metrics and optimize</p>
                <span className="task-status pending">⏳ Scheduled</span>
              </div>
            </div>
            <div className="maintenance-item">
              <div className="maintenance-date">
                <span className="date-day">Quarterly</span>
              </div>
              <div className="maintenance-task">
                <h4>Full Security Audit</h4>
                <p>Comprehensive security assessment</p>
                <span className="task-status pending">⏳ Scheduled</span>
              </div>
            </div>
          </div>
        </section>

        <section className="demo-section">
          <h2>Monitoring & Alerts</h2>
          <div className="monitoring-demo">
            <div className="monitor-item">
              <div className="monitor-label">Uptime</div>
              <div className="monitor-value">99.98%</div>
              <div className="monitor-bar">
                <div className="monitor-fill" style={{ width: '99.98%' }}></div>
              </div>
            </div>
            <div className="monitor-item">
              <div className="monitor-label">Response Time</div>
              <div className="monitor-value">45ms</div>
              <div className="monitor-bar">
                <div className="monitor-fill" style={{ width: '95%' }}></div>
              </div>
            </div>
            <div className="monitor-item">
              <div className="monitor-label">Error Rate</div>
              <div className="monitor-value">0.02%</div>
              <div className="monitor-bar">
                <div className="monitor-fill" style={{ width: '98%' }}></div>
              </div>
            </div>
            <div className="monitor-item">
              <div className="monitor-label">Active Alerts</div>
              <div className="monitor-value">0</div>
              <div className="monitor-status all-clear">All Systems Operational</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
