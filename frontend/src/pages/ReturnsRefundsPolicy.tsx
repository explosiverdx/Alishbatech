import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/PolicyPages.css';

export default function ReturnsRefundsPolicy() {
  return (
    <div className="policy-page">
      <Navbar />
      <main className="policy-main">
        <Link to="/" className="policy-back">← Back to Home</Link>
        <h1 className="policy-title">Returns, Refunds & Cancellation Policy</h1>
        <p className="policy-updated">Last updated: January 2026</p>
        <div className="policy-content">
          <p>
            AlishbaTech is an IT Services and IT Consulting company. We do not sell physical products; we provide technology and consulting services. This policy outlines our approach to cancellations and refunds for our IT consulting and technology service engagements.
          </p>
          <h2>1. No Physical Returns</h2>
          <p>
            As we provide IT services and IT consulting (e.g. software development, cloud solutions, design, consulting), there are no “returns” of physical goods. This policy applies to cancellation of engagements and refund of payments, where applicable.
          </p>
          <h2>2. Service Engagements and Cancellation</h2>
          <p>
            Each IT consulting or technology project is governed by a separate agreement, statement of work (SOW), or proposal. If you wish to cancel an engagement, you must notify us in writing. Cancellation terms—including any charges for work already completed, non-recoverable costs, or notice period—will be as per the signed agreement. We will confirm receipt and next steps.
          </p>
          <h2>3. Refunds</h2>
          <p>
            Refund eligibility depends on the stage of the project and the terms agreed in your contract. Typically:
          </p>
          <ul>
            <li><strong>Before work has started:</strong> Full refund of any advance payment may be considered, subject to our agreement and any administrative or non-refundable costs stated in the agreement.</li>
            <li><strong>After work has started:</strong> Refunds may be partial, based on work completed, milestones delivered, and non-recoverable costs. The balance, if any, may be refunded as per the contract.</li>
            <li><strong>After delivery of agreed deliverables:</strong> Refunds are generally not applicable unless otherwise specified in the contract or required by applicable law.</li>
          </ul>
          <h2>4. Disputes and Resolution</h2>
          <p>
            If you are not satisfied with our IT services or consulting delivery, please contact us immediately. We will work with you in good faith to resolve the issue. Any dispute shall be governed by the laws of India and the terms of your agreement.
          </p>
          <h2>5. Processing Time</h2>
          <p>
            If a refund is approved, we will process it within a reasonable period (typically 7–14 business days) using the original payment method, unless otherwise agreed in writing.
          </p>
          <h2>6. Contact</h2>
          <p>
            For any queries regarding cancellations or refunds of our IT services or consulting engagements, please contact us via our Contact Us page or at info@alishbatech.com.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
