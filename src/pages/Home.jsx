import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import {
  ArrowRight, Code2, Globe, Brain, Zap, TrendingUp,
  Palette, Server, Layers, CheckCircle2, ChevronRight,
  Cpu, Network, Database, Smartphone, BarChart3,
  ShieldCheck, Users, Lightbulb, Rocket, HeartHandshake, Scale
} from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Home.css';

/* ── Data ────────────────────────────────────────────────────── */
const services = [
  {
    num: '01', Icon: Code2,
    title: 'Software & Business Solutions',
    desc: 'Custom software, CRM, ERP, HR, finance, billing, analytics, and business management tools tailored to your workflows.',
  },
  {
    num: '02', Icon: Globe,
    title: 'Web & Mobile Solutions',
    desc: 'Corporate websites, e-commerce, web apps, Android, iOS, and cross-platform mobile applications.',
  },
  {
    num: '03', Icon: Brain,
    title: 'AI & Intelligent Solutions',
    desc: 'AI chatbots, intelligent customer support, lead generation, content solutions, and AI-powered business workflows.',
  },
  {
    num: '04', Icon: Zap,
    title: 'Business Automation',
    desc: 'Workflow and process automation, WhatsApp/email automation, API integrations, and automated reporting.',
  },
  {
    num: '05', Icon: TrendingUp,
    title: 'Digital Marketing',
    desc: 'SEO, social media marketing, Google Ads, Meta Ads, lead generation, content marketing, and online presence.',
  },
  {
    num: '06', Icon: Palette,
    title: 'UI/UX & Design',
    desc: 'Website UI, mobile app UX, dashboard design, digital product design, and brand & digital identity.',
  },
  {
    num: '07', Icon: Server,
    title: 'IT & Technology Services',
    desc: 'Technology consulting, digital transformation, cloud solutions, software integration, and technical support.',
  },
  {
    num: '08', Icon: Layers,
    title: 'Custom Digital Solutions',
    desc: 'SaaS platforms, MVPs, business portals, API development, and custom technology solutions.',
  },
];

const ecosystem = [
  { label: 'SOFTWARE', angle: 0 },
  { label: 'WEB', angle: 45 },
  { label: 'MOBILE', angle: 90 },
  { label: 'AI', angle: 135 },
  { label: 'AUTOMATION', angle: 180 },
  { label: 'DIGITAL', angle: 225 },
  { label: 'DATA', angle: 270 },
  { label: 'INTEGRATIONS', angle: 315 },
];

const steps = [
  { num: '01', title: 'Discover', desc: 'Understand your business, goals, and challenges.' },
  { num: '02', title: 'Strategize', desc: 'Identify the right technology and digital approach.' },
  { num: '03', title: 'Design', desc: 'Create intuitive and professional experiences.' },
  { num: '04', title: 'Develop', desc: 'Build, integrate, test, and launch.' },
  { num: '05', title: 'Support', desc: 'Continue improving and supporting your solution.' },
];

const whyCards = [
  { Icon: Lightbulb,  title: 'Business First',        desc: 'We start with your business goals, not a technology checklist.' },
  { Icon: Layers,     title: 'Customized Solutions',  desc: 'No generic templates. Every solution is built for your specific requirements.' },
  { Icon: Cpu,        title: 'Modern Technology',     desc: 'We use current, scalable, and maintainable technology stacks.' },
  { Icon: ShieldCheck,title: 'Transparent Process',  desc: 'Clear communication, honest timelines, and open progress updates.' },
  { Icon: Scale,      title: 'Scalable Solutions',    desc: 'Solutions designed to grow with your business over time.' },
  { Icon: HeartHandshake, title: 'Long-Term Partnership', desc: 'We stay beyond launch — supporting, evolving, and improving your solution.' },
];

const industries = [
  'Retail', 'Education', 'Healthcare', 'Manufacturing',
  'Finance', 'Real Estate', 'Logistics', 'Hospitality',
  'E-Commerce', 'Professional Services', 'Startups', 'Growing Businesses',
];

const highlights = [
  { Icon: CheckCircle2, title: 'Smart Solutions',      desc: 'Technology built around your business requirements.' },
  { Icon: Rocket,       title: 'Innovative Technology', desc: 'Modern software, AI, automation, and digital solutions.' },
  { Icon: Users,        title: 'Long-Term Support',    desc: 'A technology partner that stays with you beyond launch.' },
];

/* ── Ecosystem SVG ────────────────────────────────────────────── */
function EcosystemGraphic() {
  const r = 130; // orbit radius for desktop
  return (
    <div className="ecosystem-graphic" aria-hidden="true">
      <svg viewBox="0 0 380 380" className="ecosystem-svg">
        {/* Orbit rings */}
        <circle cx="190" cy="190" r={r} fill="none" stroke="rgba(22,139,255,0.12)" strokeWidth="1" strokeDasharray="6 6" />
        <circle cx="190" cy="190" r={r * 0.6} fill="none" stroke="rgba(22,139,255,0.08)" strokeWidth="1" />

        {/* Lines to nodes */}
        {ecosystem.map(({ label, angle }) => {
          const rad = (angle * Math.PI) / 180;
          const x2 = 190 + r * Math.cos(rad);
          const y2 = 190 + r * Math.sin(rad);
          return (
            <line
              key={label}
              x1="190" y1="190"
              x2={x2} y2={y2}
              stroke="rgba(22,139,255,0.18)"
              strokeWidth="1"
            />
          );
        })}

        {/* Nodes */}
        {ecosystem.map(({ label, angle }) => {
          const rad = (angle * Math.PI) / 180;
          const x = 190 + r * Math.cos(rad);
          const y = 190 + r * Math.sin(rad);
          return (
            <g key={label} transform={`translate(${x}, ${y})`}>
              <circle r="28" fill="rgba(20,85,217,0.10)" stroke="rgba(22,139,255,0.3)" strokeWidth="1" />
              <circle r="6" fill="#168BFF" opacity="0.8" />
              <text
                textAnchor="middle"
                dy="-14"
                fontSize="7"
                fontWeight="700"
                fill="rgba(255,255,255,0.7)"
                letterSpacing="0.08em"
              >
                {label}
              </text>
            </g>
          );
        })}

        {/* Center */}
        <circle cx="190" cy="190" r="50" fill="url(#centerGrad)" />
        <circle cx="190" cy="190" r="50" fill="none" stroke="rgba(22,139,255,0.5)" strokeWidth="1.5" />
        <text
          x="190" y="186"
          textAnchor="middle"
          fontSize="10"
          fontWeight="800"
          fill="white"
          letterSpacing="0.1em"
        >
          ZENTAVIX
        </text>
        <text
          x="190" y="200"
          textAnchor="middle"
          fontSize="7"
          fill="rgba(255,255,255,0.5)"
          letterSpacing="0.06em"
        >
          ECOSYSTEM
        </text>

        <defs>
          <radialGradient id="centerGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1455D9" />
            <stop offset="100%" stopColor="#071A3D" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}

/* ── Hero Visual ─────────────────────────────────────────────── */
function HeroVisual() {
  return (
    <div className="hero-visual" aria-hidden="true">
      {/* Main card */}
      <div className="hero-visual__card hero-visual__card--main float">
        <div className="hero-visual__card-header">
          <div className="hero-visual__dot" style={{ background: '#FF5F57' }} />
          <div className="hero-visual__dot" style={{ background: '#FEBC2E' }} />
          <div className="hero-visual__dot" style={{ background: '#28C840' }} />
          <span className="hero-visual__card-label">Technology Dashboard</span>
        </div>
        <div className="hero-visual__stats">
          {[
            { label: 'Active Projects', val: '24', color: '#168BFF' },
            { label: 'AI Solutions', val: '12', color: '#1455D9' },
            { label: 'Automations', val: '38', color: '#071A3D' },
          ].map(({ label, val, color }) => (
            <div key={label} className="hero-visual__stat">
              <span className="hero-visual__stat-val" style={{ color }}>{val}</span>
              <span className="hero-visual__stat-label">{label}</span>
            </div>
          ))}
        </div>
        <div className="hero-visual__bar-group">
          {[90, 75, 85, 60, 95].map((w, i) => (
            <div key={i} className="hero-visual__bar-wrap">
              <div className="hero-visual__bar" style={{ width: `${w}%`, animationDelay: `${i * 0.1}s` }} />
            </div>
          ))}
        </div>
      </div>

      {/* AI badge */}
      <div className="hero-visual__badge hero-visual__badge--ai float float-delay-1">
        <Brain size={18} color="#168BFF" />
        <div>
          <p className="hero-visual__badge-title">AI Solutions</p>
          <p className="hero-visual__badge-sub">Active</p>
        </div>
      </div>

      {/* Web badge */}
      <div className="hero-visual__badge hero-visual__badge--web float float-delay-2">
        <Globe size={18} color="#1455D9" />
        <div>
          <p className="hero-visual__badge-title">Web & Mobile</p>
          <p className="hero-visual__badge-sub">Live</p>
        </div>
      </div>

      {/* Network nodes */}
      <div className="hero-visual__nodes">
        {[Code2, Database, Network, Smartphone, BarChart3].map((Icon, i) => (
          <div key={i} className={`hero-visual__node float float-delay-${i + 1}`}>
            <Icon size={14} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────── */
export default function Home() {
  useScrollReveal();

  useEffect(() => {
    document.title = 'Zentavix Private Limited | Smart Technology & Digital Solutions';
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', 'Zentavix delivers software, digital experiences, AI solutions, automation, and technology services that help businesses work smarter, operate efficiently, and grow faster.');
  }, []);

  return (
    <div className="page-wrapper">
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="home-hero" aria-label="Hero">
        <div className="container home-hero__inner">
          <div className="home-hero__text">
            <div className="hero-eyebrow">
              <span className="hero-eyebrow__dot" />
              ZENTAVIX PRIVATE LIMITED
            </div>
            <h1 className="hero-title">
              Building <span className="accent">Smarter Businesses</span>{' '}
              with Technology
            </h1>
            <p className="hero-subtitle">
              Zentavix delivers software, digital experiences, AI solutions,
              automation, and technology services that help businesses work
              smarter, operate efficiently, and grow faster.
            </p>
            <div className="hero-actions">
              <Link to="/contact" className="btn btn-white btn-lg">
                Get a Free Consultation
                <ArrowRight size={18} />
              </Link>
              <Link to="/services" className="btn btn-outline-white btn-lg">
                Explore Our Services
              </Link>
            </div>
          </div>
          <HeroVisual />
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll" aria-hidden="true">
          <div className="hero-scroll__line" />
        </div>
      </section>

      {/* ── INTRODUCTION ─────────────────────────────────────── */}
      <section className="section" aria-label="Introduction">
        <div className="container">
          <div className="section-header reveal">
            <span className="eyebrow">Technology That Works</span>
            <h2 className="display-md">Technology That Works for Your Business</h2>
            <p className="body-lg">
              Every business has different challenges. Zentavix combines technology,
              creativity, and business understanding to create practical digital
              solutions designed around your goals.
            </p>
          </div>
          <div className="grid-3 intro-highlights">
            {highlights.map(({ Icon, title, desc }, i) => (
              <div key={title} className={`card intro-card reveal reveal-delay-${i + 1}`}>
                <div className="card-icon">
                  <Icon size={24} />
                </div>
                <h3 className="heading-md mb-2">{title}</h3>
                <p className="body-md">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES PREVIEW ─────────────────────────────────── */}
      <section className="section section-light" aria-label="Services">
        <div className="container">
          <div className="section-header reveal">
            <span className="eyebrow">What We Do</span>
            <h2 className="display-md">Everything You Need to Go Digital</h2>
            <p className="body-lg">
              From software and websites to AI, automation, marketing, and custom
              technology, Zentavix provides solutions to help businesses move forward.
            </p>
          </div>
          <div className="services-grid">
            {services.map(({ num, Icon, title, desc }, i) => (
              <div key={num} className={`service-card reveal reveal-delay-${(i % 4) + 1}`}>
                <div className="service-card__num">{num}</div>
                <div className="service-card__icon">
                  <Icon size={26} />
                </div>
                <h3 className="service-card__title">{title}</h3>
                <p className="service-card__desc">{desc}</p>
                <Link to="/services" className="link-arrow service-card__link">
                  Explore Services <ChevronRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ECOSYSTEM ────────────────────────────────────────── */}
      <section className="section section-dark ecosystem-section" aria-label="Ecosystem">
        <div className="container">
          <div className="ecosystem-layout">
            <div className="ecosystem-text reveal-left">
              <span className="eyebrow" style={{ color: '#7CC8FF' }}>One Partner</span>
              <h2 className="display-md text-white" style={{ marginBottom: '20px' }}>
                One Technology Partner.<br />Multiple Possibilities.
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.75', marginBottom: '32px', fontSize: '1.0625rem' }}>
                Bring your technology, digital presence, automation, and business
                operations together with one technology partner.
              </p>
              <div className="ecosystem-tags">
                {['Software', 'Web', 'Mobile', 'AI', 'Automation', 'Digital', 'Data', 'Integrations'].map((t) => (
                  <span key={t} className="badge ecosystem-tag">{t}</span>
                ))}
              </div>
            </div>
            <div className="reveal-right">
              <EcosystemGraphic />
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW WE WORK ──────────────────────────────────────── */}
      <section className="section" aria-label="Process">
        <div className="container">
          <div className="section-header reveal">
            <span className="eyebrow">Our Process</span>
            <h2 className="display-md">From Idea to Impact</h2>
          </div>
          <div className="steps-track">
            {steps.map(({ num, title, desc }, i) => (
              <div key={num} className={`step reveal reveal-delay-${i + 1}`}>
                <div className="step__connector" aria-hidden="true" />
                <div className="step__bubble">
                  <span className="step__num">{num}</span>
                </div>
                <div className="step__content">
                  <h3 className="step__title">{title}</h3>
                  <p className="step__desc">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY ZENTAVIX ─────────────────────────────────────── */}
      <section className="section section-blue-tint" aria-label="Why Zentavix">
        <div className="container">
          <div className="section-header reveal">
            <span className="eyebrow">Why Choose Us</span>
            <h2 className="display-md">Why Choose Zentavix?</h2>
          </div>
          <div className="grid-3">
            {whyCards.map(({ Icon, title, desc }, i) => (
              <div key={title} className={`card why-card reveal reveal-delay-${(i % 3) + 1}`}>
                <div className="card-icon">
                  <Icon size={22} />
                </div>
                <h3 className="heading-md mb-2">{title}</h3>
                <p className="body-md">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ───────────────────────────────────────── */}
      <section className="section" aria-label="Industries">
        <div className="container">
          <div className="section-header reveal">
            <span className="eyebrow">Industries</span>
            <h2 className="display-md">Technology Across Industries</h2>
          </div>
          <div className="industries-grid reveal">
            {industries.map((ind) => (
              <Link key={ind} to="/industries" className="industry-chip">
                {ind}
              </Link>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: '40px' }}>
            <Link to="/industries" className="btn btn-secondary btn-lg">
              Explore Industries
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────── */}
      <section className="home-cta" aria-label="Call to Action">
        <div className="home-cta__bg" aria-hidden="true" />
        <div className="container home-cta__inner reveal">
          <span className="eyebrow" style={{ color: '#7CC8FF' }}>Get Started</span>
          <h2 className="display-lg text-white" style={{ marginBottom: '16px' }}>
            Ready to Build a Smarter Business?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.125rem', marginBottom: '40px', maxWidth: '520px', margin: '0 auto 40px' }}>
            Tell us what you want to build, improve, automate, or grow.
          </p>
          <div className="hero-actions" style={{ justifyContent: 'center' }}>
            <Link to="/contact" className="btn btn-white btn-lg">
              Get a Free Consultation
              <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="btn btn-outline-white btn-lg">
              Contact Zentavix
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
