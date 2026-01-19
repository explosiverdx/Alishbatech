import '../../styles/demos/DemoPage.css';

export default function IoTDashboardDemo() {
  const devices = [
    { name: 'Smart Thermostat', status: 'Online', temp: '72°F', icon: '🌡️' },
    { name: 'Security Camera', status: 'Online', activity: 'Active', icon: '📹' },
    { name: 'Smart Lights', status: 'Online', brightness: '80%', icon: '💡' },
    { name: 'Door Lock', status: 'Online', state: 'Locked', icon: '🔒' },
  ];

  return (
    <div className="demo-page" style={{ background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' }}>
      <div className="demo-hero">
        <h1>IoT Dashboard Demo</h1>
        <p>Real-time IoT device monitoring and control dashboard with analytics</p>
      </div>
      <div className="demo-content">
        <section className="demo-section">
          <h2>Connected Devices</h2>
          <div className="demo-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
            {devices.map((device, i) => (
              <div key={i} className="demo-card">
                <div style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '1rem' }}>{device.icon}</div>
                <h3 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>{device.name}</h3>
                <div style={{ 
                  padding: '0.25rem 0.75rem', 
                  background: '#d1fae5', 
                  color: '#059669', 
                  borderRadius: '9999px', 
                  fontSize: '0.875rem', 
                  fontWeight: 600,
                  display: 'inline-block',
                  marginBottom: '0.5rem'
                }}>
                  {device.status}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  {device.temp || device.activity || device.brightness || device.state}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
