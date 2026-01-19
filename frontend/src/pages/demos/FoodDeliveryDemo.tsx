import { useState } from 'react';
import '../../styles/demos/DemoPage.css';

export default function FoodDeliveryDemo() {
  const [restaurants] = useState([
    { id: 1, name: 'Pizza Palace', rating: 4.8, deliveryTime: '25-30 min', image: '🍕', cuisine: 'Italian' },
    { id: 2, name: 'Burger King', rating: 4.5, deliveryTime: '20-25 min', image: '🍔', cuisine: 'American' },
    { id: 3, name: 'Sushi Express', rating: 4.9, deliveryTime: '30-35 min', image: '🍣', cuisine: 'Japanese' },
    { id: 4, name: 'Taco Fiesta', rating: 4.6, deliveryTime: '15-20 min', image: '🌮', cuisine: 'Mexican' },
  ]);

  const [cart, _setCart] = useState([
    { id: 1, name: 'Margherita Pizza', price: 12.99, quantity: 1 },
    { id: 2, name: 'Coca Cola', price: 2.99, quantity: 2 },
  ]);

  const [tracking] = useState({
    status: 'On the way',
    driver: 'John D.',
    eta: '15 min',
    progress: 75,
  });

  return (
    <div className="demo-page" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}>
      <div className="demo-hero">
        <h1>Food Delivery App Demo</h1>
        <p>On-demand food delivery with real-time tracking and multiple payment options</p>
      </div>

      <div className="demo-content">
        <section className="demo-section">
          <h2>Nearby Restaurants</h2>
          <div className="demo-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
            {restaurants.map((restaurant) => (
              <div key={restaurant.id} className="demo-card">
                <div style={{ fontSize: '4rem', textAlign: 'center', marginBottom: '1rem' }}>{restaurant.image}</div>
                <h3 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{restaurant.name}</h3>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                  <div>⭐ {restaurant.rating}</div>
                  <div>⏱️ {restaurant.deliveryTime}</div>
                  <div>🍽️ {restaurant.cuisine}</div>
                </div>
                <button className="demo-button primary" style={{ width: '100%' }}>View Menu</button>
              </div>
            ))}
          </div>
        </section>

        <section className="demo-section">
          <h2>Order Tracking</h2>
          <div className="tracking-demo">
            <div style={{ 
              padding: '2rem', 
              background: 'linear-gradient(135deg, #f59e0b, #d97706)', 
              borderRadius: '0.75rem',
              color: 'white',
              marginBottom: '2rem'
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>Order #12345</div>
              <div style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Status: {tracking.status}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Driver</div>
                  <div style={{ fontWeight: 600 }}>👤 {tracking.driver}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>ETA</div>
                  <div style={{ fontWeight: 600 }}>⏱️ {tracking.eta}</div>
                </div>
              </div>
              <div style={{ height: '8px', background: 'rgba(255,255,255,0.3)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ 
                  height: '100%', 
                  width: `${tracking.progress}%`, 
                  background: 'white',
                  borderRadius: '4px'
                }}></div>
              </div>
            </div>
            <div className="tracking-steps">
              <div className="tracking-step completed">
                <div className="step-icon">✓</div>
                <div>
                  <div style={{ fontWeight: 600 }}>Order Placed</div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>2:30 PM</div>
                </div>
              </div>
              <div className="tracking-step completed">
                <div className="step-icon">✓</div>
                <div>
                  <div style={{ fontWeight: 600 }}>Restaurant Confirmed</div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>2:32 PM</div>
                </div>
              </div>
              <div className="tracking-step active">
                <div className="step-icon">🚗</div>
                <div>
                  <div style={{ fontWeight: 600 }}>On the Way</div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>2:45 PM</div>
                </div>
              </div>
              <div className="tracking-step">
                <div className="step-icon">📦</div>
                <div>
                  <div style={{ fontWeight: 600, opacity: 0.6 }}>Delivered</div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Pending</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="demo-section">
          <h2>Shopping Cart</h2>
          <div className="cart-demo">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div style={{ fontSize: '2rem' }}>🍕</div>
                <div style={{ flex: 1, marginLeft: '1rem' }}>
                  <h4 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{item.name}</h4>
                  <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Quantity: {item.quantity}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 700, fontSize: '1.125rem' }}>${(item.price * item.quantity).toFixed(2)}</div>
                </div>
              </div>
            ))}
            <div className="cart-total">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>Subtotal:</span>
                <span>${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>Delivery Fee:</span>
                <span>$2.99</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '2px solid #e5e7eb', fontWeight: 700, fontSize: '1.25rem' }}>
                <span>Total:</span>
                <span>${(cart.reduce((sum, item) => sum + item.price * item.quantity, 0) + 2.99).toFixed(2)}</span>
              </div>
              <button className="demo-button primary" style={{ width: '100%', marginTop: '1rem' }}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </section>

        <section className="demo-section">
          <h2>Payment Options</h2>
          <div className="payment-options">
            <div className="payment-method">
              <div style={{ fontSize: '2rem', marginRight: '1rem' }}>💳</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>Credit/Debit Card</div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Visa, Mastercard, Amex</div>
              </div>
              <input type="radio" name="payment" defaultChecked />
            </div>
            <div className="payment-method">
              <div style={{ fontSize: '2rem', marginRight: '1rem' }}>📱</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>Digital Wallet</div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>PayPal, Apple Pay, Google Pay</div>
              </div>
              <input type="radio" name="payment" />
            </div>
            <div className="payment-method">
              <div style={{ fontSize: '2rem', marginRight: '1rem' }}>💵</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>Cash on Delivery</div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Pay when you receive</div>
              </div>
              <input type="radio" name="payment" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
