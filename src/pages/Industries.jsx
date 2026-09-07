import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import {
  ShoppingBag, GraduationCap, Heart, Factory, Banknote, Building,
  Truck, Hotel, ShoppingCart, Briefcase, Rocket, Store,
  TrendingUp, Wrench, ArrowRight,
  Code2, Globe, Brain, Zap, BarChart3, Layers
} from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Industries.css';

const industries = [
  {
    num: '01', Icon: ShoppingBag, title: 'Retail',
    desc: 'Improve customer engagement, inventory visibility, sales operations, digital presence, and automation.',
    solutions: ['POS Integration', 'Inventory Software', 'E-Commerce', 'Digital Marketing'],
  },
  {
    num: '02', Icon: GraduationCap, title: 'Education',
    desc: 'Digital platforms, student management systems, e-learning, and administrative tools for educational institutions.',
    solutions: ['Learning Management', 'Student Portals', 'Fee Management', 'Mobile Apps'],
  },
  {
    num: '03', Icon: Heart, title: 'Healthcare',
    desc: 'Technology to support patient management, appointments, digital presence, and operational workflows.',
    solutions: ['Patient Management', 'Appointment Systems', 'Digital Presence', 'Automation'],
  },
  {
    num: '04', Icon: Factory, title: 'Manufacturing',
    desc: 'Operations management, inventory tracking, production dashboards, and process automation solutions.',
    solutions: ['ERP Solutions', 'Inventory Tracking', 'Production Dashboards', 'Automation'],
  },
  {
    num: '05', Icon: Banknote, title: 'Finance',
    desc: 'Financial software, reporting systems, client management, and digital services for finance businesses.',
    solutions: ['Finance Software', 'Reporting Systems', 'CRM', 'Digital Services'],
  },
  {
    num: '06', Icon: Building, title: 'Real Estate',
    desc: 'Property listing platforms, CRM systems, digital marketing, and client management solutions.',
    solutions: ['Property Portals', 'CRM Solutions', 'Digital Marketing', 'Mobile Apps'],
  },
  {
    num: '07', Icon: Truck, title: 'Logistics & Transportation',
    desc: 'Fleet management, delivery tracking, operations automation, and digital tools for logistics businesses.',
    solutions: ['Fleet Management', 'Tracking Systems', 'Operations Software', 'Automation'],
  },
  {
    num: '08', Icon: Hotel, title: 'Hospitality',
    desc: 'Booking systems, guest experience tools, digital presence, and operational management for hospitality.',
    solutions: ['Booking Systems', 'Guest Management', 'Digital Presence', 'Automation'],
  },
  {
    num: '09', Icon: ShoppingCart, title: 'E-Commerce',
    desc: 'Complete e-commerce platforms, product management, marketing integrations, and customer experience.',
    solutions: ['E-Commerce Development', 'Product Management', 'Digital Marketing', 'AI Solutions'],
  },
  {
    num: '10', Icon: Briefcase, title: 'Professional Services',
    desc: 'Client management, billing software, digital presence, and workflow automation for service businesses.',
    solutions: ['CRM Solutions', 'Billing Software', 'Website Development', 'Automation'],
  },
  {
    num: '11', Icon: Rocket, title: 'Startups',
    desc: 'MVP development, product design, technology consulting, and scalable digital solutions for startups.',
    solutions: ['MVP Development', 'Product Design', 'Technology Consulting', 'SaaS Development'],
  },
  {
    num: '12', Icon: Store, title: 'Small & Medium Businesses',
    desc: 'Practical, affordable technology solutions to help SMBs compete digitally and operate efficiently.',
    solutions: ['Website Development', 'Business Software', 'Digital Marketing', 'Automation'],
  },
  {
    num: '13', Icon: TrendingUp, title: 'Growing Enterprises',
    desc: 'Scalable software, integrations, and digital transformation support for businesses in growth phase.',
    solutions: ['ERP Solutions', 'Custom Software', 'Integrations', 'Digital Transformation'],
  },
  {
    num: '14', Icon: Wrench, title: 'Service Businesses',
    desc: 'Online booking, customer management, digital marketing, and operational tools for service companies.',
    solutions: ['Booking Systems', 'Customer Management', 'Digital Marketing', 'Mobile Apps'],
  },
];

const crossSolutions = [
  { Icon: Code2, label: 'Software' },
  { Icon: Zap, label: 'Automation' },
  { Icon: Brain, label: 'AI' },
  { Icon: Globe, label: 'Web' },
  { Icon: Globe, label: 'Mobile' },
  { Icon: TrendingUp, label: 'Marketing' },
  { Icon: BarChart3, label: 'Analytics' },
  { Icon: Layers, label: 'Integrations' },
];

export default function Industries() {
  useScrollReveal();

  useEffect(() => {
    document.title = 'Industries | Technology Solutions for Modern Businesses | Zentavix';
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', 'Zentavix provides flexible digital solutions for retail, education, healthcare, manufacturing, finance, real estate, logistics, startups, and more.');
  }, []);

  return (
    <div className="page-wrapper">
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="hero industries-hero" aria-label="Industries Hero">
        <div className="container">
          <div className="hero-text" style={{ maxWidth: '640px' }}>
            <div className="hero-eyebrow">
              <span style={{ width: 6, height: 6, background: '#168BFF', borderRadius: '50%', display: 'inline-block' }} />
              INDUSTRIES WE SERVE
            </div>
            <h1 className="hero-title">
              Technology for <span className="accent">Every Industry</span>
            </h1>
            <p className="hero-subtitle">
              Flexible digital solutions designed to support different business
              models, workflows, and growth goals.
            </p>
            <div className="hero-actions">
              <Link to="/contact" className="btn btn-white btn-lg">
                Talk to Our Team
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── INDUSTRY CARDS ───────────────────────────────────── */}
      <section className="section" aria-label="Industry Cards">
        <div className="container">
          <div className="section-header reveal">
            <span className="eyebrow">Sectors We Serve</span>
            <h2 className="display-md">Industries We Work With</h2>
            <p className="body-lg">
              From startups to enterprises, we bring tailored technology solutions
              to businesses across every major industry.
            </p>
          </div>
          <div className="ind-grid">
            {industries.map(({ num, Icon, title, desc, solutions }, i) => (
              <div key={num} className={`ind-card reveal reveal-delay-${(i % 4) + 1}`}>
                <div className="ind-card__top">
                  <div className="ind-card__icon">
                    <Icon size={24} />
                  </div>
                  <span className="ind-card__num">{num}</span>
                </div>
                <h3 className="ind-card__title">{title}</h3>
                <p className="ind-card__desc">{desc}</p>
                <div className="ind-card__solutions">
                  {solutions.map((s) => (
                    <span key={s} className="badge ind-card__badge">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CROSS INDUSTRY ───────────────────────────────────── */}
      <section className="section section-dark ind-cross" aria-label="Cross Industry Solutions">
        <div className="container">
          <div className="section-header reveal">
            <span className="eyebrow" style={{ color: '#7CC8FF' }}>Flexible Technology</span>
            <h2 className="display-md text-white">Technology That Adapts to Your Business</h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.0625rem', maxWidth: '560px', margin: '0 auto', lineHeight: '1.7' }}>
              Whatever your industry, Zentavix can adapt technology to your business
              model and operational needs.
            </p>
          </div>
          <div className="ind-cross__grid">
            {crossSolutions.map(({ Icon, label }, i) => (
              <div key={`${label}-${i}`} className={`ind-cross__item reveal reveal-delay-${(i % 4) + 1}`}>
                <div className="ind-cross__icon">
                  <Icon size={26} />
                </div>
                <span className="ind-cross__label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="section ind-cta" aria-label="Industries CTA">
        <div className="container text-center reveal">
          <span className="eyebrow" style={{ justifyContent: 'center' }}>Let's Connect</span>
          <h2 className="display-md" style={{ margin: '16px auto 16px', maxWidth: '520px' }}>
            Let's Discuss Your Industry
          </h2>
          <p className="body-lg" style={{ marginBottom: '40px', maxWidth: '480px', margin: '0 auto 40px' }}>
            Share your business challenges and goals. We'll identify the right
            technology solution for your specific industry.
          </p>
          <Link to="/contact" className="btn btn-primary btn-lg">
            Talk to Our Team
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
