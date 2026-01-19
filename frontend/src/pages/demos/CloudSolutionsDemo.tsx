import '../../styles/demos/DemoPage.css';

export default function CloudSolutionsDemo() {
  return (
    <div className="demo-page">
      <div className="demo-hero">
        <h1>Cloud Solutions Demo</h1>
        <p>Scalable cloud infrastructure and deployment solutions</p>
      </div>

      <div className="demo-content">
        <section className="demo-section">
          <h2>Cloud Providers</h2>
          <div className="demo-grid">
            <div className="demo-card cloud-card">
              <div className="cloud-logo aws">AWS</div>
              <h3>Amazon Web Services</h3>
              <ul className="feature-list">
                <li>✓ EC2 Instances</li>
                <li>✓ S3 Storage</li>
                <li>✓ Lambda Functions</li>
                <li>✓ RDS Databases</li>
              </ul>
            </div>

            <div className="demo-card cloud-card">
              <div className="cloud-logo azure">Azure</div>
              <h3>Microsoft Azure</h3>
              <ul className="feature-list">
                <li>✓ Virtual Machines</li>
                <li>✓ Blob Storage</li>
                <li>✓ Functions</li>
                <li>✓ SQL Database</li>
              </ul>
            </div>

            <div className="demo-card cloud-card">
              <div className="cloud-logo gcp">GCP</div>
              <h3>Google Cloud Platform</h3>
              <ul className="feature-list">
                <li>✓ Compute Engine</li>
                <li>✓ Cloud Storage</li>
                <li>✓ Cloud Functions</li>
                <li>✓ Cloud SQL</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="demo-section">
          <h2>Infrastructure Dashboard</h2>
          <div className="infrastructure-demo">
            <div className="infra-item">
              <div className="infra-status active"></div>
              <div className="infra-info">
                <h4>Production Server</h4>
                <p>Status: Running | CPU: 45% | Memory: 62%</p>
              </div>
            </div>
            <div className="infra-item">
              <div className="infra-status active"></div>
              <div className="infra-info">
                <h4>Database Cluster</h4>
                <p>Status: Running | Connections: 234 | Replication: Active</p>
              </div>
            </div>
            <div className="infra-item">
              <div className="infra-status active"></div>
              <div className="infra-info">
                <h4>CDN Network</h4>
                <p>Status: Running | Cache Hit Rate: 94% | Bandwidth: 2.3TB</p>
              </div>
            </div>
            <div className="infra-item">
              <div className="infra-status active"></div>
              <div className="infra-info">
                <h4>Load Balancer</h4>
                <p>Status: Running | Requests/sec: 1,234 | Health: 100%</p>
              </div>
            </div>
          </div>
        </section>

        <section className="demo-section">
          <h2>Auto-Scaling Demo</h2>
          <div className="scaling-demo">
            <div className="scaling-chart">
              <div className="chart-bar" style={{ height: '40%' }}>40%</div>
              <div className="chart-bar" style={{ height: '65%' }}>65%</div>
              <div className="chart-bar" style={{ height: '85%' }}>85%</div>
              <div className="chart-bar" style={{ height: '75%' }}>75%</div>
              <div className="chart-bar" style={{ height: '50%' }}>50%</div>
            </div>
            <div className="scaling-info">
              <p><strong>Current Load:</strong> 65%</p>
              <p><strong>Active Instances:</strong> 3</p>
              <p><strong>Auto-scaling:</strong> Enabled</p>
              <p><strong>Scale Threshold:</strong> 80%</p>
            </div>
          </div>
        </section>

        <section className="demo-section">
          <h2>Cost Optimization</h2>
          <div className="cost-demo">
            <div className="cost-savings">
              <div className="cost-before">
                <span className="cost-label">Before Optimization</span>
                <span className="cost-amount">$5,000/month</span>
              </div>
              <div className="cost-arrow">→</div>
              <div className="cost-after">
                <span className="cost-label">After Optimization</span>
                <span className="cost-amount">$2,800/month</span>
              </div>
            </div>
            <div className="savings-badge">
              <span className="savings-percent">44%</span>
              <span className="savings-text">Cost Reduction</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
