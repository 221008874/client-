import { useState, useEffect } from 'react';
import './Navbar.css';
import logoSrc from '../assets/logo.png';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '/#features', label: 'المميزات' },
    { href: '/#about', label: 'عن النظام' },
    { href: '/#pricing', label: 'الأسعار' },
    { href: '/#download', label: 'التحميل' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <a href="/" className="nav-logo">
          <div className="logo-icon">
            <img src={logoSrc} alt="ZIARA" className="logo-img" />
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
          <a href="/#download" className="btn-primary nav-cta">تحميل مجاني</a>
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