import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Code2, Globe, Brain, Zap, TrendingUp, Palette, Server, Layers,
  ArrowRight, CheckCircle2, ChevronRight
} from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Services.css';

const categories = [
  {
    id: 'software',
    Icon: Code2,
    num: '01',
    title: 'Software & Business Solutions',
    desc: 'Build smarter business operations with software designed around your workflows, teams, and goals.',
    items: [
      'Custom Software Development', 'Finance Software', 'CRM Solutions',
      'ERP Solutions', 'HR & Employee Management', 'Inventory Management',
      'Billing & Invoicing Software', 'Sales & Lead Management',
      'Business Management Software', 'Business Analytics & Reporting',
      'Dashboard & Reporting Systems',
    ],
  },
  {
    id: 'web-mobile',
    Icon: Globe,
    num: '02',
    title: 'Web & Mobile Solutions',
    desc: 'Create powerful digital experiences across web and mobile.',
    items: [
      'Corporate Website Development', 'Business Website Development',
      'E-Commerce Development', 'Landing Page Development',
      'Portfolio Websites', 'Educational Websites',
      'Web Application Development', 'Website Redesign',
      'Website Maintenance', 'Android App Development',
      'iOS App Development', 'Cross-Platform Mobile Applications',
      'Business Mobile Applications',
    ],
  },
  {
    id: 'ai',
    Icon: Brain,
    num: '03',
    title: 'AI & Intelligent Solutions',
    desc: 'Use artificial intelligence to improve customer experiences and business efficiency.',
    items: [
      'AI Solutions', 'AI Chatbots', 'AI Customer Support',
      'AI Lead Generation', 'AI Business Assistants',
      'AI Content Solutions', 'AI-Powered Business Workflows',
      'Intelligent Customer Communication',
    ],
  },
  {
    id: 'automation',
    Icon: Zap,
    num: '04',
    title: 'Business Automation',
    desc: 'Reduce repetitive work and create smarter, connected workflows.',
    items: [
      'Business Process Automation', 'Workflow Automation',
      'WhatsApp Automation', 'Email Automation',
      'Lead Follow-Up Automation', 'Customer Communication Automation',
      'Notification Automation', 'API Integration',
      'Third-Party Integrations', 'Data Synchronization',
      'Automated Reporting',
    ],
  },
  {
    id: 'marketing',
    Icon: TrendingUp,
    num: '05',
    title: 'Digital Marketing',
    desc: 'Build visibility, generate leads, and grow your digital presence.',
    items: [
      'Search Engine Optimization', 'Local SEO',
      'Social Media Marketing', 'Google Ads', 'Meta Ads',
      'Lead Generation', 'Content Marketing',
      'Digital Branding', 'Online Presence Management',
      'Marketing Analytics',
    ],
  },
  {
    id: 'uiux',
    Icon: Palette,
    num: '06',
    title: 'UI/UX & Digital Design',
    desc: 'Create intuitive, modern, and engaging digital experiences.',
    items: [
      'UI/UX Design', 'Website UI Design', 'Mobile App UI/UX',
      'Dashboard Design', 'Digital Product Design',
      'Brand & Digital Design',
    ],
  },
  {
    id: 'it',
    Icon: Server,
    num: '07',
    title: 'IT & Technology Services',
    desc: 'Strengthen your technology foundation with practical IT and consulting services.',
    items: [
      'Technology Consulting', 'Digital Transformation Consulting',
      'Cloud Solutions', 'Software Integration',
      'Database Solutions', 'Technical Support',
      'Software Maintenance', 'System Optimization',
    ],
  },
  {
    id: 'custom',
    Icon: Layers,
    num: '08',
    title: 'Custom Digital Solutions',
    desc: 'When standard solutions aren\'t enough, we build technology around your unique requirements.',
    items: [
      'Custom Business Platforms', 'SaaS Product Development',
      'MVP Development', 'Business Portal Development',
      'API Development', 'Custom Integrations',
      'Digital Transformation Solutions', 'Technology Prototyping',
    ],
  },
];

const processSteps = [
  { num: '01', label: 'Understand' },
  { num: '02', label: 'Plan' },
  { num: '03', label: 'Design' },
  { num: '04', label: 'Build' },
  { num: '05', label: 'Launch' },
  { num: '06', label: 'Support' },
];

export default function Services() {
  useScrollReveal();
  const [activeTab, setActiveTab] = useState('software');

  useEffect(() => {
    document.title = 'Services | Software, AI, Automation & Digital Solutions | Zentavix';
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', 'Zentavix provides software development, AI, automation, web & mobile, digital marketing, UI/UX, IT services, and custom digital solutions for businesses.');
  }, []);

  const active = categories.find((c) => c.id === activeTab) || categories[0];

  return (
    <div className="page-wrapper">
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="hero services-hero" aria-label="Services Hero">
        <div className="container">
          <div className="hero-text" style={{ maxWidth: '680px' }}>
            <div className="hero-eyebrow">
              <span style={{ width: 6, height: 6, background: '#168BFF', borderRadius: '50%', display: 'inline-block' }} />
              OUR SERVICES
            </div>
            <h1 className="hero-title">
              Technology Solutions Built Around{' '}
              <span className="accent">Your Business</span>
            </h1>
            <p className="hero-subtitle">
              From software and digital experiences to AI, automation, and marketing,
              Zentavix provides a complete range of technology solutions.
            </p>
            <div className="hero-actions">
              <Link to="/contact" className="btn btn-white btn-lg">
                Discuss Your Project
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICE CATEGORIES — TAB OVERVIEW ─────────────────── */}
      <section className="section" aria-label="Service Categories Overview">
        <div className="container">
          <div className="section-header reveal">
            <span className="eyebrow">All Services</span>
            <h2 className="display-md">What We Offer</h2>
            <p className="body-lg">
              Eight comprehensive service areas covering every technology need for your business.
            </p>
          </div>

          {/* Category Nav */}
          <div className="svc-tabs reveal">
            {categories.map(({ id, Icon, num, title }) => (
              <button
                key={id}
                className={`svc-tab${activeTab === id ? ' svc-tab--active' : ''}`}
                onClick={() => setActiveTab(id)}
                aria-pressed={activeTab === id}
              >
                <div className="svc-tab__icon">
                  <Icon size={18} />
                </div>
                <span className="svc-tab__num">{num}</span>
                <span className="svc-tab__label">{title}</span>
              </button>
            ))}
          </div>

          {/* Active Category Detail */}
          <div className="svc-detail">
            <div className="svc-detail__header">
              <div className="svc-detail__icon-wrap">
                <active.Icon size={32} />
              </div>
              <div>
                <p className="svc-detail__num">{active.num}</p>
                <h2 className="display-md">{active.title}</h2>
                <p className="body-lg" style={{ marginTop: '12px', maxWidth: '640px' }}>
                  {active.desc}
                </p>
              </div>
            </div>
            <div className="svc-detail__items">
              {active.items.map((item) => (
                <div key={item} className="svc-detail__item">
                  <CheckCircle2 size={16} className="svc-detail__check" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <Link to="/contact" className="btn btn-primary svc-detail__cta">
              Enquire About {active.title}
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── ALL CATEGORIES CARDS ──────────────────────────────── */}
      <section className="section section-light" aria-label="All Service Categories">
        <div className="container">
          <div className="section-header reveal">
            <span className="eyebrow">Full Overview</span>
            <h2 className="display-md">All Service Categories</h2>
          </div>
          <div className="svc-cards-grid">
            {categories.map(({ num, Icon, title, desc, items }, i) => (
              <div key={num} className={`svc-full-card reveal reveal-delay-${(i % 4) + 1}`}>
                <div className="svc-full-card__top">
                  <div className="svc-full-card__num">{num}</div>
                  <div className="svc-full-card__icon">
                    <Icon size={24} />
                  </div>
                </div>
                <h3 className="svc-full-card__title">{title}</h3>
                <p className="svc-full-card__desc">{desc}</p>
                <ul className="svc-full-card__list">
                  {items.slice(0, 5).map((item) => (
                    <li key={item}>
                      <ChevronRight size={13} />
                      {item}
                    </li>
                  ))}
                  {items.length > 5 && (
                    <li className="svc-full-card__more">+{items.length - 5} more</li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────── */}
      <section className="section section-dark svc-process" aria-label="How We Deliver">
        <div className="container">
          <div className="section-header reveal">
            <span className="eyebrow" style={{ color: '#7CC8FF' }}>Process</span>
            <h2 className="display-md text-white">How We Deliver</h2>
          </div>
          <div className="svc-process__steps">
            {processSteps.map(({ num, label }, i) => (
              <div key={num} className={`svc-process__step reveal reveal-delay-${i + 1}`}>
                <div className="svc-process__bubble">{num}</div>
                <div className="svc-process__label">{label}</div>
                {i < processSteps.length - 1 && (
                  <div className="svc-process__arrow" aria-hidden="true">
                    <ChevronRight size={20} color="rgba(255,255,255,0.2)" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="section svc-cta" aria-label="Services CTA">
        <div className="container text-center reveal">
          <span className="eyebrow" style={{ justifyContent: 'center' }}>Need Help Deciding?</span>
          <h2 className="display-md" style={{ margin: '16px auto 16px', maxWidth: '560px' }}>
            Not Sure Which Solution You Need?
          </h2>
          <p className="body-lg" style={{ marginBottom: '40px', maxWidth: '480px', margin: '0 auto 40px' }}>
            Tell us about your business challenge. Our team can help identify the right technology approach.
          </p>
          <Link to="/contact" className="btn btn-primary btn-lg">
            Discuss Your Requirement
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
