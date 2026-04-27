import { useEffect, useState } from 'react'
import './App.css'
import architectAvatar from './assets/architect-avatar.svg'

const navItems = [
  { id: 'projects', labelKey: 'projects', href: '#projects' },
  { id: 'experience', labelKey: 'experience', href: '#experience' },
  { id: 'stack', labelKey: 'stack', href: '#stack' },
  { id: 'contact', labelKey: 'contact', href: '#contact' },
]

const heroTags = ['.NET', 'NestJS', 'AWS', 'Kubernetes']
const languageTags = ['C#', 'TypeScript', 'Go', 'SQL']
const frameworkTags = ['.NET 8', 'NestJS', 'React', 'Entity Framework']

const copy = {
  en: {
    nav: {
      projects: 'Projects',
      experience: 'Experience',
      stack: 'Stack',
      contact: 'Contact',
    },
    resume: 'Resume',
    languageSelector: 'Language selector',
    heroRole: 'SYSTEM ARCHITECT',
    heroTitle: 'Building High-Performance Distributed Systems',
    heroParagraph1:
      'Specializing in robust backend architectures and scalable cloud solutions.',
    heroParagraph2: 'Expertly navigating the intersection of .NET, NestJS, and AWS.',
    trajectory: 'Professional Trajectory',
    roleTitle: 'Senior Software Engineer',
    roleCompany: 'Second Mind',
    rolePeriod: '2021 - PRESENT',
    roleDescription:
      'Leading core infrastructure development for enterprise-scale distributed systems, focusing on performance optimization and reliable data pipelines.',
    metricLatency: 'LATENCY REDUCTION',
    metricUsers: 'CONCURRENT USERS',
    arsenalTitle: 'Technical Arsenal',
    arsenalSubtitle: 'Engineered with modern standards and best practices.',
    stackLanguages: 'Languages',
    stackFrameworks: 'Frameworks',
    stackCloud: 'Cloud & DevOps',
    stackCloudDescription:
      'Architecting resilient infrastructure on AWS using modern IaC tools.',
    educationLabel: 'Academic Foundation',
    educationTitle: 'Bachelor of Science in Software Engineering',
    educationUniversity: 'Technical University of Architecture',
    educationDescription:
      'Rigorous focus on algorithmic complexity, data structures, and software design patterns. Specialized in distributed systems and high-concurrency environments during the final thesis project.',
    contactHeadingPrefix: "Let's build something ",
    contactHeadingHighlight: 'scalable',
    contactHeadingSuffix: ' together',
    contactDescription:
      'Currently available for senior architectural roles or specialized consulting. Fluent in English (C1 Proficiency).',
    contactBtnPrimary: 'Contact Me',
    contactBtnSecondary: 'View Documentation',
    contactLanguage: 'ENGLISH: C1 ADVANCED',
    contactLocation: 'REMOTE / GLOBAL',
    footerCopy: '© 2026 SYSTEM ARCHITECT. BUILT WITH PRECISION.',
    footerGithub: 'GITHUB',
    footerLinkedin: 'LINKEDIN',
    footerTerminal: 'TERMINAL',
  },
  pt: {
    nav: {
      projects: 'Projetos',
      experience: 'Experiência',
      stack: 'Stack',
      contact: 'Contato',
    },
    resume: 'Currículo',
    languageSelector: 'Seletor de idioma',
    heroRole: 'ARQUITETO DE SISTEMAS',
    heroTitle: 'Construindo Sistemas Distribuídos de Alta Performance',
    heroParagraph1:
      'Especializado em arquiteturas robustas de backend e soluções cloud escaláveis.',
    heroParagraph2: 'Atuando na interseção entre .NET, NestJS e AWS.',
    trajectory: 'Trajetória Profissional',
    roleTitle: 'Engenheiro de Software Sênior',
    roleCompany: 'Second Mind',
    rolePeriod: '2021 - PRESENTE',
    roleDescription:
      'Liderando o desenvolvimento da infraestrutura central para sistemas distribuídos em escala empresarial, com foco em otimização de performance e pipelines de dados confiáveis.',
    metricLatency: 'REDUÇÃO DE LATÊNCIA',
    metricUsers: 'USUÁRIOS CONCORRENTES',
    arsenalTitle: 'Arsenal Técnico',
    arsenalSubtitle: 'Projetado com padrões modernos e boas práticas.',
    stackLanguages: 'Linguagens',
    stackFrameworks: 'Frameworks',
    stackCloud: 'Cloud & DevOps',
    stackCloudDescription:
      'Arquitetando infraestrutura resiliente em AWS com ferramentas modernas de IaC.',
    educationLabel: 'Formação Acadêmica',
    educationTitle: 'Bacharelado em Engenharia de Software',
    educationUniversity: 'Universidade Técnica de Arquitetura',
    educationDescription:
      'Foco rigoroso em complexidade algorítmica, estruturas de dados e padrões de design de software. Especialização em sistemas distribuídos e ambientes de alta concorrência no projeto final.',
    contactHeadingPrefix: 'Vamos construir algo ',
    contactHeadingHighlight: 'escalável',
    contactHeadingSuffix: ' juntos',
    contactDescription:
      'Disponível para posições seniores de arquitetura e consultoria especializada. Fluente em inglês (proficiência C1).',
    contactBtnPrimary: 'Fale Comigo',
    contactBtnSecondary: 'Ver Documentação',
    contactLanguage: 'INGLÊS: C1 AVANÇADO',
    contactLocation: 'REMOTO / GLOBAL',
    footerCopy: '© 2026 ARQUITETO DE SISTEMAS. CONSTRUÍDO COM PRECISÃO.',
    footerGithub: 'GITHUB',
    footerLinkedin: 'LINKEDIN',
    footerTerminal: 'TERMINAL',
  },
}

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
  const [language, setLanguage] = useState('en')
  const t = copy[language]

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

  useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en'
  }, [language])

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
                {t.nav[item.labelKey]}
              </a>
            ))}
          </nav>

          <div className="topbar-actions">
            <div className="lang-switch" role="group" aria-label={t.languageSelector}>
              <button
                type="button"
                className={language === 'en' ? 'lang-btn is-active' : 'lang-btn'}
                onClick={() => setLanguage('en')}
              >
                EN
              </button>
              <button
                type="button"
                className={language === 'pt' ? 'lang-btn is-active' : 'lang-btn'}
                onClick={() => setLanguage('pt')}
              >
                PT
              </button>
            </div>

            <a className="resume-btn" href="#contact">
              {t.resume}
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="hero section" id="projects">
          <div className="section-inner hero-grid">
            <div className="hero-copy">
              <span className="pill">{t.heroRole}</span>
              <p className="hero-title">{t.heroTitle}</p>
              <p className="hero-paragraph">{t.heroParagraph1}</p>
              <p className="hero-paragraph">{t.heroParagraph2}</p>

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
            <p className="section-label">{t.trajectory}</p>
            <div className="section-divider" aria-hidden="true"></div>

            <article className="job-card">
              <div className="job-header">
                <div className="job-main">
                  <div className="role-icon" aria-hidden="true">
                    <GearIcon />
                  </div>
                  <div>
                    <h2>{t.roleTitle}</h2>
                    <p className="job-company">{t.roleCompany}</p>
                  </div>
                </div>
                <p className="job-period">{t.rolePeriod}</p>
              </div>

              <p className="job-description">{t.roleDescription}</p>

              <div className="metrics-grid">
                <article className="metric-card">
                  <p className="metric-value">50%</p>
                  <p className="metric-label">{t.metricLatency}</p>
                </article>
                <article className="metric-card">
                  <p className="metric-value">10k+</p>
                  <p className="metric-label">{t.metricUsers}</p>
                </article>
              </div>
            </article>
          </div>
        </section>

        <section className="stack section" id="stack">
          <div className="section-inner">
            <div className="stack-heading">
              <h2>{t.arsenalTitle}</h2>
              <p>{t.arsenalSubtitle}</p>
            </div>

            <div className="stack-grid">
              <article className="stack-card">
                <p className="stack-title">{t.stackLanguages}</p>
                <div className="chip-row">
                  {languageTags.map((tag) => (
                    <span key={tag} className="chip">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>

              <article className="stack-card">
                <p className="stack-title">{t.stackFrameworks}</p>
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
                  <p className="stack-title">{t.stackCloud}</p>
                  <p className="stack-copy">{t.stackCloudDescription}</p>
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
                <p className="section-label section-label-muted">{t.educationLabel}</p>
                <h2>{t.educationTitle}</h2>
                <p className="job-company">{t.educationUniversity}</p>
                <p className="education-copy">{t.educationDescription}</p>
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
                {t.contactHeadingPrefix}
                <span>{t.contactHeadingHighlight}</span>
                {t.contactHeadingSuffix}
              </h2>
              <p>{t.contactDescription}</p>

              <div className="contact-actions">
                <a className="btn btn-primary" href="mailto:architect@engineercore.dev">
                  <MailIcon />
                  {t.contactBtnPrimary}
                </a>
                <a className="btn btn-outline" href="#projects">
                  <DocIcon />
                  {t.contactBtnSecondary}
                </a>
              </div>

              <div className="contact-meta">
                <p>
                  <LanguageIcon />
                  {t.contactLanguage}
                </p>
                <p>
                  <PinIcon />
                  {t.contactLocation}
                </p>
              </div>
            </article>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="section-inner footer-inner">
          <p className="brand">ENGINEER_CORE</p>
          <p>{t.footerCopy}</p>
          <nav aria-label="External links">
            <a href="https://github.com/Zenx007" target="_blank" rel="noopener noreferrer">
              {t.footerGithub}
            </a>
            <a
              href="https://www.linkedin.com/in/jo%C3%A3o-victor-218b26315"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.footerLinkedin}
            </a>
            <a href="#contact">{t.footerTerminal}</a>
          </nav>
        </div>
      </footer>
    </div>
  )
}

export default App
