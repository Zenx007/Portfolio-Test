import { useEffect, useState } from 'react'
import './App.css'
import architectAvatar from './assets/architect-avatar.svg'

const navItems = [
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'stack', label: 'Stack', href: '#stack' },
  { id: 'contact', label: 'Contact', href: '#contact' },
]

const heroTags = ['.NET', 'NestJS', 'AWS', 'Kubernetes']
const languageTags = ['C#', 'TypeScript', 'Go', 'SQL']
const frameworkTags = ['.NET 8', 'NestJS', 'React', 'Entity Framework']

function GearIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M11 3h2l.35 2.08a6.8 6.8 0 0 1 1.67.7l1.69-1.27 1.41 1.41-1.27 1.69c.3.52.54 1.08.7 1.66L21 11v2l-2.08.35a6.8 6.8 0 0 1-.7 1.67l1.27 1.69-1.41 1.41-1.69-1.27a6.8 6.8 0 0 1-1.66.7L13 21h-2l-.35-2.08a6.8 6.8 0 0 1-1.67-.7l-1.69 1.27-1.41-1.41 1.27-1.69a6.8 6.8 0 0 1-.7-1.66L3 13v-2l2.08-.35c.16-.58.4-1.14.7-1.67L4.51 7.3 5.92 5.9l1.69 1.27c.52-.31 1.08-.54 1.66-.7z" />
      <circle cx="12" cy="12" r="2.6" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 6h16v12H4z" />
      <path d="m4 7 8 6 8-6" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function DocIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 3h9l3 3v15H6z" />
      <path d="M15 3v4h4M9 11h6M9 15h6" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function LanguageIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 4h8v2H8.5A12 12 0 0 1 6 12c1.2 1.38 2.7 2.57 4.5 3.55L9 17.3c-1.9-1.05-3.5-2.35-4.8-3.88-.97 1.2-2.06 2.3-3.2 3.16L0 14.72A17 17 0 0 0 4.77 9H3zM14.5 8h2L21 20h-2.12l-1.05-3H13.1l-1.05 3H10zm-.76 7h3.44l-1.72-4.93z" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2a7 7 0 0 0-7 7c0 5.14 7 13 7 13s7-7.86 7-13a7 7 0 0 0-7-7m0 9.4A2.4 2.4 0 1 1 12 6.6a2.4 2.4 0 0 1 0 4.8" />
    </svg>
  )
}

function CloudIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 18h9.5A4.5 4.5 0 0 0 17 9a5.5 5.5 0 0 0-10.6 2A3.7 3.7 0 0 0 7 18" />
    </svg>
  )
}

function CubeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m12 2 8 4.5v10.9L12 22l-8-4.6V6.5z" />
      <path d="M12 2v9.8m8-5.3-8 5.3-8-5.3" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ClusterIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M10 3h4v4h-4zm0 14h4v4h-4zM3 10h4v4H3zm14 0h4v4h-4z" />
      <path d="M12 7v10M7 12h10" fill="none" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function App() {
  const [activeSection, setActiveSection] = useState('projects')

  useEffect(() => {
    const ids = navItems.map((item) => item.id)

    const updateActiveSection = () => {
      const headerOffset = window.innerWidth <= 860 ? 174 : 92
      let current = ids[0]

      for (const id of ids) {
        const element = document.getElementById(id)
        if (!element) {
          continue
        }

        const top = element.getBoundingClientRect().top
        if (top - headerOffset <= 0) {
          current = id
        }
      }

      setActiveSection(current)
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)

    return () => {
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
    }
  }, [])

  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <a className="brand" href="#projects">
            ENGINEER_CORE
          </a>

          <nav className="topbar-nav" aria-label="Primary">
            {navItems.map((item) => (
              <a
                key={item.id}
                className={activeSection === item.id ? 'nav-link is-active' : 'nav-link'}
                href={item.href}
                aria-current={activeSection === item.id ? 'page' : undefined}
                onClick={() => setActiveSection(item.id)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a className="resume-btn" href="#contact">
            Resume
          </a>
        </div>
      </header>

      <main>
        <section className="hero section" id="projects">
          <div className="section-inner hero-grid">
            <div className="hero-copy">
              <span className="pill">SYSTEM ARCHITECT</span>
              <p className="hero-title">Building High-Performance Distributed Systems</p>
              <p className="hero-paragraph">
                Specializing in robust backend architectures and scalable cloud
                solutions.
              </p>
              <p className="hero-paragraph">
                Expertly navigating the intersection of .NET, NestJS, and AWS.
              </p>

              <div className="chip-row" aria-label="Core technologies">
                {heroTags.map((tag) => (
                  <span key={tag} className="chip">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="portrait-wrap" aria-label="System architect portrait">
              <span className="corner corner-tl" aria-hidden="true"></span>
              <span className="corner corner-tr" aria-hidden="true"></span>
              <span className="corner corner-bl" aria-hidden="true"></span>
              <span className="corner corner-br" aria-hidden="true"></span>

              <div className="portrait-card">
                <img src={architectAvatar} alt="Engineer portrait" loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        <section className="trajectory section" id="experience">
          <div className="section-inner">
            <p className="section-label">Professional Trajectory</p>
            <div className="section-divider" aria-hidden="true"></div>

            <article className="job-card">
              <div className="job-header">
                <div className="job-main">
                  <div className="role-icon" aria-hidden="true">
                    <GearIcon />
                  </div>
                  <div>
                    <h2>Senior Software Engineer</h2>
                    <p className="job-company">Second Mind</p>
                  </div>
                </div>
                <p className="job-period">2021 - PRESENT</p>
              </div>

              <p className="job-description">
                Leading core infrastructure development for enterprise-scale
                distributed systems, focusing on performance optimization and
                reliable data pipelines.
              </p>

              <div className="metrics-grid">
                <article className="metric-card">
                  <p className="metric-value">50%</p>
                  <p className="metric-label">LATENCY REDUCTION</p>
                </article>
                <article className="metric-card">
                  <p className="metric-value">10k+</p>
                  <p className="metric-label">CONCURRENT USERS</p>
                </article>
              </div>
            </article>
          </div>
        </section>

        <section className="stack section" id="stack">
          <div className="section-inner">
            <div className="stack-heading">
              <h2>Technical Arsenal</h2>
              <p>Engineered with modern standards and best practices.</p>
            </div>

            <div className="stack-grid">
              <article className="stack-card">
                <p className="stack-title">Languages</p>
                <div className="chip-row">
                  {languageTags.map((tag) => (
                    <span key={tag} className="chip">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>

              <article className="stack-card">
                <p className="stack-title">Frameworks</p>
                <div className="chip-row">
                  {frameworkTags.map((tag) => (
                    <span key={tag} className="chip">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>

              <article className="stack-card stack-card-wide">
                <div>
                  <p className="stack-title">Cloud &amp; DevOps</p>
                  <p className="stack-copy">
                    Architecting resilient infrastructure on AWS using modern
                    IaC tools.
                  </p>
                </div>

                <div className="devops-icons" aria-hidden="true">
                  <div>
                    <span className="devops-icon">
                      <CloudIcon />
                    </span>
                    <p>AWS</p>
                  </div>
                  <div>
                    <span className="devops-icon">
                      <CubeIcon />
                    </span>
                    <p>DOCKER</p>
                  </div>
                  <div>
                    <span className="devops-icon">
                      <ClusterIcon />
                    </span>
                    <p>K8S</p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="education section">
          <div className="section-inner">
            <article className="education-card">
              <div>
                <p className="section-label section-label-muted">Academic Foundation</p>
                <h2>Bachelor of Science in Software Engineering</h2>
                <p className="job-company">Technical University of Architecture</p>
                <p className="education-copy">
                  Rigorous focus on algorithmic complexity, data structures, and
                  software design patterns. Specialized in distributed systems and
                  high-concurrency environments during the final thesis project.
                </p>
              </div>

              <div className="education-mark" aria-hidden="true">
                <div className="mark-cap"></div>
                <div className="mark-base"></div>
              </div>
            </article>
          </div>
        </section>

        <section className="contact section" id="contact">
          <div className="section-inner">
            <article className="contact-card">
              <h2>
                Let&apos;s build something <span>scalable</span> together
              </h2>
              <p>
                Currently available for senior architectural roles or specialized
                consulting. Fluent in English (C1 Proficiency).
              </p>

              <div className="contact-actions">
                <a className="btn btn-primary" href="mailto:architect@engineercore.dev">
                  <MailIcon />
                  Contact Me
                </a>
                <a className="btn btn-outline" href="#projects">
                  <DocIcon />
                  View Documentation
                </a>
              </div>

              <div className="contact-meta">
                <p>
                  <LanguageIcon />
                  ENGLISH: C1 ADVANCED
                </p>
                <p>
                  <PinIcon />
                  REMOTE / GLOBAL
                </p>
              </div>
            </article>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="section-inner footer-inner">
          <p className="brand">ENGINEER_CORE</p>
          <p>&copy; 2026 SYSTEM ARCHITECT. BUILT WITH PRECISION.</p>
          <nav aria-label="External links">
            <a href="https://github.com/Zenx007" target="_blank" rel="noopener noreferrer">
              GITHUB
            </a>
            <a
              href="https://www.linkedin.com/in/jo%C3%A3o-victor-218b26315"
              target="_blank"
              rel="noopener noreferrer"
            >
              LINKEDIN
            </a>
            <a href="#contact">TERMINAL</a>
          </nav>
        </div>
      </footer>
    </div>
  )
}

export default App
