import { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import './Header.css';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Industries', to: '/industries' },
  { label: 'Contact', to: '/contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const headerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header
        ref={headerRef}
        className={`header${scrolled ? ' header--scrolled' : ''}`}
        role="banner"
      >
        <div className="container header__inner">
          {/* Logo */}
          <Link to="/" className="header__logo" aria-label="Zentavix Home">
            <img src="/logo.png" alt="Zentavix Logo" className="header__logo-img" />
            <span className="header__logo-text">
              <span className="header__logo-name">ZENTAVIX</span>
              <span className="header__logo-sub">PRIVATE LIMITED</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="header__nav" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `header__nav-link${isActive ? ' header__nav-link--active' : ''}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* CTA */}
          <div className="header__actions">
            <Link to="/contact" className="btn btn-primary btn-sm header__cta">
              Let's Talk
              <ArrowRight size={15} />
            </Link>

            {/* Hamburger */}
            <button
              className="header__hamburger"
              aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Overlay */}
      <div
        className={`mobile-nav__overlay${mobileOpen ? ' mobile-nav__overlay--open' : ''}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Nav */}
      <nav
        className={`mobile-nav${mobileOpen ? ' mobile-nav--open' : ''}`}
        aria-label="Mobile Navigation"
        aria-hidden={!mobileOpen}
      >
        <div className="mobile-nav__header">
          <Link to="/" className="header__logo" onClick={() => setMobileOpen(false)}>
            <img src="/logo.png" alt="Zentavix Logo" className="header__logo-img" />
            <span className="header__logo-text">
              <span className="header__logo-name">ZENTAVIX</span>
              <span className="header__logo-sub">PRIVATE LIMITED</span>
            </span>
          </Link>
          <button
            className="mobile-nav__close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
          >
            <X size={22} />
          </button>
        </div>

        <ul className="mobile-nav__links">
          {navLinks.map((link, i) => (
            <li key={link.to} style={{ '--i': i }}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `mobile-nav__link${isActive ? ' mobile-nav__link--active' : ''}`
                }
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
                <ArrowRight size={16} />
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="mobile-nav__footer">
          <Link
            to="/contact"
            className="btn btn-primary w-full"
            style={{ justifyContent: 'center' }}
            onClick={() => setMobileOpen(false)}
          >
            Let's Talk
            <ArrowRight size={16} />
          </Link>
          <p className="mobile-nav__tagline">Smart Technology. Digital Solutions. Business Growth.</p>
        </div>
      </nav>
    </>
  );
}
