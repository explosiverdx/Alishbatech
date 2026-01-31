import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/PolicyPages.css';

export default function PrivacyPolicy() {
  return (
    <div className="policy-page">
      <Navbar />
      <main className="policy-main">
        <Link to="/" className="policy-back">← Back to Home</Link>
        <h1 className="policy-title">Privacy Policy</h1>
        <p className="policy-updated">Last updated: January 2026</p>
        <div className="policy-content">
          <p>
            AlishbaTech (“we”, “our”, or “us”) is an IT Services and IT Consulting company. We are committed to protecting your privacy and the confidentiality of your business information. This Privacy Policy explains how we collect, use, disclose, and safeguard information when you visit our website, engage our IT consulting services, or use our technology solutions.
          </p>
          <h2>1. Information We Collect</h2>
          <p>
            <strong>Website and enquiries:</strong> When you contact us for IT services or consulting (e.g. via our contact form), we may collect your name, email, phone, company name, and message. We may also collect technical data such as IP address, browser type, and pages visited when you use our website.
          </p>
          <p>
            <strong>IT consulting and project engagements:</strong> When you engage us for IT services, software development, cloud solutions, or consulting, we may collect business contact details, project requirements, technical specifications, and other information necessary to deliver our services. We treat all client and project information as confidential.
          </p>
          <h2>2. How We Use Your Information</h2>
          <p>
            We use your information to respond to your enquiries, provide IT consulting and technology services, deliver projects (e.g. software, cloud, design), communicate about engagements, improve our website and services, send relevant updates (with your consent), and comply with legal obligations. We do not use your data for purposes unrelated to our IT services and consulting business.
          </p>
          <h2>3. Sharing of Information</h2>
          <p>
            We do not sell your personal or business information. We may share data only with trusted service providers who assist our IT operations (e.g. hosting, email, cloud infrastructure) under strict confidentiality agreements, or when required by law. We do not share your project or consulting data with third parties for marketing or other unrelated purposes.
          </p>
          <h2>4. Data Security</h2>
          <p>
            As an IT services provider, we implement industry-standard technical and organisational measures to protect your data against unauthorised access, alteration, disclosure, or destruction. We apply the same care to your business and project information as we do to our own systems.
          </p>
          <h2>5. Your Rights</h2>
          <p>
            You may request access to, correction of, or deletion of your personal data. You may also opt out of marketing communications. For any such requests, please contact us via our Contact Us page or at info@alishbatech.com.
          </p>
          <h2>6. Cookies</h2>
          <p>
            Our website may use cookies and similar technologies for functionality and analytics. You can manage cookie preferences in your browser settings.
          </p>
          <h2>7. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. The “Last updated” date at the top will reflect the latest version. Continued use of our website or services after changes constitutes acceptance.
          </p>
          <h2>8. Contact Us</h2>
          <p>
            For any privacy-related questions, please contact us via our Contact Us page or at info@alishbatech.com.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
