import '../../styles/demos/DemoPage.css';

export default function RealEstateDemo() {
  const properties = [
    { id: 1, address: '123 Main St', price: 450000, beds: 3, baths: 2, sqft: 1800, image: '🏠' },
    { id: 2, address: '456 Oak Ave', price: 680000, beds: 4, baths: 3, sqft: 2400, image: '🏡' },
    { id: 3, address: '789 Pine Rd', price: 320000, beds: 2, baths: 1, sqft: 1200, image: '🏘️' },
    { id: 4, address: '321 Elm St', price: 890000, beds: 5, baths: 4, sqft: 3200, image: '🏛️' },
  ];

  return (
    <div className="demo-page" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}>
      <div className="demo-hero">
        <h1>Real Estate Portal Demo</h1>
        <p>Advanced property listings with virtual tours and AI recommendations</p>
      </div>

      <div className="demo-content">
        <section className="demo-section">
          <h2>Property Search</h2>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            <input type="text" className="demo-input" placeholder="Location..." style={{ flex: 1, minWidth: '200px' }} />
            <select className="demo-select" style={{ minWidth: '150px' }}>
              <option>Any Price</option>
              <option>Under $300k</option>
              <option>$300k - $500k</option>
              <option>$500k - $800k</option>
              <option>Over $800k</option>
            </select>
            <select className="demo-select" style={{ minWidth: '150px' }}>
              <option>Any Bedrooms</option>
              <option>1+ Bedrooms</option>
              <option>2+ Bedrooms</option>
              <option>3+ Bedrooms</option>
              <option>4+ Bedrooms</option>
            </select>
            <button className="demo-button primary">Search</button>
          </div>
        </section>

        <section className="demo-section">
          <h2>Featured Properties</h2>
          <div className="demo-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            {properties.map((property) => (
              <div key={property.id} className="demo-card property-card">
                <div style={{ fontSize: '4rem', textAlign: 'center', marginBottom: '1rem' }}>{property.image}</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#3b82f6', marginBottom: '0.5rem' }}>
                  ${property.price.toLocaleString()}
                </div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>{property.address}</h3>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', color: '#6b7280', fontSize: '0.875rem' }}>
                  <span>🛏️ {property.beds} Beds</span>
                  <span>🚿 {property.baths} Baths</span>
                  <span>📐 {property.sqft.toLocaleString()} sqft</span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="demo-button primary" style={{ flex: 1 }}>View Details</button>
                  <button className="demo-button outline" style={{ flex: 1 }}>Virtual Tour</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="demo-section">
          <h2>Mortgage Calculator</h2>
          <div className="calculator-demo">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Home Price</label>
                <input type="number" className="demo-input" defaultValue="450000" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Down Payment</label>
                <input type="number" className="demo-input" defaultValue="90000" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Interest Rate (%)</label>
                <input type="number" className="demo-input" defaultValue="6.5" step="0.1" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Loan Term (years)</label>
                <input type="number" className="demo-input" defaultValue="30" />
              </div>
            </div>
            <div style={{ padding: '1.5rem', background: '#f9fafb', borderRadius: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>Monthly Payment:</span>
                <span style={{ fontWeight: 700, fontSize: '1.25rem', color: '#3b82f6' }}>$2,277</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
                <span>Principal & Interest:</span>
                <span>$2,277</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#6b7280' }}>
                <span>Property Tax (estimated):</span>
                <span>$375</span>
              </div>
            </div>
          </div>
        </section>

        <section className="demo-section">
          <h2>Neighborhood Insights</h2>
          <div className="insights-grid">
            <div className="insight-card">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏫</div>
              <h4>Schools</h4>
              <p>8.5/10 Average Rating</p>
              <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>5 schools within 2 miles</p>
            </div>
            <div className="insight-card">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🛒</div>
              <h4>Shopping</h4>
              <p>Excellent</p>
              <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Multiple malls nearby</p>
            </div>
            <div className="insight-card">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🚗</div>
              <h4>Transportation</h4>
              <p>Good</p>
              <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Highway access 0.5 miles</p>
            </div>
            <div className="insight-card">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🌳</div>
              <h4>Parks</h4>
              <p>Very Good</p>
              <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>3 parks within 1 mile</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
