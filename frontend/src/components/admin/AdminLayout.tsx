import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/admin/Layout.css';
import { AlishbaTechLogo } from '../../constants/assets';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { admin, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/contacts', label: 'Contacts', icon: '📧' },
    { path: '/admin/projects', label: 'Projects', icon: '📁' },
    { path: '/admin/subscribers', label: 'Subscribers', icon: '📬' },
    ...(admin?.role === 'superadmin' ? [{ path: '/admin/admins', label: 'Admins', icon: '👥' }] : []),
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <div className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        {/* Logo */}
        <div className="sidebar-logo">
          {sidebarOpen ? (
            <Link to="/admin/dashboard" className="sidebar-logo-link">
              <img 
                src={AlishbaTechLogo}
                alt="AlishbaTech Logo"
              />
              <span className="sidebar-logo-text">Admin</span>
            </Link>
          ) : (
            <Link to="/admin/dashboard" className="sidebar-logo-link">
              <img 
                src={AlishbaTechLogo}
                alt="AlishbaTech Logo"
              />
            </Link>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="sidebar-toggle">
            {sidebarOpen ? '←' : '→'}
          </button>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="sidebar-nav-icon">{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* User Info & Logout */}
        <div className="sidebar-user">
          {admin && (
            <Link
              to="/admin/profile"
              className={`sidebar-profile-link ${location.pathname === '/admin/profile' ? 'active' : ''}`}
            >
              {(admin as any).profilePicture ? (
                <img
                  src={(admin as any).profilePicture}
                  alt={admin.username}
                  className="sidebar-avatar"
                />
              ) : (
                <div className="sidebar-avatar-placeholder">
                  {admin.username?.charAt(0).toUpperCase()}
                </div>
              )}
              {sidebarOpen && (
                <div className="sidebar-user-info">
                  <p className="sidebar-username">{admin.username}</p>
                  <p className="sidebar-email">{admin.email}</p>
                </div>
              )}
            </Link>
          )}
          <button onClick={handleLogout} className="sidebar-logout">
            <span>🚪</span>
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`admin-main ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        {/* Top Header */}
        <header className="admin-header">
          <h1 className="admin-header-title">
            {menuItems.find((item) => item.path === location.pathname)?.label || 'Dashboard'}
          </h1>
          <div className="admin-header-actions">
            <a href="/" target="_blank" className="admin-header-link">
              View Website →
            </a>
          </div>
        </header>

        {/* Page Content */}
        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}
