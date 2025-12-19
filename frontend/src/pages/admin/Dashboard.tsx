import { useEffect, useState } from 'react';
import { adminDashboardAPI } from '../../lib/adminApi';
import '../../styles/admin/Dashboard.css';
import '../../styles/admin/common.css';

interface DashboardStats {
  contacts: {
    total: number;
    today: number;
    thisWeek: number;
  };
  projects: {
    total: number;
    featured: number;
  };
  subscribers: {
    total: number;
    today: number;
  };
  recentContacts: Array<{
    name: string;
    email: string;
    subject: string;
    createdAt: string;
  }>;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const response = await adminDashboardAPI.getStats();
      setStats(response.stats);
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!stats) {
    return <div style={{ color: '#dc2626' }}>Failed to load dashboard statistics</div>;
  }

  const statCards = [
    {
      title: 'Total Contacts',
      value: stats.contacts.total,
      change: `+${stats.contacts.thisWeek} this week`,
      icon: '📧',
      colorClass: 'blue',
    },
    {
      title: 'Total Projects',
      value: stats.projects.total,
      change: `${stats.projects.featured} featured`,
      icon: '📁',
      colorClass: 'purple',
    },
    {
      title: 'Subscribers',
      value: stats.subscribers.total,
      change: `+${stats.subscribers.today} today`,
      icon: '📬',
      colorClass: 'green',
    },
    {
      title: 'Today\'s Contacts',
      value: stats.contacts.today,
      change: 'New messages',
      icon: '📥',
      colorClass: 'orange',
    },
  ];

  return (
    <div className="dashboard">
      {/* Stats Cards */}
      <div className="stats-grid">
        {statCards.map((card, index) => (
          <div key={index} className="stat-card">
            <div className={`stat-icon ${card.colorClass}`}>
              {card.icon}
            </div>
            <h3 className="stat-title">{card.title}</h3>
            <p className="stat-value">{card.value}</p>
            <p className={`stat-change ${card.colorClass}`}>{card.change}</p>
          </div>
        ))}
      </div>

      {/* Recent Contacts */}
      <div className="recent-contacts">
        <h2 className="table-title">Recent Contacts</h2>
        {stats.recentContacts.length === 0 ? (
          <p className="no-data">No contacts yet</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Subject</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentContacts.map((contact, index) => (
                  <tr key={index}>
                    <td className="primary">{contact.name}</td>
                    <td className="secondary">{contact.email}</td>
                    <td className="secondary">{contact.subject}</td>
                    <td className="tertiary">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
