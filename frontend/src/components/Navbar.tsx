import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';
import { AlishbaTechLogo } from '../constants/assets';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', href: '#home', isHash: true },
    { name: 'Services', href: '#services', isHash: true },
    { name: 'Portfolio', href: '#portfolio', isHash: true },
    { name: 'About', href: '#about', isHash: true },
    { name: 'Blog', href: '/blog', isHash: false },
    { name: 'Contact', href: '#contact', isHash: true },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isHash: boolean) => {
    if (isHash) {
      e.preventDefault();
      // If we're not on the home page, navigate to home with hash
      if (location.pathname !== '/') {
        navigate(`/${href}`);
      } else {
        // We're already on home page, just scroll
        const hash = href.substring(1);
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
      setMobileMenuOpen(false);
    } else {
      // Regular route navigation
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <img 
              src={AlishbaTechLogo}
              alt="AlishbaTech Logo"
            />
            <span className="navbar-logo-text">AlishbaTech</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="navbar-nav">
            {navLinks.map((link) => (
              link.isHash ? (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.isHash)}
                  className="navbar-link"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className="navbar-link"
                >
                  {link.name}
                </Link>
              )
            ))}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact', true)}
              className="navbar-btn"
            >
              Get Started
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-content">
            {navLinks.map((link) => (
              link.isHash ? (
                <a
                  key={link.name}
                  href={link.href}
                  className="mobile-menu-link"
                  onClick={(e) => handleNavClick(e, link.href, link.isHash)}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className="mobile-menu-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              )
            ))}
            <a
              href="#contact"
              className="mobile-menu-btn"
              onClick={(e) => handleNavClick(e, '#contact', true)}
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
