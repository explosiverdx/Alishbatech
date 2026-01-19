import '../../styles/demos/DemoPage.css';

export default function HealthcareAppDemo() {
  const appointments = [
    { id: 1, doctor: 'Dr. Sarah Johnson', specialty: 'Cardiology', date: '2024-01-20', time: '10:00 AM', status: 'Upcoming' },
    { id: 2, doctor: 'Dr. Michael Chen', specialty: 'Dermatology', date: '2024-01-18', time: '2:30 PM', status: 'Completed' },
    { id: 3, doctor: 'Dr. Emily Davis', specialty: 'Pediatrics', date: '2024-01-25', time: '11:00 AM', status: 'Upcoming' },
  ];

  const prescriptions = [
    { id: 1, name: 'Lisinopril 10mg', dosage: '1 tablet daily', refills: 3, expires: '2024-04-15' },
    { id: 2, name: 'Metformin 500mg', dosage: '2 tablets twice daily', refills: 2, expires: '2024-03-20' },
  ];

  return (
    <div className="demo-page" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
      <div className="demo-hero">
        <h1>Healthcare App Demo</h1>
        <p>HIPAA-compliant patient management and telemedicine platform</p>
      </div>

      <div className="demo-content">
        <section className="demo-section">
          <h2>Upcoming Appointments</h2>
          <div className="appointments-list">
            {appointments.filter(a => a.status === 'Upcoming').map(appointment => (
              <div key={appointment.id} className="appointment-card">
                <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
                  <div style={{ fontSize: '2rem' }}>👨‍⚕️</div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{appointment.doctor}</h3>
                    <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.5rem' }}>{appointment.specialty}</p>
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
                      <span>📅 {appointment.date}</span>
                      <span>🕐 {appointment.time}</span>
                    </div>
                  </div>
                  <button className="demo-button primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                    Join Call
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="demo-section">
          <h2>Active Prescriptions</h2>
          <div className="prescriptions-list">
            {prescriptions.map(prescription => (
              <div key={prescription.id} className="prescription-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <h3 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{prescription.name}</h3>
                    <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.5rem' }}>{prescription.dosage}</p>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                      <span>Refills: {prescription.refills}</span>
                      <span style={{ marginLeft: '1rem' }}>Expires: {prescription.expires}</span>
                    </div>
                  </div>
                  <button className="demo-button outline" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                    Refill
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="demo-section">
          <h2>Health Metrics</h2>
          <div className="metrics-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div className="metric-card">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>❤️</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ef4444' }}>72 BPM</div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Heart Rate</div>
              <div style={{ fontSize: '0.75rem', color: '#10b981', marginTop: '0.25rem' }}>Normal</div>
            </div>
            <div className="metric-card">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🌡️</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f59e0b' }}>98.6°F</div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Temperature</div>
              <div style={{ fontSize: '0.75rem', color: '#10b981', marginTop: '0.25rem' }}>Normal</div>
            </div>
            <div className="metric-card">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💪</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#3b82f6' }}>7,234</div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Steps Today</div>
              <div style={{ fontSize: '0.75rem', color: '#10b981', marginTop: '0.25rem' }}>Goal: 10,000</div>
            </div>
            <div className="metric-card">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>😴</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#8b5cf6' }}>7.5 hrs</div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Sleep Last Night</div>
              <div style={{ fontSize: '0.75rem', color: '#10b981', marginTop: '0.25rem' }}>Good</div>
            </div>
          </div>
        </section>

        <section className="demo-section">
          <h2>Quick Actions</h2>
          <div className="quick-actions">
            <button className="demo-button primary" style={{ flex: 1 }}>
              📞 Book Appointment
            </button>
            <button className="demo-button secondary" style={{ flex: 1 }}>
              💊 View Medications
            </button>
            <button className="demo-button outline" style={{ flex: 1 }}>
              📋 Medical Records
            </button>
            <button className="demo-button outline" style={{ flex: 1 }}>
              💬 Message Doctor
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
