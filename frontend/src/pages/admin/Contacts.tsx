import { useEffect, useState } from 'react';
import { adminContactsAPI } from '../../lib/adminApi';
import '../../styles/admin/common.css';
import '../../styles/admin/Dashboard.css';

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: string;
}

export default function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  useEffect(() => {
    loadContacts();
  }, [page, search]);

  const loadContacts = async () => {
    try {
      setLoading(true);
      const response = await adminContactsAPI.getAll(page, 10, search);
      setContacts(response.data);
      setTotalPages(response.pagination.pages);
    } catch (error) {
      console.error('Failed to load contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact?')) return;

    try {
      await adminContactsAPI.delete(id);
      loadContacts();
    } catch (error) {
      console.error('Failed to delete contact:', error);
      alert('Failed to delete contact');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    loadContacts();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Search Bar */}
      <div className="search-wrapper">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, phone, or subject..."
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

      {/* Contacts Table */}
      <div className="admin-table-wrapper">
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
        ) : contacts.length === 0 ? (
          <div className="empty-state">No contacts found</div>
        ) : (
          <>
            <div className="admin-table">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Subject</th>
                    <th>Date</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <tr
                      key={contact._id}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setSelectedContact(contact)}
                    >
                      <td className="primary">{contact.name}</td>
                      <td className="secondary">{contact.email}</td>
                      <td className="secondary">{contact.phone || '-'}</td>
                      <td className="secondary">{contact.subject}</td>
                      <td className="tertiary">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(contact._id);
                          }}
                          className="admin-btn admin-btn-danger"
                          style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}
                        >
                          Delete
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

      {/* Contact Detail Modal */}
      {selectedContact && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedContact(null)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2 className="modal-title">Contact Details</h2>
              <button
                onClick={() => setSelectedContact(null)}
                className="modal-close"
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="admin-form" style={{ gap: '1.5rem' }}>
                <div className="admin-form-group">
                  <label>Name</label>
                  <p style={{ marginTop: '0.5rem', color: 'inherit' }}>{selectedContact.name}</p>
                </div>
                <div className="admin-form-group">
                  <label>Email</label>
                  <p style={{ marginTop: '0.5rem', color: 'inherit' }}>{selectedContact.email}</p>
                </div>
                <div className="admin-form-group">
                  <label>Phone</label>
                  <p style={{ marginTop: '0.5rem', color: 'inherit' }}>{selectedContact.phone || 'Not provided'}</p>
                </div>
                <div className="admin-form-group">
                  <label>Subject</label>
                  <p style={{ marginTop: '0.5rem', color: 'inherit' }}>{selectedContact.subject}</p>
                </div>
                <div className="admin-form-group">
                  <label>Message</label>
                  <p style={{ marginTop: '0.5rem', color: 'inherit', whiteSpace: 'pre-wrap' }}>{selectedContact.message}</p>
                </div>
                <div className="admin-form-group">
                  <label>Date</label>
                  <p style={{ marginTop: '0.5rem', color: 'inherit' }}>
                    {new Date(selectedContact.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
