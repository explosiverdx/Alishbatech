import '../../styles/demos/DemoPage.css';

export default function TravelBookingDemo() {
  return (
    <div className="demo-page" style={{ background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)' }}>
      <div className="demo-hero">
        <h1>Travel Booking Platform Demo</h1>
        <p>Full-featured travel booking system with hotel, flight, and car rental integration</p>
      </div>
      <div className="demo-content">
        <section className="demo-section">
          <h2>Search Flights</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            <input type="text" className="demo-input" placeholder="From" />
            <input type="text" className="demo-input" placeholder="To" />
            <input type="date" className="demo-input" />
            <input type="date" className="demo-input" />
            <button className="demo-button primary">Search</button>
          </div>
        </section>
        <section className="demo-section">
          <h2>Available Flights</h2>
          <div className="demo-grid">
            {['✈️', '✈️', '✈️'].map((icon, i) => (
              <div key={i} className="demo-card">
                <div style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '1rem' }}>{icon}</div>
                <h3 style={{ fontWeight: 600 }}>Flight Option {i + 1}</h3>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Direct • 5h 30m</p>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#3b82f6', marginTop: '1rem' }}>$299</div>
                <button className="demo-button primary" style={{ width: '100%', marginTop: '1rem' }}>Book Now</button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
