import { useEffect, useState } from 'react';
import {
  Mail, Phone, MapPin, Clock, MessageCircle, ArrowRight, CheckCircle2, Send,
  Copy, Check, ExternalLink, Navigation, Building2
} from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Contact.css';

const serviceOptions = [
  'Software Development', 'Finance Software', 'CRM', 'ERP',
  'Website Development', 'E-Commerce', 'Mobile App', 'AI Solution',
  'AI Chatbot', 'Business Automation', 'Digital Marketing', 'UI/UX Design',
  'IT Solutions', 'Custom Technology Solution', 'Other',
];

const budgetOptions = [
  'Not specified', 'Below ₹50,000', '₹50,000 – ₹1,00,000',
  '₹1,00,000 – ₹3,00,000', '₹3,00,000 – ₹5,00,000',
  '₹5,00,000 – ₹10,00,000', 'Above ₹10,00,000',
];

const contactMethods = ['Email', 'Phone', 'WhatsApp'];

const infoCards = [
  {
    Icon: Mail,
    title: 'Email',
    primary: 'zentavix@gmail.com',
    sub: 'We respond within 24 business hours',
    href: 'mailto:zentavix@gmail.com',
  },
  {
    Icon: Phone,
    title: 'Phone',
    primary: '+91 94453 70088',
    sub: 'Mon – Sat, 9:00 AM – 6:00 PM',
    href: 'tel:+919445370088',
  },
  {
    Icon: MessageCircle,
    title: 'WhatsApp',
    primary: 'Chat with Us',
    sub: 'Quick responses on WhatsApp',
    href: 'https://wa.me/919445370088',
    highlight: true,
  },
  {
    Icon: MapPin,
    title: 'Office Address',
    primary: 'No. 34, Sathyamoorthy Street (2nd Floor)',
    sub: 'Stuartpet, Arakkonam - 631001, Tamil Nadu',
    href: 'https://maps.google.com/?q=No.+34,+Sathyamoorthy+Street,+Stuartpet,+Arakkonam+-+631001',
  },
  {
    Icon: Clock,
    title: 'Business Hours',
    primary: 'Mon – Sat',
    sub: '9:00 AM – 6:00 PM IST',
    href: null,
  },
];

const emptyForm = {
  fullName: '', company: '', email: '', phone: '',
  service: '', details: '', budget: '', contactMethod: '',
};

export default function Contact() {
  useScrollReveal();
  const [form, setForm] = useState(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    const fullAddress = 'No. 34, Sathyamoorthy Street(2nd Floor), Stuartpet, Arakkonam - 631001';
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  useEffect(() => {
    document.title = 'Contact Zentavix | Let\'s Build Something Better';
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', 'Have an idea, a business challenge, or a digital project? Contact Zentavix and let\'s discuss how we can help you.');
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate send
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setForm(emptyForm);
    }, 1500);
  };

  return (
    <div className="page-wrapper">
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="hero contact-hero" aria-label="Contact Hero">
        <div className="container">
          <div className="hero-text" style={{ maxWidth: '600px' }}>
            <div className="hero-eyebrow">
              <span style={{ width: 6, height: 6, background: '#168BFF', borderRadius: '50%', display: 'inline-block' }} />
              CONTACT ZENTAVIX
            </div>
            <h1 className="hero-title">
              Let's Build Something <span className="accent">Better</span>
            </h1>
            <p className="hero-subtitle">
              Have an idea, a business challenge, or a digital project?
              Let's discuss how Zentavix can help.
            </p>
            <a
              href="https://wa.me/919445370088"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-white btn-lg"
            >
              <MessageCircle size={18} />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── FORM + INFO ───────────────────────────────────────── */}
      <section className="section contact-section" aria-label="Contact Form">
        <div className="container">
          <div className="contact-layout">
            {/* ── Form ──────────────────────────────────────── */}
            <div className="contact-form-wrap reveal-left">
              <h2 className="display-md" style={{ marginBottom: '8px' }}>Send an Enquiry</h2>
              <p className="body-md" style={{ marginBottom: '32px' }}>
                Fill in the details below and we'll get back to you promptly.
              </p>

              {submitted ? (
                <div className="contact-success" role="alert">
                  <CheckCircle2 size={48} color="#168BFF" />
                  <h3>Enquiry Sent!</h3>
                  <p>
                    Thank you for reaching out to Zentavix. We've received your message
                    and will get back to you within one business day.
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={() => setSubmitted(false)}
                  >
                    Send Another Enquiry
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  <div className="contact-form__row">
                    <div className="form-group">
                      <label htmlFor="fullName" className="form-label">
                        Full Name <span>*</span>
                      </label>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        className="form-input"
                        placeholder="Your full name"
                        value={form.fullName}
                        onChange={handleChange}
                        required
                        autoComplete="name"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="company" className="form-label">
                        Company Name
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        className="form-input"
                        placeholder="Your company (optional)"
                        value={form.company}
                        onChange={handleChange}
                        autoComplete="organization"
                      />
                    </div>
                  </div>

                  <div className="contact-form__row">
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">
                        Email Address <span>*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="form-input"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                        autoComplete="email"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone" className="form-label">
                        Phone Number <span>*</span>
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        className="form-input"
                        placeholder="+91 XXXXX XXXXX"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        autoComplete="tel"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="service" className="form-label">
                      Service Required <span>*</span>
                    </label>
                    <select
                      id="service"
                      name="service"
                      className="form-select"
                      value={form.service}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a service...</option>
                      {serviceOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="details" className="form-label">
                      Project Details <span>*</span>
                    </label>
                    <textarea
                      id="details"
                      name="details"
                      className="form-textarea"
                      placeholder="Tell us about your project, business challenge, or what you want to build..."
                      rows={5}
                      value={form.details}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="contact-form__row">
                    <div className="form-group">
                      <label htmlFor="budget" className="form-label">Budget Range</label>
                      <select
                        id="budget"
                        name="budget"
                        className="form-select"
                        value={form.budget}
                        onChange={handleChange}
                      >
                        <option value="">Select budget range...</option>
                        {budgetOptions.map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="contactMethod" className="form-label">
                        Preferred Contact Method
                      </label>
                      <select
                        id="contactMethod"
                        name="contactMethod"
                        className="form-select"
                        value={form.contactMethod}
                        onChange={handleChange}
                      >
                        <option value="">Select method...</option>
                        {contactMethods.map((m) => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-full"
                    disabled={submitting}
                    style={{ justifyContent: 'center', marginTop: '8px' }}
                    id="submit-enquiry"
                  >
                    {submitting ? (
                      <>Sending...</>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Enquiry
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* ── Contact Info ───────────────────────────────── */}
            <div className="contact-info reveal-right">
              <h2 className="heading-lg" style={{ marginBottom: '24px' }}>Contact Information</h2>

              {infoCards.map(({ Icon, title, primary, sub, href, highlight }) => (
                <div
                  key={title}
                  className={`info-card${highlight ? ' info-card--highlight' : ''}`}
                >
                  <div className="info-card__icon">
                    <Icon size={20} />
                  </div>
                  <div className="info-card__text">
                    <p className="info-card__title">{title}</p>
                    {href ? (
                      <a
                        href={href}
                        className="info-card__primary"
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {primary}
                      </a>
                    ) : (
                      <p className="info-card__primary">{primary}</p>
                    )}
                    <p className="info-card__sub">{sub}</p>
                  </div>
                </div>
              ))}

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/919445370088"
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-cta"
                id="whatsapp-chat-btn"
              >
                <MessageCircle size={22} />
                Chat With Us on WhatsApp
                <ArrowRight size={16} style={{ marginLeft: 'auto' }} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── LOCATION MAP ─────────────────────────────────────── */}
      <section className="contact-map" aria-label="Office Location">
        <div className="container">
          <div className="map-header reveal">
            <div className="hero-eyebrow" style={{ marginBottom: '12px' }}>
              <span style={{ width: 6, height: 6, background: '#168BFF', borderRadius: '50%', display: 'inline-block' }} />
              VISIT OUR HEADQUARTERS
            </div>
            <h2 className="heading-lg">Our Office Location</h2>
            <p className="body-md">
              No. 34, Sathyamoorthy Street (2nd Floor), Stuartpet, Arakkonam - 631001, Tamil Nadu, India
            </p>
          </div>

          <div className="map-wrapper reveal">
            <div className="map-container">
              <iframe
                title="Zentavix Headquarters Map"
                src="https://maps.google.com/maps?q=No.+34,+Sathyamoorthy+Street,+Stuartpet,+Arakkonam+-+631001&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="map-iframe"
              />
            </div>

            <div className="map-info-card">
              <div className="map-info-card__badge">
                <Building2 size={14} />
                ZENTAVIX HQ
              </div>
              <h3 className="map-info-card__title">Registered Office</h3>

              <div className="map-info-card__details">
                <div className="map-detail-item">
                  <MapPin size={18} className="map-detail-icon" />
                  <div>
                    <strong>Zentavix Private Limited</strong>
                    <p>No. 34, Sathyamoorthy Street (2nd Floor),</p>
                    <p>Stuartpet, Arakkonam - 631001</p>
                    <p>Tamil Nadu, India</p>
                  </div>
                </div>

                <div className="map-detail-item">
                  <Clock size={18} className="map-detail-icon" />
                  <div>
                    <strong>Business Hours</strong>
                    <p>Monday – Saturday: 9:00 AM – 6:00 PM IST</p>
                  </div>
                </div>

                <div className="map-detail-item">
                  <Phone size={18} className="map-detail-icon" />
                  <div>
                    <strong>Direct Contact</strong>
                    <p>+91 94453 70088</p>
                    <p>zentavix@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="map-info-card__actions">
                <a
                  href="https://maps.google.com/?q=No.+34,+Sathyamoorthy+Street,+Stuartpet,+Arakkonam+-+631001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary map-btn"
                >
                  <Navigation size={16} />
                  Get Directions
                </a>
                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="btn btn-secondary map-btn"
                >
                  {copied ? (
                    <>
                      <Check size={16} color="#10B981" />
                      Address Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      Copy Address
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
