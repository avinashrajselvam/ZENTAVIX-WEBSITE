import { Link } from 'react-router-dom';
import {
  Mail, Phone, MapPin, MessageCircle,
  ArrowRight
} from 'lucide-react';

// Reliable SVG Social Icons
const LinkedinIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const YoutubeIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

import './Footer.css';

const company = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Industries', to: '/industries' },
  { label: 'Contact', to: '/contact' },
];

const services = [
  { label: 'Software Solutions', to: '/services' },
  { label: 'Web & Mobile', to: '/services' },
  { label: 'AI Solutions', to: '/services' },
  { label: 'Automation', to: '/services' },
  { label: 'Digital Marketing', to: '/services' },
  { label: 'UI/UX Design', to: '/services' },
  { label: 'IT Services', to: '/services' },
  { label: 'Custom Solutions', to: '/services' },
];

const industries = [
  { label: 'Retail', to: '/industries' },
  { label: 'Education', to: '/industries' },
  { label: 'Healthcare', to: '/industries' },
  { label: 'Manufacturing', to: '/industries' },
  { label: 'Finance', to: '/industries' },
  { label: 'Real Estate', to: '/industries' },
  { label: 'Logistics', to: '/industries' },
  { label: 'Hospitality', to: '/industries' },
];

const legal = [
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms & Conditions', to: '/terms' },
  { label: 'Cookie Policy', to: '/cookies' },
];

const socials = [
  { Icon: ({ size }) => <LinkedinIcon width={size} height={size} />, label: 'LinkedIn', href: '#' },
  { Icon: ({ size }) => <InstagramIcon width={size} height={size} />, label: 'Instagram', href: '#' },
  { Icon: ({ size }) => <FacebookIcon width={size} height={size} />, label: 'Facebook', href: '#' },
  { Icon: ({ size }) => <YoutubeIcon width={size} height={size} />, label: 'YouTube', href: '#' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      {/* Top CTA Bar */}
      <div className="footer__cta-bar">
        <div className="container footer__cta-inner">
          <div>
            <p className="footer__cta-label">Ready to Start?</p>
            <h3 className="footer__cta-title">Let's Build Something Smarter Together.</h3>
          </div>
          <Link to="/contact" className="btn btn-white btn-lg footer__cta-btn">
            Get a Free Consultation
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="footer__main">
        <div className="container">
          <div className="footer__grid">
            {/* Brand Column */}
            <div className="footer__brand">
              <Link to="/" className="footer__logo">
                <img src="/logo.png" alt="Zentavix Logo" className="footer__logo-img" />
                <div className="footer__logo-text">
                  <span className="footer__logo-name">ZENTAVIX</span>
                  <span className="footer__logo-sub">PRIVATE LIMITED</span>
                </div>
              </Link>
              <p className="footer__tagline">
                Smart Technology. Digital Solutions. Business Growth.
              </p>
              <div className="footer__contact-list">
                <a href="mailto:zentavix@gmail.com" className="footer__contact-item">
                  <Mail size={15} />
                  <span>zentavix@gmail.com</span>
                </a>
                <a href="tel:+919445370088" className="footer__contact-item">
                  <Phone size={15} />
                  <span>+91 94453 70088</span>
                </a>
                <a
                  href="https://wa.me/919445370088"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__contact-item"
                >
                  <MessageCircle size={15} />
                  <span>WhatsApp Us</span>
                </a>
                <span className="footer__contact-item">
                  <MapPin size={15} />
                  <span>India</span>
                </span>
              </div>

              {/* Socials */}
              <div className="footer__socials">
                {socials.map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="footer__social-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon size={17} />
                  </a>
                ))}
              </div>
            </div>

            {/* Company Column */}
            <div className="footer__col">
              <h4 className="footer__col-title">Company</h4>
              <ul className="footer__links">
                {company.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="footer__link">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Column */}
            <div className="footer__col">
              <h4 className="footer__col-title">Services</h4>
              <ul className="footer__links">
                {services.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="footer__link">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Industries Column */}
            <div className="footer__col">
              <h4 className="footer__col-title">Industries</h4>
              <ul className="footer__links">
                {industries.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="footer__link">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Column */}
            <div className="footer__col">
              <h4 className="footer__col-title">Legal</h4>
              <ul className="footer__links">
                {legal.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="footer__link">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copy">
            © {year} Zentavix Private Limited. All Rights Reserved.
          </p>
          <p className="footer__made">
            Smart Technology · Digital Solutions · Business Growth
          </p>
        </div>
      </div>
    </footer>
  );
}
