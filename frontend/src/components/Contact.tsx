import { useState } from 'react';
import '../styles/Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus(data.message || 'Message sent successfully! We\'ll get back to you soon.');
        setTimeout(() => {
          setFormData({ name: '', email: '', subject: '', message: '' });
          setStatus('');
        }, 5000);
      } else {
        setStatus(`Error: ${data.error || 'Failed to send message'}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('Error: Failed to send message. Please try again.');
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="contact-container">
        <div className="contact-header">
          <h2 className="contact-title">Get In Touch</h2>
          <p className="contact-subtitle">
            Ready to start your project? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="contact-grid">
          {/* Contact Form */}
          <div className="contact-form-wrapper">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="John Doe"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="john@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="Project Inquiry"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="form-textarea"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="form-submit"
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>

              {status && status !== 'sending' && (
                <div className={`form-status ${status.startsWith('Error') ? 'error' : 'success'}`}>
                  {status}
                </div>
              )}
            </form>
          </div>

          {/* Contact Information */}
          <div className="contact-info">
            <div className="info-card">
              <h3 className="info-title">Contact Information</h3>
              
              <div className="info-items">
                <div className="info-item">
                  <div className="info-icon email">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="info-content">
                    <h4>Email</h4>
                    <p>info@alishbatech.com</p>
                    <p>support@alishbatech.com</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon phone">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="info-content">
                    <h4>Phone</h4>
                    <p>+91 9648832796</p>
                    <p>+1 (555) 987-6543</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon location">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="info-content">
                    <h4>Office</h4>
                    <p>123 Tech Street</p>
                    <p>Innovation City, IC 12345</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="hours-card">
              <h3 className="hours-title">Business Hours</h3>
              <div className="hours-list">
                <p><span>Monday - Friday:</span> 9:00 AM - 6:00 PM</p>
                <p><span>Saturday:</span> 10:00 AM - 4:00 PM</p>
                <p><span>Sunday:</span> Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
