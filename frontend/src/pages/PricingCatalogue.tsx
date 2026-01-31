import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { servicesAPI } from '../lib/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/PolicyPages.css';

interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  price?: string;
  duration?: string;
  demoUrl?: string;
  features?: string[];
}

export default function PricingCatalogue() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await servicesAPI.getAll();
        if (response.success && response.data) {
          setServices(response.data);
        } else {
          setError('Failed to load services');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load services');
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="policy-page">
      <Navbar />
      <main className="policy-main">
        <Link to="/" className="policy-back">← Back to Home</Link>
        <h1 className="policy-title">Product Pricing & Catalogue</h1>
        <p className="policy-updated">
          All prices are clearly specified in Indian Rupees (INR). Prices may vary based on scope; final quote will be provided before engagement.
        </p>

        {loading && <p className="policy-content">Loading catalogue...</p>}
        {error && <p className="policy-content" style={{ color: '#dc2626' }}>{error}</p>}

        {!loading && !error && services.length > 0 && (
          <div className="policy-content">
            <p>
              Below is our service catalogue with indicative pricing. For a detailed quote tailored to your project, please use our Contact Us section.
            </p>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1.5rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e5e7eb', textAlign: 'left' }}>
                  <th style={{ padding: '0.75rem 0.5rem', fontWeight: 600 }}>Service</th>
                  <th style={{ padding: '0.75rem 0.5rem', fontWeight: 600 }}>Description</th>
                  <th style={{ padding: '0.75rem 0.5rem', fontWeight: 600 }}>Pricing</th>
                  <th style={{ padding: '0.75rem 0.5rem', fontWeight: 600 }}>Duration</th>
                </tr>
              </thead>
              <tbody>
                {services.map((s) => (
                  <tr key={s.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '0.75rem 0.5rem', fontWeight: 500 }}>{s.title}</td>
                    <td style={{ padding: '0.75rem 0.5rem', maxWidth: '320px' }}>{s.description}</td>
                    <td style={{ padding: '0.75rem 0.5rem', fontWeight: 600 }}>{s.price || 'On request'}</td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>{s.duration || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p style={{ marginTop: '1.5rem' }}>
              For a custom quote or to discuss your project, please visit our <Link to="/#contact" style={{ color: '#2563eb', textDecoration: 'underline' }}>Contact Us</Link> section or the <Link to="/#services" style={{ color: '#2563eb', textDecoration: 'underline' }}>Services</Link> section on the home page.
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
