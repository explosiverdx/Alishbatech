import { useState } from 'react';
import '../../styles/demos/DemoPage.css';

export default function AICRMDemo() {
  const [leads, _setLeads] = useState([
    { id: 1, name: 'John Smith', company: 'Tech Corp', status: 'New', score: 95, email: 'john@techcorp.com' },
    { id: 2, name: 'Sarah Johnson', company: 'Design Studio', status: 'Contacted', score: 87, email: 'sarah@design.com' },
    { id: 3, name: 'Mike Davis', company: 'StartupXYZ', status: 'Qualified', score: 92, email: 'mike@startup.com' },
  ]);

  const [insights] = useState([
    { type: 'Prediction', text: 'High probability of conversion for Tech Corp (95%)', icon: '🔮' },
    { type: 'Recommendation', text: 'Schedule follow-up call with Design Studio', icon: '💡' },
    { type: 'Alert', text: 'StartupXYZ shows strong buying signals', icon: '⚠️' },
  ]);

  return (
    <div className="demo-page" style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' }}>
      <div className="demo-hero">
        <h1>AI-Powered CRM Demo</h1>
        <p>Customer relationship management with AI-driven insights and automation</p>
      </div>

      <div className="demo-content">
        <section className="demo-section">
          <h2>AI Lead Scoring</h2>
          <div className="demo-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            {leads.map((lead) => (
              <div key={lead.id} className="demo-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                  <div>
                    <h3 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{lead.name}</h3>
                    <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>{lead.company}</p>
                  </div>
                  <div style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '9999px',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    background: lead.status === 'New' ? '#dbeafe' : lead.status === 'Contacted' ? '#fef3c7' : '#d1fae5',
                    color: lead.status === 'New' ? '#2563eb' : lead.status === 'Contacted' ? '#d97706' : '#059669'
                  }}>
                    {lead.status}
                  </div>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>AI Score</span>
                    <span style={{ fontWeight: 700, color: '#10b981' }}>{lead.score}/100</span>
                  </div>
                  <div style={{ height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ 
                      height: '100%', 
                      width: `${lead.score}%`, 
                      background: 'linear-gradient(90deg, #10b981, #059669)',
                      borderRadius: '4px'
                    }}></div>
                  </div>
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>📧 {lead.email}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="demo-section">
          <h2>AI Insights & Recommendations</h2>
          <div className="insights-list">
            {insights.map((insight, index) => (
              <div key={index} className="insight-card" style={{ 
                padding: '1.5rem', 
                background: '#f9fafb', 
                borderRadius: '0.75rem',
                marginBottom: '1rem',
                display: 'flex',
                gap: '1rem',
                alignItems: 'start'
              }}>
                <div style={{ fontSize: '2rem' }}>{insight.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, marginBottom: '0.25rem', color: '#3b82f6' }}>{insight.type}</div>
                  <p style={{ color: '#4b5563' }}>{insight.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="demo-section">
          <h2>Sales Pipeline</h2>
          <div className="pipeline-demo">
            <div className="pipeline-stage">
              <h4 style={{ marginBottom: '1rem', color: '#6b7280' }}>Prospecting (12)</h4>
              <div style={{ padding: '0.5rem', background: '#dbeafe', borderRadius: '0.25rem', marginBottom: '0.5rem' }}>Tech Corp</div>
              <div style={{ padding: '0.5rem', background: '#dbeafe', borderRadius: '0.25rem' }}>Design Studio</div>
            </div>
            <div className="pipeline-stage">
              <h4 style={{ marginBottom: '1rem', color: '#6b7280' }}>Qualification (8)</h4>
              <div style={{ padding: '0.5rem', background: '#fef3c7', borderRadius: '0.25rem', marginBottom: '0.5rem' }}>StartupXYZ</div>
              <div style={{ padding: '0.5rem', background: '#fef3c7', borderRadius: '0.25rem' }}>Innovate Inc</div>
            </div>
            <div className="pipeline-stage">
              <h4 style={{ marginBottom: '1rem', color: '#6b7280' }}>Proposal (5)</h4>
              <div style={{ padding: '0.5rem', background: '#e0e7ff', borderRadius: '0.25rem', marginBottom: '0.5rem' }}>Global Tech</div>
            </div>
            <div className="pipeline-stage">
              <h4 style={{ marginBottom: '1rem', color: '#6b7280' }}>Negotiation (3)</h4>
              <div style={{ padding: '0.5rem', background: '#fce7f3', borderRadius: '0.25rem' }}>Enterprise Co</div>
            </div>
            <div className="pipeline-stage">
              <h4 style={{ marginBottom: '1rem', color: '#6b7280' }}>Closed Won (15)</h4>
              <div style={{ padding: '0.5rem', background: '#d1fae5', borderRadius: '0.25rem', marginBottom: '0.5rem' }}>Success Corp</div>
              <div style={{ padding: '0.5rem', background: '#d1fae5', borderRadius: '0.25rem' }}>Winner Inc</div>
            </div>
          </div>
        </section>

        <section className="demo-section">
          <h2>Automation Rules</h2>
          <div className="automation-list">
            <div className="automation-item">
              <div style={{ fontSize: '1.5rem', marginRight: '1rem' }}>🤖</div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Auto-assign High-Score Leads</h4>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Automatically assign leads with score {'>'} 90 to top sales rep</p>
              </div>
              <div style={{ padding: '0.25rem 0.75rem', background: '#d1fae5', color: '#059669', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 600 }}>Active</div>
            </div>
            <div className="automation-item">
              <div style={{ fontSize: '1.5rem', marginRight: '1rem' }}>📧</div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Follow-up Email Sequence</h4>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Send personalized follow-up emails after 3 days of no contact</p>
              </div>
              <div style={{ padding: '0.25rem 0.75rem', background: '#d1fae5', color: '#059669', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 600 }}>Active</div>
            </div>
            <div className="automation-item">
              <div style={{ fontSize: '1.5rem', marginRight: '1rem' }}>🔔</div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Deal Stage Alerts</h4>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Notify manager when deals move to negotiation stage</p>
              </div>
              <div style={{ padding: '0.25rem 0.75rem', background: '#d1fae5', color: '#059669', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 600 }}>Active</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
