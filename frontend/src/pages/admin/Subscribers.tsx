import { useEffect, useState } from 'react';
import { adminSubscribersAPI } from '../../lib/adminApi';
import '../../styles/admin/common.css';
import '../../styles/admin/Dashboard.css';

interface Subscriber {
  _id: string;
  email: string;
  name?: string;
  subscribed: boolean;
  createdAt: string;
}

export default function Subscribers() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadSubscribers();
  }, [page, search]);

  const loadSubscribers = async () => {
    try {
      setLoading(true);
      const response = await adminSubscribersAPI.getAll(page, 10, search);
      setSubscribers(response.data);
      setTotalPages(response.pagination.pages);
    } catch (error) {
      console.error('Failed to load subscribers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this subscriber?')) return;

    try {
      await adminSubscribersAPI.delete(id);
      loadSubscribers();
    } catch (error) {
      console.error('Failed to delete subscriber:', error);
      alert('Failed to delete subscriber');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    loadSubscribers();
  };

  const exportSubscribers = () => {
    const csv = [
      ['Email', 'Name', 'Subscribed', 'Date'].join(','),
      ...subscribers.map((s) =>
        [
          s.email,
          s.name || '',
          s.subscribed ? 'Yes' : 'No',
          new Date(s.createdAt).toLocaleDateString(),
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const activeCount = subscribers.filter((s) => s.subscribed).length;
  const unsubscribedCount = subscribers.filter((s) => !s.subscribed).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="table-title">Newsletter Subscribers</h2>
        <button onClick={exportSubscribers} className="admin-btn admin-btn-success">
          📥 Export CSV
        </button>
      </div>

      {/* Search Bar */}
      <div className="search-wrapper">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by email or name..."
            className="search-input"
          />
          <button type="submit" className="admin-btn admin-btn-primary">
            Search
          </button>
          {search && (
            <button
              type="button"
              onClick={() => {
                setSearch('');
                setPage(1);
              }}
              className="admin-btn admin-btn-secondary"
            >
              Clear
            </button>
          )}
        </form>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">📊</div>
          <h3 className="stat-title">Total Subscribers</h3>
          <p className="stat-value">{subscribers.length}</p>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">✓</div>
          <h3 className="stat-title">Active</h3>
          <p className="stat-value">{activeCount}</p>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange">✗</div>
          <h3 className="stat-title">Unsubscribed</h3>
          <p className="stat-value">{unsubscribedCount}</p>
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="admin-table-wrapper">
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
        ) : subscribers.length === 0 ? (
          <div className="empty-state">No subscribers found</div>
        ) : (
          <>
            <div className="admin-table">
              <table>
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((subscriber) => (
                    <tr key={subscriber._id}>
                      <td className="primary">{subscriber.email}</td>
                      <td className="secondary">{subscriber.name || '—'}</td>
                      <td>
                        <span className={`badge ${subscriber.subscribed ? 'badge-green' : 'badge-red'}`}>
                          {subscriber.subscribed ? 'Subscribed' : 'Unsubscribed'}
                        </span>
                      </td>
                      <td className="tertiary">
                        {new Date(subscriber.createdAt).toLocaleDateString()}
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          onClick={() => handleDelete(subscriber._id)}
                          className="admin-btn admin-btn-danger"
                          style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  className="admin-btn admin-btn-secondary"
                >
                  Previous
                </button>
                <span className="pagination-info">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                  className="admin-btn admin-btn-secondary"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
