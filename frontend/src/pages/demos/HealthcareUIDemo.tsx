import '../../styles/demos/DemoPage.css';

export default function HealthcareUIDemo() {
  return (
    <div className="demo-page" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
      <div className="demo-hero">
        <h1>Healthcare UI Redesign Demo</h1>
        <p>Complete redesign of patient portal with improved accessibility and user experience</p>
      </div>
      <div className="demo-content">
        <section className="demo-section">
          <h2>Patient Portal Interface</h2>
          <div className="mockup-frame">
            <div style={{ padding: '2rem', background: '#f9fafb', borderRadius: '0.5rem' }}>
              <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
                <div style={{ flex: 1 }}>
                  <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>Welcome Back, John</h2>
                  <div className="demo-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                    <div className="demo-card-small" style={{ padding: '1.5rem', textAlign: 'center' }}>
                      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📅</div>
                      <div style={{ fontWeight: 600 }}>Upcoming Appointments</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#3b82f6', marginTop: '0.5rem' }}>2</div>
                    </div>
                    <div className="demo-card-small" style={{ padding: '1.5rem', textAlign: 'center' }}>
                      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💊</div>
                      <div style={{ fontWeight: 600 }}>Active Prescriptions</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#10b981', marginTop: '0.5rem' }}>3</div>
                    </div>
                  </div>
                </div>
              </div>
              <button className="demo-button primary" style={{ width: '100%' }}>Book Appointment</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
