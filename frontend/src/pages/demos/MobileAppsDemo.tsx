import '../../styles/demos/DemoPage.css';

export default function MobileAppsDemo() {
  return (
    <div className="demo-page">
      <div className="demo-hero">
        <h1>Mobile Apps Demo</h1>
        <p>Native and cross-platform mobile application solutions</p>
      </div>

      <div className="demo-content">
        <section className="demo-section">
          <h2>Platform Support</h2>
          <div className="demo-grid">
            <div className="demo-card platform-card">
              <div className="platform-icon ios">iOS</div>
              <h3>iOS Development</h3>
              <ul className="feature-list">
                <li>✓ Swift & SwiftUI</li>
                <li>✓ App Store Optimization</li>
                <li>✓ Native Performance</li>
                <li>✓ iOS 15+ Support</li>
              </ul>
            </div>

            <div className="demo-card platform-card">
              <div className="platform-icon android">Android</div>
              <h3>Android Development</h3>
              <ul className="feature-list">
                <li>✓ Kotlin & Jetpack Compose</li>
                <li>✓ Material Design 3</li>
                <li>✓ Google Play Optimization</li>
                <li>✓ Android 12+ Support</li>
              </ul>
            </div>

            <div className="demo-card platform-card">
              <div className="platform-icon cross">Cross-Platform</div>
              <h3>React Native / Flutter</h3>
              <ul className="feature-list">
                <li>✓ Single Codebase</li>
                <li>✓ Native Performance</li>
                <li>✓ Hot Reload</li>
                <li>✓ Cost Effective</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="demo-section">
          <h2>App Features Demo</h2>
          <div className="mobile-features">
            <div className="feature-demo">
              <div className="feature-icon">🔔</div>
              <h3>Push Notifications</h3>
              <p>Real-time notifications to engage users</p>
              <button className="demo-button primary" onClick={() => alert('Push notification sent!')}>
                Test Notification
              </button>
            </div>

            <div className="feature-demo">
              <div className="feature-icon">📴</div>
              <h3>Offline Mode</h3>
              <p>Works seamlessly without internet connection</p>
              <div className="offline-indicator">
                <span className="status-dot online"></span>
                <span>Online Mode</span>
              </div>
            </div>

            <div className="feature-demo">
              <div className="feature-icon">🔐</div>
              <h3>Biometric Auth</h3>
              <p>Secure authentication with Face ID / Touch ID</p>
              <button className="demo-button secondary">Authenticate</button>
            </div>
          </div>
        </section>

        <section className="demo-section">
          <h2>Performance Metrics</h2>
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-number">99.9%</div>
              <div className="metric-label">Uptime</div>
            </div>
            <div className="metric-card">
              <div className="metric-number">&lt;100ms</div>
              <div className="metric-label">Response Time</div>
            </div>
            <div className="metric-card">
              <div className="metric-number">4.8★</div>
              <div className="metric-label">App Store Rating</div>
            </div>
            <div className="metric-card">
              <div className="metric-number">1M+</div>
              <div className="metric-label">Downloads</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
