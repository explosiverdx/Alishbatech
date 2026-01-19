import '../../styles/demos/DemoPage.css';

export default function FinTechDashboardDemo() {
  const stats = [
    { label: 'Total Revenue', value: '$2,547,890', change: '+12.5%', trend: 'up' },
    { label: 'Active Users', value: '45,231', change: '+8.2%', trend: 'up' },
    { label: 'Transactions', value: '12,456', change: '+15.3%', trend: 'up' },
    { label: 'Avg. Order Value', value: '$124.50', change: '-2.1%', trend: 'down' },
  ];

  const transactions = [
    { id: 1, name: 'John Doe', amount: '$1,250.00', type: 'Deposit', status: 'Completed', date: '2024-01-17' },
    { id: 2, name: 'Jane Smith', amount: '$850.00', type: 'Withdrawal', status: 'Pending', date: '2024-01-17' },
    { id: 3, name: 'Bob Johnson', amount: '$2,100.00', type: 'Transfer', status: 'Completed', date: '2024-01-16' },
    { id: 4, name: 'Alice Brown', amount: '$500.00', type: 'Deposit', status: 'Completed', date: '2024-01-16' },
  ];

  return (
    <div className="demo-page" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)' }}>
      <div className="demo-hero">
        <h1>FinTech Dashboard Demo</h1>
        <p>Real-time financial analytics and transaction management</p>
      </div>

      <div className="demo-content">
        <section className="demo-section">
          <h2>Key Metrics</h2>
          <div className="demo-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
            {stats.map((stat, index) => (
              <div key={index} className="demo-card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>{stat.label}</div>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#111827', marginBottom: '0.5rem' }}>
                  {stat.value}
                </div>
                <div style={{ 
                  color: stat.trend === 'up' ? '#10b981' : '#ef4444',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.25rem'
                }}>
                  {stat.trend === 'up' ? '↑' : '↓'} {stat.change}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="demo-section">
          <h2>Revenue Chart</h2>
          <div className="chart-container">
            <div className="chart-bars">
              {[65, 78, 82, 75, 88, 92, 85].map((height, index) => (
                <div key={index} className="chart-bar-wrapper">
                  <div 
                    className="chart-bar" 
                    style={{ 
                      height: `${height}%`,
                      background: 'linear-gradient(180deg, #3b82f6, #2563eb)'
                    }}
                  >
                    <span style={{ fontSize: '0.75rem', color: 'white', fontWeight: 600 }}>${(height * 100).toLocaleString()}</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.5rem' }}>
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="demo-section">
          <h2>Recent Transactions</h2>
          <div className="table-container">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600 }}>Name</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600 }}>Type</th>
                  <th style={{ padding: '1rem', textAlign: 'right', fontWeight: 600 }}>Amount</th>
                  <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 600 }}>Status</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600 }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '1rem' }}>{tx.name}</td>
                    <td style={{ padding: '1rem' }}>{tx.type}</td>
                    <td style={{ padding: '1rem', textAlign: 'right', fontWeight: 600 }}>{tx.amount}</td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        background: tx.status === 'Completed' ? '#d1fae5' : '#fef3c7',
                        color: tx.status === 'Completed' ? '#059669' : '#d97706'
                      }}>
                        {tx.status}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', color: '#6b7280' }}>{tx.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="demo-section">
          <h2>Portfolio Distribution</h2>
          <div className="portfolio-chart">
            <div className="pie-chart">
              <div className="pie-segment" style={{ 
                background: 'conic-gradient(#3b82f6 0% 35%, #8b5cf6 35% 60%, #10b981 60% 80%, #f59e0b 80% 100%)',
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                margin: '0 auto'
              }}></div>
            </div>
            <div className="portfolio-legend">
              <div className="legend-item">
                <div style={{ width: '16px', height: '16px', background: '#3b82f6', borderRadius: '4px' }}></div>
                <span>Stocks: 35%</span>
              </div>
              <div className="legend-item">
                <div style={{ width: '16px', height: '16px', background: '#8b5cf6', borderRadius: '4px' }}></div>
                <span>Bonds: 25%</span>
              </div>
              <div className="legend-item">
                <div style={{ width: '16px', height: '16px', background: '#10b981', borderRadius: '4px' }}></div>
                <span>Crypto: 20%</span>
              </div>
              <div className="legend-item">
                <div style={{ width: '16px', height: '16px', background: '#f59e0b', borderRadius: '4px' }}></div>
                <span>Cash: 20%</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
