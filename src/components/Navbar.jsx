import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { navbarScroll } from '../motion/motionSystem';
import './Navbar.css';
import logoSrc from '../assets/logo.svg';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = ['features', 'about', 'pricing', 'download'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const links = [
    { href: '/#features', label: 'المميزات', id: 'features' },
    { href: '/#about', label: 'عن النظام', id: 'about' },
    { href: '/#pricing', label: 'الأسعار', id: 'pricing' },
    { href: '/#download', label: 'التحميل', id: 'download' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: [0.32, 0.72, 0, 1],
        staggerChildren: 0.03,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.32, 0.72, 0, 1],
        staggerChildren: 0.05,
        delayChildren: 0.05,
      },
    },
  };

  const mobileItemVariants = {
    closed: { opacity: 0, x: -16 },
    open: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <motion.nav
      className={`navbar${scrolled ? ' scrolled' : ''}`}
      variants={navbarScroll}
      initial="transparent"
      animate={scrolled ? 'solid' : 'transparent'}
    >
      <motion.div
        className="nav-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.a
          href="/"
          className="nav-logo"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            className="logo-icon"
            whileHover={{ rotate: [0, -3, 3, 0], transition: { duration: 0.5 } }}
          >
            <img src={logoSrc} alt="Zeyara" className="logo-img" />
          </motion.div>
          <span className="logo-text">Zeyara</span>
        </motion.a>

        {/* Desktop Links */}
        <motion.ul className="nav-links" variants={containerVariants}>
          {links.map(({ href, label, id }) => (
            <motion.li key={href} variants={itemVariants}>
              <a
                href={href}
                className={`nav-link${activeSection === id ? ' active' : ''}`}
              >
                {label}
              </a>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div className="nav-actions" variants={itemVariants}>
          <motion.a
            href="/#download"
            className="btn-primary nav-cta"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            تحميل مجاني
          </motion.a>
          <motion.button
            className={`hamburger${menuOpen ? ' active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="القائمة"
            whileTap={{ scale: 0.9 }}
          >
            <span /><span /><span />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setMenuOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              top: 64,
              background: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
              zIndex: 998,
            }}
          />
        )}
      </AnimatePresence>
    </motion.nav>
  );
}