import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import {
  Lightbulb, ShieldCheck, Star, Users, Eye, TrendingUp,
  ArrowRight, Target, Telescope
} from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './About.css';

const values = [
  { Icon: Lightbulb,  title: 'Innovation',             desc: 'Continuously exploring better ways to solve business problems through technology.' },
  { Icon: ShieldCheck,title: 'Integrity',               desc: 'Honest communication, transparent pricing, and trustworthy delivery.' },
  { Icon: Star,       title: 'Quality',                  desc: 'Building solutions that are well-crafted, reliable, and maintainable.' },
  { Icon: Users,      title: 'Customer Success',         desc: 'Your business outcomes are what define our success.' },
  { Icon: Eye,        title: 'Transparency',             desc: 'Open progress updates, clear timelines, and no hidden surprises.' },
  { Icon: TrendingUp, title: 'Continuous Improvement',   desc: 'Always evolving, learning, and improving our solutions and processes.' },
];

export default function About() {
  useScrollReveal();

  useEffect(() => {
    document.title = 'About Zentavix | Technology & Digital Solutions';
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', 'Learn about Zentavix Private Limited — a technology and digital solutions company focused on helping businesses adopt modern technology.');
  }, []);

  return (
    <div className="page-wrapper">
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="hero about-hero" aria-label="About Hero">
        <div className="container">
          <div className="hero-text">
            <div className="hero-eyebrow">
              <span style={{ width: 6, height: 6, background: '#168BFF', borderRadius: '50%', display: 'inline-block' }} />
              ABOUT ZENTAVIX
            </div>
            <h1 className="hero-title">
              Technology With<br />
              <span className="accent">a Purpose</span>
            </h1>
            <p className="hero-subtitle">
              We help businesses turn ideas, challenges, and opportunities into
              practical digital solutions.
            </p>
            <div className="hero-actions">
              <Link to="/contact" className="btn btn-white btn-lg">
                Talk to Zentavix
                <ArrowRight size={18} />
              </Link>
              <Link to="/services" className="btn btn-outline-white btn-lg">
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO WE ARE ───────────────────────────────────────── */}
      <section className="section" aria-label="Who We Are">
        <div className="container">
          <div className="about-who">
            <div className="about-who__text reveal-left">
              <span className="eyebrow">Who We Are</span>
              <h2 className="display-md" style={{ marginBottom: '24px' }}>Who We Are</h2>
              <p className="body-lg" style={{ marginBottom: '20px' }}>
                Zentavix Private Limited is a technology and digital solutions company
                focused on helping businesses adopt modern technology.
              </p>
              <p className="body-lg" style={{ marginBottom: '32px' }}>
                We bring together software development, web and mobile solutions, AI,
                automation, digital marketing, UI/UX, integrations, and technology
                consulting to help businesses operate more efficiently and create
                stronger digital experiences.
              </p>
              <Link to="/contact" className="btn btn-primary btn-lg">
                Start a Conversation
                <ArrowRight size={18} />
              </Link>
            </div>
            <div className="about-who__visual reveal-right">
              <div className="about-visual-card">
                <div className="about-visual-card__header">
                  <span className="about-visual-card__label">Zentavix</span>
                  <span className="badge">Technology Partner</span>
                </div>
                <div className="about-visual-services">
                  {['Software Development', 'Web & Mobile', 'AI Solutions', 'Automation', 'Digital Marketing', 'UI/UX Design', 'IT Services', 'Custom Solutions'].map((s) => (
                    <div key={s} className="about-visual-service">
                      <div className="about-visual-service__dot" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION & VISION ─────────────────────────────────── */}
      <section className="section section-blue-tint" aria-label="Mission and Vision">
        <div className="container">
          <div className="mv-grid">
            <div className="mv-card reveal reveal-delay-1">
              <div className="mv-card__icon">
                <Target size={28} />
              </div>
              <h2 className="heading-lg mb-2">Our Mission</h2>
              <p className="body-lg">
                To simplify business through smart, practical, and innovative technology.
              </p>
            </div>
            <div className="mv-card reveal reveal-delay-2">
              <div className="mv-card__icon">
                <Telescope size={28} />
              </div>
              <h2 className="heading-lg mb-2">Our Vision</h2>
              <p className="body-lg">
                To become a trusted technology partner for businesses building a smarter digital future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────────────── */}
      <section className="section" aria-label="Our Values">
        <div className="container">
          <div className="section-header reveal">
            <span className="eyebrow">What Drives Us</span>
            <h2 className="display-md">Our Values</h2>
          </div>
          <div className="grid-3">
            {values.map(({ Icon, title, desc }, i) => (
              <div key={title} className={`card reveal reveal-delay-${(i % 3) + 1}`}>
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

      {/* ── WHAT WE BELIEVE ──────────────────────────────────── */}
      <section className="section section-dark about-believe" aria-label="What We Believe">
        <div className="container">
          <div className="believe-layout">
            <div className="reveal-left">
              <span className="eyebrow" style={{ color: '#7CC8FF' }}>Our Philosophy</span>
              <h2 className="display-md text-white" style={{ marginBottom: '24px' }}>
                Technology Should Solve Problems,<br />Not Create Them.
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.75', fontSize: '1.0625rem', marginBottom: '20px' }}>
                We believe technology should be practical, understandable, scalable,
                and aligned with business goals.
              </p>
              <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.75', fontSize: '1.0625rem' }}>
                Our approach focuses on understanding the problem first, selecting the
                right technology, building thoughtfully, and supporting the solution
                for the long term.
              </p>
            </div>
            <div className="believe-pillars reveal-right">
              {[
                'Understanding the problem first',
                'Selecting the right technology',
                'Building thoughtfully',
                'Supporting long-term',
              ].map((p, i) => (
                <div key={p} className={`believe-pillar reveal reveal-delay-${i + 1}`}>
                  <div className="believe-pillar__num">{String(i + 1).padStart(2, '0')}</div>
                  <p>{p}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="section about-cta" aria-label="About CTA">
        <div className="container text-center reveal">
          <span className="eyebrow" style={{ justifyContent: 'center' }}>Let's Connect</span>
          <h2 className="display-md" style={{ marginBottom: '16px', marginTop: '16px' }}>
            Let's Build Something Meaningful Together
          </h2>
          <p className="body-lg" style={{ marginBottom: '40px', maxWidth: '520px', margin: '0 auto 40px' }}>
            Whether you have a specific project in mind or need help figuring out the
            right approach, we're here to help.
          </p>
          <Link to="/contact" className="btn btn-primary btn-lg">
            Talk to Zentavix
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
