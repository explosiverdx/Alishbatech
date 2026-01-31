import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/PolicyPages.css';

export default function TermsAndConditions() {
  return (
    <div className="policy-page">
      <Navbar />
      <main className="policy-main">
        <Link to="/" className="policy-back">← Back to Home</Link>
        <h1 className="policy-title">Terms and Conditions</h1>
        <p className="policy-updated">Last updated: January 2026</p>
        <div className="policy-content">
          <p>
            Welcome to AlishbaTech, an IT Services and IT Consulting company. By accessing or using our website and engaging our technology and consulting services, you agree to be bound by these Terms and Conditions. Please read them carefully.
          </p>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By using our website (alishbatech.in / alishbatech.com) or engaging our IT consulting, software development, cloud, or related technology services, you accept these terms. If you do not agree, please do not use our website or services.
          </p>
          <h2>2. Nature of Our Business</h2>
          <p>
            AlishbaTech provides IT services and IT consulting, including but not limited to web development, mobile applications, cloud solutions, UI/UX design, performance optimization, security and maintenance, and related technology consulting. Our engagements are service-based and project or retainer-driven, not sale of physical goods.
          </p>
          <h2>3. Use of Website</h2>
          <p>
            You agree to use our website only for lawful purposes. You must not use it to transmit harmful code, attempt unauthorised access to our or others’ systems, or engage in any activity that could harm our infrastructure, clients, or other users.
          </p>
          <h2>4. Services and Agreements</h2>
          <p>
            Specific IT consulting and technology projects are governed by separate agreements, statements of work (SOW), or proposals. Scope, deliverables, timelines, and pricing will be clearly communicated and agreed in writing before engagement. Payment terms (e.g. milestone-based, monthly) will be as set out in the relevant agreement.
          </p>
          <h2>5. Intellectual Property</h2>
          <p>
            All content on this website (text, graphics, logos, demos) is owned by AlishbaTech or its licensors. You may not copy, modify, or distribute our website content without prior written permission. Ownership of deliverables (e.g. custom software, designs) created under a project will be as agreed in the respective project agreement.
          </p>
          <h2>6. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, AlishbaTech shall not be liable for any indirect, incidental, or consequential damages arising from your use of our website or our IT services. Liability for project deliverables will be as set out in the applicable project agreement.
          </p>
          <h2>7. Governing Law</h2>
          <p>
            These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts of India.
          </p>
          <h2>8. Changes</h2>
          <p>
            We may update these Terms and Conditions from time to time. The “Last updated” date will be revised. Continued use of the website or services after changes constitutes acceptance.
          </p>
          <h2>9. Contact</h2>
          <p>
            For questions about these Terms and Conditions, please contact us via our Contact Us page or at info@alishbatech.com.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
