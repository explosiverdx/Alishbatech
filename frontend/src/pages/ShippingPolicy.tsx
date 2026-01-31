import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/PolicyPages.css';

export default function ShippingPolicy() {
  return (
    <div className="policy-page">
      <Navbar />
      <main className="policy-main">
        <Link to="/" className="policy-back">← Back to Home</Link>
        <h1 className="policy-title">Shipping Policy</h1>
        <p className="policy-updated">Last updated: January 2026</p>
        <div className="policy-content">
          <p>
            AlishbaTech is an IT Services and IT Consulting company. We do not sell or ship physical products. We primarily deliver digital IT services (software development, design, cloud solutions, consulting). This policy explains how we “deliver” our IT services, consulting deliverables, and any handover of digital or physical items, if applicable.
          </p>
          <h2>1. Nature of Our Deliverables</h2>
          <p>
            We deliver IT consulting and technology services. Deliverables are typically <strong>digital</strong>, including but not limited to: access to source code or repositories, design files (e.g. Figma, assets), deployed applications or cloud infrastructure, documentation, and handover sessions. There is no shipping of physical goods unless explicitly agreed in a project (e.g. hardware or printed documentation).
          </p>
          <h2>2. How We Deliver</h2>
          <p>
            Delivery is carried out via secure electronic means—e.g. shared repositories, cloud access, file transfer, or handover documentation—as agreed in the statement of work (SOW) or project agreement. We do not ship software or consulting deliverables by postal or courier service unless specifically agreed (e.g. physical media or documents).
          </p>
          <h2>3. Delivery Timeline</h2>
          <p>
            Delivery timelines and milestones are agreed in the project scope or SOW. We communicate progress, milestones, and handover dates. Any delays are communicated in advance where possible. Delivery for IT services is complete when the agreed deliverables are handed over as per the contract.
          </p>
          <h2>4. Geographic Coverage</h2>
          <p>
            We serve clients in India and internationally. Digital delivery of IT services and consulting deliverables is available globally. If a project includes physical items (e.g. devices, printed documentation), shipping method, cost, and estimated delivery will be agreed in writing before dispatch.
          </p>
          <h2>5. Contact</h2>
          <p>
            For questions about delivery of our IT services or consulting deliverables, please contact us via our Contact Us page or at info@alishbatech.com.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
