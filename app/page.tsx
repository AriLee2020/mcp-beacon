'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from './page.module.css';

const Logo = () => (
  <svg viewBox="0 0 32 32">
    <polygon points="16,2 28,9 28,23 16,30 4,23 4,9" fill="#1A1A2E" stroke="#F97316" strokeWidth="1.5" />
    <circle cx="16" cy="16" r="5" fill="#F97316" />
  </svg>
);

const LogoFooter = () => (
  <svg viewBox="0 0 24 24" width="24" height="24">
    <polygon points="12,2 21,7 21,17 12,22 3,17 3,7" fill="none" stroke="#F97316" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="3.5" fill="#F97316" />
  </svg>
);

const navLinks = [
  { href: '#features', label: 'Features' },
  { href: '#how', label: 'How It Works' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
  { href: '#docs', label: 'Docs' },
];

const features = [
  {
    icon: '📡',
    title: 'Real-Time Monitoring',
    desc: 'Watch every agent call, tool invocation, and response in real time. Spot issues before they become incidents.',
  },
  {
    icon: '💰',
    title: 'Cost Intelligence',
    desc: 'Track token usage and spend per agent, per project, per model. Set budgets and get alerts before you overspend.',
  },
  {
    icon: '🔔',
    title: 'Smart Alerting',
    desc: 'Define thresholds for latency, error rates, and costs. Get notified via Slack, email, or webhook when something's off.',
  },
  {
    icon: '📊',
    title: 'Analytics Dashboard',
    desc: 'Rich dashboards with trends, breakdowns, and comparisons. Understand agent performance at a glance.',
  },
  {
    icon: '🔌',
    title: 'MCP-Native',
    desc: 'Built for the Model Context Protocol. Drop-in integration with any MCP-compatible agent — no code changes required.',
  },
  {
    icon: '🔐',
    title: 'Enterprise Ready',
    desc: 'SOC 2 compliant, SSO, role-based access, audit logs, and on-premise deployment options.',
  },
];

const steps = [
  {
    num: '1',
    title: 'Connect',
    desc: 'Add the Beacon proxy URL to your MCP client config. One line change, instant telemetry.',
  },
  {
    num: '2',
    title: 'Observe',
    desc: 'Watch real-time data flow into your dashboard. Every call, every tool, every token tracked.',
  },
  {
    num: '3',
    title: 'Optimize',
    desc: 'Use insights to reduce costs, improve reliability, and scale your agent infrastructure with confidence.',
  },
];

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    desc: 'For solo developers and small projects',
    features: ['Up to 3 agents', '1,000 calls/month', '7-day data retention', 'Basic dashboard', 'Community support'],
    btn: 'Get Started',
    btnStyle: 'secondary',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    desc: 'For growing teams and production workloads',
    features: ['Up to 25 agents', '50,000 calls/month', '30-day data retention', 'Advanced analytics', 'Slack & email alerts', 'Priority support'],
    btn: 'Start Free Trial',
    btnStyle: 'primary',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    desc: 'For large organizations with advanced needs',
    features: ['Unlimited agents', 'Unlimited calls', 'Custom retention', 'SSO & RBAC', 'On-premise option', 'Dedicated support', 'SLA guarantee'],
    btn: 'Contact Sales',
    btnStyle: 'secondary',
    highlight: false,
  },
];

const faqs = [
  {
    q: 'What is MCP and why do I need monitoring for it?',
    a: 'The Model Context Protocol (MCP) is the standard for AI agent tool calling. As your agent fleet grows, you need visibility into what each agent is doing, how much it costs, and whether it's performing correctly. Beacon provides that visibility.',
  },
  {
    q: 'How does Beacon integrate with my existing agents?',
    a: 'Beacon acts as a transparent proxy. You point your MCP client to Beacon's endpoint instead of directly to your MCP servers. Beacon forwards all traffic while collecting telemetry — zero code changes to your agents.',
  },
  {
    q: 'Is my data secure? Can I self-host?',
    a: 'Yes and yes. All data is encrypted in transit and at rest. Enterprise plans include on-premise deployment. Beacon never stores your actual agent prompts or responses — only metadata and metrics.',
  },
  {
    q: 'What AI providers do you support?',
    a: 'Beacon is provider-agnostic. Since it sits at the MCP protocol layer, it works with any MCP-compatible setup regardless of the underlying LLM provider (OpenAI, Anthropic, open-source models, etc.).',
  },
];

export default function Home() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [openFaq, setOpenFaq] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('mcp-beacon-theme');
    if (saved === 'dark') setTheme('dark');
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.dataset.theme = theme === 'dark' ? 'dark' : '';
    localStorage.setItem('mcp-beacon-theme', theme);
  }, [theme, mounted]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  }, []);

  const toggleFaq = useCallback((idx: number) => {
    setOpenFaq((prev) => (prev === idx ? -1 : idx));
  }, []);

  const btnClass = (style: string) => {
    const base = styles.btn;
    if (style === 'primary') return `${base} ${styles.btnPrimary}`;
    return `${base} ${styles.btnSecondary}`;
  };

  return (
    <>
      {/* Navigation */}
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <a href="#" className={styles.navLogo}>
            <Logo />
            <span>Beacon</span>
          </a>
          <ul className={styles.navLinks}>
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
          <div className={styles.navRight}>
            <button
              className={styles.themeToggle}
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? '☾' : '☀'}
            </button>
            <a href="#pricing" className={`${styles.btn} ${styles.btnPrimary} ${styles.btnSm}`}>
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className={styles.hero}>
        <svg className={styles.heroBg} viewBox="0 0 800 800">
          <polygon points="400,50 650,200 650,500 400,650 150,500 150,200" />
        </svg>
        <div className={styles.container}>
          <h1 className={styles.animate}>
            Monitor Your <span>AI Agents</span>
            <br />
            With Clarity
          </h1>
          <p className={styles.animate} style={{ animationDelay: '0.1s' }}>
            Real-time observability, cost tracking, and intelligent alerts for MCP-based agent systems.
            Know exactly what your agents are doing — and what it costs.
          </p>
          <div className={styles.heroActions} style={{ animationDelay: '0.2s' }}>
            <a href="#pricing" className={btnClass('primary')}>Start Free Trial</a>
            <a href="#how" className={btnClass('secondary')}>See How It Works</a>
          </div>
          <div className={styles.heroVisual} style={{ animationDelay: '0.3s' }}>
            <div className={styles.heroCard}>
              <div className={styles.heroCardBar}>
                <span /><span /><span />
              </div>
              <div className={`${styles.heroCardLine} ${styles.orange}`} />
              <div className={styles.heroCardLine} style={{ width: '80%' }} />
              <div className={styles.heroCardLine} style={{ width: '55%' }} />
              <div className={`${styles.heroCardLine} ${styles.short}`} />
              <div className={styles.heroCardStats}>
                <div className={`${styles.heroCardStat} ${styles.heroCardStatSuccess}`}>✓ Agent active</div>
                <div className={`${styles.heroCardStat} ${styles.heroCardStatCost}`}>$0.42 today</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className={styles.features}>
        <div className={styles.container}>
          <span className={styles.sectionLabel}>Features</span>
          <h2 className={styles.sectionTitle}>Everything you need to<br />keep agents on track</h2>
          <p className={styles.sectionSubtitle}>
            From real-time monitoring to cost analysis, Beacon gives you the full picture of your agent ecosystem.
          </p>
          <div className={styles.featuresGrid}>
            {features.map((f) => (
              <div key={f.title} className={styles.featureCard}>
                <div className={styles.featureIcon}>{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how">
        <div className={styles.container}>
          <span className={styles.sectionLabel}>How It Works</span>
          <h2 className={styles.sectionTitle}>Three steps to clarity</h2>
          <p className={styles.sectionSubtitle}>Get set up in minutes, not days. No complex configuration required.</p>
          <div className={styles.howSteps}>
            {steps.map((s) => (
              <div key={s.num} className={styles.howStep}>
                <div className={styles.howNumber}>{s.num}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className={styles.pricing}>
        <div className={styles.container}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>Simple, transparent pricing</h2>
          <p className={styles.sectionSubtitle}>Start free, scale as you grow. No hidden fees, no surprises.</p>
          <div className={styles.pricingGrid}>
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`${styles.pricingCard} ${plan.highlight ? styles.pricingCardHighlight : ''}`}
              >
                {plan.highlight && <div className={styles.pricingBadge}>Popular</div>}
                <div className={styles.pricingName}>{plan.name}</div>
                <div className={styles.pricingPrice}>
                  {plan.price}
                  {plan.period && <span>{plan.period}</span>}
                </div>
                <div className={styles.pricingDesc}>{plan.desc}</div>
                <ul className={styles.pricingFeatures}>
                  {plan.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <a href="#" className={btnClass(plan.btnStyle)}>{plan.btn}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq">
        <div className={styles.container}>
          <span className={styles.sectionLabel}>FAQ</span>
          <h2 className={styles.sectionTitle}>Common questions</h2>
          <div className={styles.faqList}>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`${styles.faqItem} ${openFaq === idx ? styles.faqItemOpen : ''}`}
                onClick={() => toggleFaq(idx)}
              >
                <div className={styles.faqQ}>{faq.q}</div>
                <div className={styles.faqA}>{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaInner}>
            <h2>Ready to illuminate your agent fleet?</h2>
            <p>Start monitoring in under 5 minutes. No credit card required for the Starter plan.</p>
            <a href="#" className={`${styles.btn} ${styles.btnPrimary} ${styles.ctaBtn}`}>
              Start Free →
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerGrid}>
            <div className={styles.footerBrand}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <LogoFooter />
                <span style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 18 }}>Beacon</span>
              </div>
              <p>AI Agent monitoring, illuminated. Built for the MCP ecosystem.</p>
            </div>
            <div className={styles.footerCol}>
              <h4>Product</h4>
              <ul>
                <li><a href="#features">Features</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#">Changelog</a></li>
                <li><a href="#">Status</a></li>
              </ul>
            </div>
            <div className={styles.footerCol}>
              <h4>Developers</h4>
              <ul>
                <li><a href="#">Documentation</a></li>
                <li><a href="#">SDK Reference</a></li>
                <li><a href="#">API Status</a></li>
                <li><a href="#">GitHub</a></li>
              </ul>
            </div>
            <div className={styles.footerCol}>
              <h4>Company</h4>
              <ul>
                <li><a href="#">About</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <span>© 2026 MCP Beacon. All rights reserved.</span>
            <span>Privacy Policy · Terms of Service</span>
          </div>
        </div>
      </footer>
    </>
  );
}
