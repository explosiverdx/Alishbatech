import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/admin/Login.css';
import AlishbaTechLogo from '../../assets/Alishbatech_logo.png';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(username, password);
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="login-card-wrapper">
        <div className="login-card">
          <div className="login-header">
            <div className="login-logo">
              <img 
                src={AlishbaTechLogo}
                alt="AlishbaTech Logo"
              />
            </div>
            <h2 className="login-title">Admin Login</h2>
            <p className="login-subtitle">Enter your credentials to continue</p>
          </div>

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-form-group">
              <label htmlFor="username">Username or Email</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="login-input"
                placeholder="Enter your username or email"
              />
            </div>

            <div className="login-form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="login-input"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="login-submit"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="login-back-link">
            <a href="/">← Back to website</a>
          </div>
        </div>
      </div>
    </div>
  );
}
