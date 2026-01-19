import '../../styles/demos/DemoPage.css';

export default function ECommerceDemo() {
  const products = [
    { id: 1, name: 'Wireless Headphones', price: 99.99, image: '🎧', rating: 4.5 },
    { id: 2, name: 'Smart Watch', price: 249.99, image: '⌚', rating: 4.8 },
    { id: 3, name: 'Laptop Stand', price: 49.99, image: '💻', rating: 4.3 },
    { id: 4, name: 'Mechanical Keyboard', price: 129.99, image: '⌨️', rating: 4.7 },
  ];

  return (
    <div className="demo-page" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div className="demo-hero">
        <h1>E-Commerce Platform Demo</h1>
        <p>Modern shopping experience with real-time inventory and seamless checkout</p>
      </div>

      <div className="demo-content">
        <section className="demo-section">
          <h2>Product Catalog</h2>
          <div className="demo-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
            {products.map((product) => (
              <div key={product.id} className="demo-card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{product.image}</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>{product.name}</h3>
                <div style={{ marginBottom: '1rem' }}>
                  <span style={{ color: '#f59e0b' }}>{'★'.repeat(Math.floor(product.rating))}</span>
                  <span style={{ color: '#9ca3af' }}>{'★'.repeat(5 - Math.floor(product.rating))}</span>
                  <span style={{ marginLeft: '0.5rem', color: '#6b7280' }}>({product.rating})</span>
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#3b82f6', marginBottom: '1rem' }}>
                  ${product.price}
                </div>
                <button className="demo-button primary" style={{ width: '100%' }}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="demo-section">
          <h2>Shopping Cart</h2>
          <div className="cart-demo">
            <div className="cart-item">
              <div style={{ fontSize: '2rem' }}>🎧</div>
              <div style={{ flex: 1, marginLeft: '1rem' }}>
                <h4 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Wireless Headphones</h4>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Quantity: 2</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 700, fontSize: '1.125rem' }}>$199.98</div>
                <button style={{ marginTop: '0.5rem', background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                  Remove
                </button>
              </div>
            </div>
            <div className="cart-total">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>Subtotal:</span>
                <span>$199.98</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>Shipping:</span>
                <span>$9.99</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '2px solid #e5e7eb', fontWeight: 700, fontSize: '1.25rem' }}>
                <span>Total:</span>
                <span>$209.97</span>
              </div>
              <button className="demo-button primary" style={{ width: '100%', marginTop: '1rem' }}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </section>

        <section className="demo-section">
          <h2>Features</h2>
          <div className="features-grid">
            <div className="feature-item">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🛒</div>
              <h4>Real-time Inventory</h4>
              <p>Live stock updates prevent overselling</p>
            </div>
            <div className="feature-item">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💳</div>
              <h4>Secure Payments</h4>
              <p>Multiple payment options with Stripe</p>
            </div>
            <div className="feature-item">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📦</div>
              <h4>Order Tracking</h4>
              <p>Real-time shipment tracking</p>
            </div>
            <div className="feature-item">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⭐</div>
              <h4>Reviews & Ratings</h4>
              <p>Customer feedback system</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
