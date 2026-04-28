import './App.css'

const navLinks = [
  { href: '#projects', label: 'Projects', active: true },
  { href: '#experience', label: 'Experience' },
  { href: '#stack', label: 'Stack' },
  { href: '#contact', label: 'Contact' },
]

const heroTech = ['.NET', 'NestJS', 'AWS', 'Kubernetes']
const languages = ['C#', 'TypeScript', 'Go', 'SQL']
const frameworks = ['.NET 8', 'NestJS', 'React', 'Entity Framework']
const cloudTools = [
  { icon: 'cloud', label: 'AWS' },
  { icon: 'deployed_code', label: 'DOCKER' },
  { icon: 'hub', label: 'K8S' },
]

function App() {
  return (
    <div className="site">
      <nav className="topbar">
        <div className="topbar-inner container">
          <a className="brand" href="#projects">
            ENGINEER_CORE
          </a>

          <div className="topbar-nav">
            {navLinks.map((link) => (
              <a key={link.label} className={link.active ? 'nav-link is-active' : 'nav-link'} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>

          <button className="resume-btn" type="button">
            Resume
          </button>
        </div>
      </nav>

      <main>
        <section className="hero" id="projects">
          <div className="hero-bg" aria-hidden="true">
            <div className="hero-radial" />
            <div className="hero-network" />
          </div>

          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="role-pill">SYSTEM ARCHITECT</span>

              <h1>
                Building High-Performance <span>Distributed Systems</span>
              </h1>

              <p>
                Specializing in robust backend architectures and scalable cloud solutions. Expertly navigating the
                intersection of .NET, NestJS, and AWS.
              </p>

              <div className="chip-row">
                {heroTech.map((tag) => (
                  <span key={tag} className="chip glass-card">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="terminal glass-card ambient-glow" aria-label="Architecture manifest">
              <div className="terminal-header">
                <div className="traffic-lights" aria-hidden="true">
                  <span className="dot red" />
                  <span className="dot yellow" />
                  <span className="dot green" />
                </div>
                <span>ARCHITECTURE_MANIFEST.JSON</span>
              </div>

              <pre className="terminal-code">
                <code>{`{
  "focus": "Backend Engineering",
  "philosophy": "Scale with Precision",
  "status": "Ready for deployment",
  "metrics": {
    "latency": "-50%",
    "uptime": "99.99%",
    "coverage": "94%"
  }
}`}</code>
              </pre>
            </div>
          </div>
        </section>

        <section className="experience section-alt" id="experience">
          <div className="container">
            <div className="section-heading">
              <h2>Professional Trajectory</h2>
              <div className="heading-line" />
            </div>

            <article className="experience-card glass-card">
              <div className="experience-icon" aria-hidden="true">
                <span className="material-symbols-outlined">memory</span>
              </div>

              <div className="experience-content">
                <div className="experience-top">
                  <div>
                    <h3>Senior Software Engineer</h3>
                    <p className="company">Second Mind</p>
                  </div>
                  <p className="period">2021 — PRESENT</p>
                </div>

                <p className="experience-text">
                  Leading core infrastructure development for enterprise-scale distributed systems, focusing on
                  performance optimization and reliable data pipelines.
                </p>

                <div className="metric-grid">
                  <article className="metric">
                    <p className="metric-value">50%</p>
                    <p className="metric-label">LATENCY REDUCTION</p>
                  </article>
                  <article className="metric">
                    <p className="metric-value">10k+</p>
                    <p className="metric-label">CONCURRENT USERS</p>
                  </article>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="stack" id="stack">
          <div className="container">
            <div className="stack-heading">
              <h2>Technical Arsenal</h2>
              <p>Engineered with modern standards and best practices.</p>
            </div>

            <div className="stack-grid">
              <article className="stack-card glass-card">
                <h4>Languages</h4>
                <div className="chip-row">
                  {languages.map((item) => (
                    <span key={item} className="chip chip-muted">
                      {item}
                    </span>
                  ))}
                </div>
              </article>

              <article className="stack-card glass-card">
                <h4>Frameworks</h4>
                <div className="chip-row">
                  {frameworks.map((item) => (
                    <span key={item} className="chip chip-muted">
                      {item}
                    </span>
                  ))}
                </div>
              </article>

              <article className="stack-card stack-wide glass-card">
                <div>
                  <h4>Cloud &amp; DevOps</h4>
                  <p className="stack-copy">Architecting resilient infrastructure on AWS using modern IAC tools.</p>
                </div>

                <div className="cloud-icons">
                  {cloudTools.map((tool) => (
                    <div key={tool.label} className="cloud-icon-item">
                      <span className="cloud-icon glass-card">
                        <span className="material-symbols-outlined">{tool.icon}</span>
                      </span>
                      <span>{tool.label}</span>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="education section-alt">
          <div className="container">
            <article className="education-card glass-card">
              <span className="material-symbols-outlined education-mark" aria-hidden="true">
                school
              </span>

              <h2>Academic Foundation</h2>
              <div>
                <h3>Bachelor of Science in Software Engineering</h3>
                <p className="company">Technical University of Architecture</p>
              </div>
              <p>
                Rigorous focus on algorithmic complexity, data structures, and software design patterns. Specialized
                in distributed systems and high-concurrency environments during the final thesis project.
              </p>
            </article>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="container">
            <article className="contact-card glass-card ambient-glow">
              <h2>
                Let&apos;s build something <span>scalable</span> together
              </h2>
              <p>
                Currently available for senior architectural roles or specialized consulting. Fluent in English (C1
                Proficiency).
              </p>

              <div className="contact-actions">
                <a className="cta cta-primary" href="mailto:architect@engineercore.dev">
                  <span className="material-symbols-outlined">mail</span>
                  Contact Me
                </a>
                <a className="cta cta-outline" href="#projects">
                  View Documentation
                </a>
              </div>

              <div className="contact-meta">
                <p>
                  <span className="material-symbols-outlined">translate</span>
                  ENGLISH: C1 ADVANCED
                </p>
                <p>
                  <span className="material-symbols-outlined">location_on</span>
                  REMOTE / GLOBAL
                </p>
              </div>
            </article>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <a className="brand footer-brand" href="#projects">
            ENGINEER_CORE
          </a>

          <p>© 2024 SYSTEM ARCHITECT. BUILT WITH PRECISION.</p>

          <div className="footer-links">
            <a href="#">GITHUB</a>
            <a href="#">LINKEDIN</a>
            <a href="#">TERMINAL</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
