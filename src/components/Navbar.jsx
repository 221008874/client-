import { useState, useEffect } from 'react';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#features', label: 'المميزات' },
    { href: '#about', label: 'عن النظام' },
    { href: '#pricing', label: 'الأسعار' },
    { href: '#download', label: 'التحميل' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <a href="#" className="nav-logo">
          <div className="logo-icon">
            <span className="logo-pulse" />
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#060d18" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M2 17l10 5 10-5" stroke="#060d18" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M2 12l10 5 10-5" stroke="#060d18" strokeWidth="2" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="logo-text">ZIARA</span>
        </a>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {links.map(({ href, label }) => (
            <li key={href}>
              <a href={href} className="nav-link" onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <a href="#download" className="btn-primary nav-cta">تحميل مجاني</a>
          <button
            className={`hamburger ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="القائمة"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </nav>
  );
}