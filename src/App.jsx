import { useEffect, useRef, useState } from 'react'
import './App.css'
import profilePhoto from './assets/profile-photo.png'

const LANGUAGE_STORAGE_KEY = 'portfolio-language'
const NAV_SECTION_IDS = ['top', 'experience', 'projects', 'stack', 'contact']
const NAV_SCROLL_IDLE_MS = 140
const SUMMARY_WAVE_SPLIT_DURATION_MS = 1100
const SUMMARY_WAVE_LOCAL_RADIUS_PX = 130

const translations = {
  en: {
    nav: {
      summary: 'Summary',
      stack: 'Stack',
      projects: 'Projects',
      experience: 'Experience',
      contact: 'Contact',
      resume: 'Resume.pdf',
    },
    language: {
      english: 'English',
      portuguese: 'Portuguese',
    },
    hero: {
      badge: 'SYSTEM ARCHITECT',
      titleStart: 'Building High-Performance',
      titleHighlight: 'Distributed Systems',
      description:
        'Seasoned systems architect specialized in crafting robust backend infrastructures and high-performance APIs. I architect scalable cloud solutions across the .NET, NestJS, and AWS ecosystems, focusing on mission-critical stability and extreme throughput for enterprise platforms.',
      profileAlt: 'Profile photo',
    },
    experience: {
      title: 'Professional Trajectory',
      subtitle: 'A timeline of technical growth and architecture of complex systems.',
      terminalPrimaryLabel: 'ANALYSIS_SYSTEMS.LOG',
      terminalSecondaryLabel: 'CORE_DEV.LOG',
      activeStatus: 'ACTIVE',
      primaryRole: 'Systems Analyst',
      primaryDate: 'FEB 2026 - PRESENT',
      primaryCompany: 'Second Mind',
      primaryDescription:
        'I worked on the development and maintenance of back-end systems, being responsible for implementing APIs and services that support web and mobile applications. I worked with C# (.NET), Node.js, and Python, focusing on building scalable, secure, and high-performance solutions. My main responsibilities included developing REST APIs, integrating with external services, and modeling data in PostgreSQL, as well as optimizing queries and continuously improving application performance. I also participate in deployment and maintenance routines in cloud environments such as Amazon Web Services and Railway, collaborating with the evolution of the architecture and ensuring system stability.',
      uptimeLabel: 'UPTIME ARCHITECTURE',
      latencyLabel: 'LATENCY REDUCTION',
      microservicesLabel: 'MICROSERVICES',
      secondaryRole: 'Software Developer',
      secondaryDate: 'MAY 2025 - FEB 2026',
      secondaryCompany: 'Second Mind',
      secondaryDescription:
        'I worked on the development and maintenance of back-end systems, being responsible for implementing APIs and services that support web and mobile applications. I worked with C# (.NET), Node.js, and Python, focusing on building scalable, secure, and high-performance solutions. My main responsibilities included developing REST APIs, integrating with external services, and modeling data in PostgreSQL, as well as optimizing queries and continuously improving application performance. I also participate in deployment and maintenance routines in cloud environments such as Amazon Web Services and Railway, collaborating with the evolution of the architecture and ensuring system stability.',
      secondaryTagOne: 'High-Volume Data Pipelines',
      secondaryTagTwo: 'Observability Implementation',
    },
    projects: {
      title: 'Technical Labs',
      description: 'Experimental architectures and core engineering prototypes.',
      architectures: 'ARCHITECTURES',
      components: 'COMPONENTS',
      github: 'GITHUB',
      demo: 'DEMO',
      firstAlt: 'Cloud Infrastructure Project',
      firstTitle: 'Zero-Trust Cloud Mesh',
      firstDescription:
        'Automated multi-region infrastructure deployment with service mesh integration and strict identity-based security policies.',
      secondAlt: 'High Performance API',
      secondTitle: 'High-Throughput Gateway',
      secondDescription:
        'A custom API gateway implementation optimized for low-latency gRPC to REST translation and dynamic request routing.',
      thirdAlt: 'Realtime Data',
      thirdTitle: 'Event Streaming Hub',
      thirdDescription:
        'Scalable pub/sub architecture handling 50k+ events/sec with guaranteed delivery and persistent audit trails.',
    },
    stack: {
      title: 'Technical Arsenal',
      description: 'Engineered with modern standards and best practices.',
      backendTitle: 'Backend Mastery',
      backendDescription:
        'Architecting high-throughput services and robust data pipelines with enterprise-grade reliability.',
      frontendTitle: 'Frontend Excellence',
      frontendDescription:
        'Crafting responsive, accessible, and performant user interfaces with modern web technologies.',
    },
    education: {
      title: 'Academic Foundation',
      degree: 'Bachelor of Science in Software Engineering',
      university: 'Technical University of Architecture',
      description:
        'Rigorous focus on algorithmic complexity, data structures, and software design patterns. Specialized in distributed systems and high-concurrency environments during the final thesis project.',
    },
    contact: {
      titleStart: "Let's build something",
      titleHighlight: 'scalable',
      titleEnd: 'together',
      description:
        'Currently available for senior architectural roles or specialized consulting. Fluent in English (C1 Proficiency).',
      primaryButton: 'Contact Me',
      secondaryButton: 'View Documentation',
      languageLevel: 'ENGLISH: C1 ADVANCED',
      availability: 'REMOTE / GLOBAL',
    },
    footer: {
      status: 'System Status',
      documentation: 'Documentation',
      privacy: 'Privacy',
    },
  },
  pt: {
    nav: {
      summary: 'Resumo',
      stack: 'Stack',
      projects: 'Projetos',
      experience: 'Experiencia',
      contact: 'Contato',
      resume: 'Curriculo.pdf',
    },
    language: {
      english: 'Ingles',
      portuguese: 'Portugues',
    },
    hero: {
      badge: 'ARQUITETO DE SISTEMAS',
      titleStart: 'Construindo',
      titleHighlight: 'Sistemas Distribuidos de Alta Performance',
      description:
        'Arquiteto de sistemas com experiencia na construcao de infraestruturas de backend robustas e APIs de alta performance. Projeto solucoes em nuvem escalaveis nos ecossistemas .NET, NestJS e AWS, com foco em estabilidade critica e alta vazao para plataformas corporativas.',
      profileAlt: 'Foto de perfil',
    },
    experience: {
      title: 'Trajetória Profissional',
      subtitle: 'Uma linha do tempo de evolução técnica e arquitetura de sistemas complexos.',
      terminalPrimaryLabel: 'ANALISE_SISTEMAS.LOG',
      terminalSecondaryLabel: 'CORE_DEV.LOG',
      activeStatus: 'ATIVO',
      primaryRole: 'Analista de Sistemas',
      primaryDate: 'FEV 2026 - ATUAL',
      primaryCompany: 'Second Mind',
      primaryDescription:
        'Atuei no desenvolvimento e manutenção de sistemas back-end, sendo responsável pela implementação de APIs e serviços que suportam aplicações web e mobile. Trabalhei com C# (.NET), Node.js e Python, focando na construção de soluções escaláveis, seguras e com alto desempenho. Minhas principais responsabilidades incluíam o desenvolvimento de APIs REST, integração com serviços externos e modelagem de dados em PostgreSQL, além da otimização de consultas e melhoria contínua da performance das aplicações. Também participo de rotinas de deploy e manutenção em ambientes cloud como Amazon Web Services e Railway, colaborando com a evolução da arquitetura e garantindo a estabilidade dos sistemas.',
      uptimeLabel: 'ARQUITETURA DE UPTIME',
      latencyLabel: 'REDUCAO DE LATENCIA',
      microservicesLabel: 'MICROSSERVIÇOS',
      secondaryRole: 'Desenvolvedor de Software',
      secondaryDate: 'MAI 2025 - FEV 2026',
      secondaryCompany: 'Second Mind',
      secondaryDescription:
        'Atuei no desenvolvimento e manutenção de sistemas back-end, sendo responsável pela implementação de APIs e serviços que suportam aplicações web e mobile. Trabalhei com C# (.NET), Node.js e Python, focando na construção de soluções escaláveis, seguras e com alto desempenho. Minhas principais responsabilidades incluíam o desenvolvimento de APIs REST, integração com serviços externos e modelagem de dados em PostgreSQL, além da otimização de consultas e melhoria contínua da performance das aplicações. Também participo de rotinas de deploy e manutenção em ambientes cloud como Amazon Web Services e Railway, colaborando com a evolução da arquitetura e garantindo a estabilidade dos sistemas.',
      secondaryTagOne: 'Pipelines de Dados de Alto Volume',
      secondaryTagTwo: 'Implementacao de Observabilidade',
    },
    projects: {
      title: 'Laboratorios Tecnicos',
      description: 'Arquiteturas experimentais e prototipos de engenharia de software.',
      architectures: 'ARQUITETURAS',
      components: 'COMPONENTES',
      github: 'GITHUB',
      demo: 'DEMO',
      firstAlt: 'Projeto de Infraestrutura em Nuvem',
      firstTitle: 'Malha Cloud Zero-Trust',
      firstDescription:
        'Implantacao automatizada de infraestrutura multi-regiao com integracao de service mesh e politicas rigorosas de seguranca baseadas em identidade.',
      secondAlt: 'API de Alta Performance',
      secondTitle: 'Gateway de Alto Throughput',
      secondDescription:
        'Implementacao de gateway de API otimizada para traducao de gRPC para REST com baixa latencia e roteamento dinamico de requisicoes.',
      thirdAlt: 'Dados em Tempo Real',
      thirdTitle: 'Hub de Streaming de Eventos',
      thirdDescription:
        'Arquitetura pub/sub escalavel processando 50k+ eventos/seg com entrega garantida e trilhas de auditoria persistentes.',
    },
    stack: {
      title: 'Arsenal Tecnico',
      description: 'Projetado com padroes modernos e boas praticas.',
      backendTitle: 'Dominio de Backend',
      backendDescription:
        'Arquitetando servicos de alto throughput e pipelines de dados robustos com confiabilidade de nivel corporativo.',
      frontendTitle: 'Excelencia em Frontend',
      frontendDescription:
        'Criando interfaces responsivas, acessiveis e performaticas com tecnologias web modernas.',
    },
    education: {
      title: 'Base Academica',
      degree: 'Bacharelado em Engenharia de Software',
      university: 'Universidade Tecnica de Arquitetura',
      description:
        'Foco rigoroso em complexidade algoritmica, estruturas de dados e padroes de design de software. Especializacao em sistemas distribuidos e ambientes de alta concorrencia no projeto final de tese.',
    },
    contact: {
      titleStart: 'Vamos construir algo',
      titleHighlight: 'escalavel',
      titleEnd: 'juntos',
      description:
        'Disponivel para posicoes seniores de arquitetura ou consultoria especializada. Ingles fluente (C1).',
      primaryButton: 'Falar Comigo',
      secondaryButton: 'Ver Documentacao',
      languageLevel: 'INGLES: C1 AVANCADO',
      availability: 'REMOTO / GLOBAL',
    },
    footer: {
      status: 'Status do Sistema',
      documentation: 'Documentacao',
      privacy: 'Privacidade',
    },
  },
}

const resolveInitialLanguage = () => {
  if (typeof window === 'undefined') {
    return 'en'
  }

  const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
  if (savedLanguage === 'en' || savedLanguage === 'pt') {
    return savedLanguage
  }

  return window.navigator.language.toLowerCase().startsWith('pt') ? 'pt' : 'en'
}

function App() {
  const [language, setLanguage] = useState(resolveInitialLanguage)
  const [activeSection, setActiveSection] = useState(NAV_SECTION_IDS[0])
  const [isSummaryWaveSplitActive, setIsSummaryWaveSplitActive] = useState(false)
  const [summaryWaveSplitPoint, setSummaryWaveSplitPoint] = useState({ x: '50%', y: '50%' })
  const pendingNavTargetRef = useRef(null)
  const isClickNavigatingRef = useRef(false)
  const clickScrollIdleTimeoutRef = useRef(null)
  const summaryWaveSplitTimeoutRef = useRef(null)
  const summaryWaveSplitFrameRef = useRef(null)
  const copy = translations[language]
  const navItems = [
    { id: 'top', label: copy.nav.summary },
    { id: 'experience', label: copy.nav.experience },
    { id: 'projects', label: copy.nav.projects },
    { id: 'stack', label: copy.nav.stack },
    { id: 'contact', label: copy.nav.contact },
  ]

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en'
  }, [language])

  const getNavOffset = () => 24

  const handleSummaryWaveClick = (event) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const sectionBounds = event.currentTarget.getBoundingClientRect()
    const clickX = event.clientX - sectionBounds.left
    const clickY = event.clientY - sectionBounds.top

    setSummaryWaveSplitPoint({ x: `${clickX}px`, y: `${clickY}px` })
    setIsSummaryWaveSplitActive(false)
    window.clearTimeout(summaryWaveSplitTimeoutRef.current)

    if (summaryWaveSplitFrameRef.current !== null) {
      window.cancelAnimationFrame(summaryWaveSplitFrameRef.current)
    }

    summaryWaveSplitFrameRef.current = window.requestAnimationFrame(() => {
      setIsSummaryWaveSplitActive(true)
      summaryWaveSplitTimeoutRef.current = window.setTimeout(() => {
        setIsSummaryWaveSplitActive(false)
        summaryWaveSplitTimeoutRef.current = null
      }, SUMMARY_WAVE_SPLIT_DURATION_MS)
      summaryWaveSplitFrameRef.current = null
    })
  }

  const handleNavItemClick = (event, sectionId) => {
    event.preventDefault()

    const sectionElement = document.getElementById(sectionId)
    if (!sectionElement) {
      return
    }

    const targetScrollTop = Math.max(
      0,
      sectionElement.getBoundingClientRect().top + window.scrollY - getNavOffset(),
    )

    const hasDistanceToScroll = Math.abs(window.scrollY - targetScrollTop) > 1
    pendingNavTargetRef.current = sectionId
    isClickNavigatingRef.current = hasDistanceToScroll
    window.clearTimeout(clickScrollIdleTimeoutRef.current)
    clickScrollIdleTimeoutRef.current = null

    setActiveSection(sectionId)
    window.scrollTo({ top: targetScrollTop, behavior: hasDistanceToScroll ? 'smooth' : 'auto' })
  }

  useEffect(() => {
    let ticking = false

    const finalizeClickNavigation = () => {
      const pendingSectionId = pendingNavTargetRef.current
      if (pendingSectionId) {
        setActiveSection((previousSection) => (previousSection === pendingSectionId ? previousSection : pendingSectionId))
      }

      isClickNavigatingRef.current = false
      pendingNavTargetRef.current = null
      window.clearTimeout(clickScrollIdleTimeoutRef.current)
      clickScrollIdleTimeoutRef.current = null
    }

    const resolveActiveSection = () => {
      const sectionElements = NAV_SECTION_IDS.map((sectionId) => document.getElementById(sectionId)).filter(Boolean)
      if (sectionElements.length === 0) {
        return NAV_SECTION_IDS[0]
      }

      const currentScrollTop = window.scrollY
      if (currentScrollTop <= 4) {
        return NAV_SECTION_IDS[0]
      }

      const isAtBottom = window.innerHeight + currentScrollTop >= document.documentElement.scrollHeight - 2
      if (isAtBottom) {
        return sectionElements[sectionElements.length - 1].id
      }

      const trackingLine = currentScrollTop + getNavOffset()
      for (let index = sectionElements.length - 1; index >= 0; index -= 1) {
        const sectionTop = sectionElements[index].getBoundingClientRect().top + currentScrollTop
        if (trackingLine >= sectionTop) {
          return sectionElements[index].id
        }
      }

      return NAV_SECTION_IDS[0]
    }

    const updateActiveSection = () => {
      if (isClickNavigatingRef.current) {
        const pendingSectionId = pendingNavTargetRef.current
        if (pendingSectionId) {
          setActiveSection((previousSection) => (previousSection === pendingSectionId ? previousSection : pendingSectionId))
        }
        ticking = false
        return
      }

      const nextSection = resolveActiveSection()
      setActiveSection((previousSection) => (previousSection === nextSection ? previousSection : nextSection))
      ticking = false
    }

    const onScrollOrResize = () => {
      if (isClickNavigatingRef.current) {
        window.clearTimeout(clickScrollIdleTimeoutRef.current)
        clickScrollIdleTimeoutRef.current = window.setTimeout(() => {
          finalizeClickNavigation()
          window.requestAnimationFrame(updateActiveSection)
        }, NAV_SCROLL_IDLE_MS)
      }

      if (ticking) {
        return
      }

      ticking = true
      window.requestAnimationFrame(updateActiveSection)
    }

    const onScrollEnd = () => {
      if (!isClickNavigatingRef.current) {
        return
      }

      finalizeClickNavigation()
      window.requestAnimationFrame(updateActiveSection)
    }

    updateActiveSection()
    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize)
    window.addEventListener('scrollend', onScrollEnd)

    return () => {
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
      window.removeEventListener('scrollend', onScrollEnd)
      window.clearTimeout(clickScrollIdleTimeoutRef.current)
    }
  }, [])

  useEffect(() => {
    return () => {
      window.clearTimeout(summaryWaveSplitTimeoutRef.current)
      if (summaryWaveSplitFrameRef.current !== null) {
        window.cancelAnimationFrame(summaryWaveSplitFrameRef.current)
      }
    }
  }, [])

  const getLanguageButtonClass = (targetLanguage) => {
    const baseClass =
      'flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-slate-800 text-sm transition-all'

    if (language === targetLanguage) {
      return `${baseClass} border border-white/20 opacity-100 ring-2 ring-primary-container/50`
    }

    return `${baseClass} border border-white/10 opacity-50 hover:opacity-100`
  }

  const summaryWaveSplitStyle = {
    '--summary-wave-click-x': summaryWaveSplitPoint.x,
    '--summary-wave-click-y': summaryWaveSplitPoint.y,
    '--summary-wave-local-radius': `${SUMMARY_WAVE_LOCAL_RADIUS_PX}px`,
  }

  return (
    <div className="bg-background text-on-background font-body-md selection:bg-primary-container selection:text-on-primary-fixed">
      <nav
        className="relative z-20 flex w-full items-center justify-between bg-slate-900/60 px-6 py-4 shadow-[0_4px_20px_rgba(0,229,255,0.05)] backdrop-blur-xl"
      >
        <a
          className="flex items-center gap-3 font-inter text-cyan-400"
          href="#top"
          onClick={(event) => handleNavItemClick(event, 'top')}
        >
          <img
            alt="Foto do desenvolvedor"
            className="h-10 w-10 rounded-md border border-cyan-500/30 object-cover shadow-[0_0_14px_rgba(0,229,255,0.2)]"
            src="/header-photo.png"
          />
          <span className="text-sm font-black tracking-tight sm:text-base">Desenvolvedor Fullstack</span>
        </a>

        <div className="hidden items-center gap-8 font-inter tracking-tight md:flex">
          {navItems.map((item) => {
            const isActive = activeSection === item.id

            return (
              <a
                className={`border-b-2 pb-1 transition-colors ${
                  isActive
                    ? 'border-cyan-400 font-semibold text-cyan-400'
                    : 'border-transparent text-slate-400 hover:text-slate-100'
                }`}
                href={`#${item.id}`}
                key={item.id}
                onClick={(event) => handleNavItemClick(event, item.id)}
              >
                {item.label}
              </a>
            )
          })}
        </div>

        <div className="flex items-center gap-4">
          <div className="mr-4 flex items-center gap-2 rounded-full border border-white/5 bg-black/20 p-1.5">
            <button
              aria-pressed={language === 'en'}
              className={getLanguageButtonClass('en')}
              onClick={() => setLanguage('en')}
              title={copy.language.english}
              type="button"
            >
              🇺🇸
            </button>
            <button
              aria-pressed={language === 'pt'}
              className={getLanguageButtonClass('pt')}
              onClick={() => setLanguage('pt')}
              title={copy.language.portuguese}
              type="button"
            >
              🇧🇷
            </button>
          </div>

          <button
            className="rounded bg-primary-container px-6 py-2 font-bold text-on-primary-fixed transition-all duration-300 hover:scale-95 hover:opacity-80"
            type="button"
          >
            {copy.nav.resume}
          </button>
        </div>
      </nav>
      <div aria-hidden="true" className="h-px w-full bg-cyan-500/35" />

      <main>
        <section className="relative flex min-h-screen items-center overflow-hidden" id="top" onClick={handleSummaryWaveClick}>
          <div
            aria-hidden="true"
            className={`summary-wave-background absolute inset-0 z-0 ${
              isSummaryWaveSplitActive ? 'summary-wave-background--split-active' : ''
            }`}
            style={summaryWaveSplitStyle}
          >
            <div className="summary-wave-glow" />
            <div className="summary-wave-grid summary-wave-grid--far" />
            <div className="summary-wave-grid summary-wave-grid--near" />
            <div className="summary-wave-contours summary-wave-contours--primary" />
            <div className="summary-wave-contours summary-wave-contours--secondary" />
            <div className="summary-wave-contours summary-wave-contours--tertiary" />

            <div
              className={`summary-wave-local-expansion ${
                isSummaryWaveSplitActive ? 'summary-wave-local-expansion--active' : ''
              }`}
            >
              <div className="summary-wave-grid summary-wave-grid--far" />
              <div className="summary-wave-grid summary-wave-grid--near" />
              <div className="summary-wave-contours summary-wave-contours--primary" />
              <div className="summary-wave-contours summary-wave-contours--secondary" />
              <div className="summary-wave-contours summary-wave-contours--tertiary" />
            </div>
          </div>

          <div className="container-max relative z-10 mx-auto grid items-center gap-stack-lg px-gutter lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-stack-md">
              <span className="rounded-full bg-primary-container/10 px-3 py-1 font-label-caps text-primary-container">
                {copy.hero.badge}
              </span>

              <h1 className="max-w-2xl font-h1 text-on-background">
                {copy.hero.titleStart} <span className="text-primary-container">{copy.hero.titleHighlight}</span>
              </h1>

              <p className="max-w-xl font-body-lg leading-relaxed text-on-surface-variant">{copy.hero.description}</p>

              <div className="flex flex-wrap gap-stack-sm pt-stack-sm">
                <span className="glass-card rounded-full px-4 py-1.5 font-code-snippet text-primary-container">.NET</span>
                <span className="glass-card rounded-full px-4 py-1.5 font-code-snippet text-primary-container">
                  NestJS
                </span>
                <span className="glass-card rounded-full px-4 py-1.5 font-code-snippet text-primary-container">AWS</span>
                <span className="glass-card rounded-full px-4 py-1.5 font-code-snippet text-primary-container">
                  Kubernetes
                </span>
              </div>
            </div>

            <div className="hidden w-full justify-end lg:flex">
              <div className="group relative w-full max-w-md">
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary-container/50 to-transparent opacity-25 blur transition duration-1000 group-hover:opacity-50 group-hover:duration-200" />

                <div className="ambient-glow glass-card relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 shadow-2xl backdrop-blur-xl">
                  <img
                    alt={copy.hero.profileAlt}
                    className="h-full w-full object-cover"
                    src={profilePhoto}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface-container-low py-section-padding" id="experience">
          <div className="container-max mx-auto px-gutter">
            <div className="mb-stack-lg">
              <h2 className="font-inter text-4xl font-extrabold leading-[0.95] tracking-[-0.03em] text-[#c3d5eb] sm:text-5xl md:text-[66px]">
                {copy.experience.title}
              </h2>
              <p className="mt-3 font-inter text-base text-[#b8c8da]">{copy.experience.subtitle}</p>
              <div className="mt-4 h-1 w-24 bg-primary-container" />
            </div>

            <div className="grid gap-stack-md">
              <div className="glass-card overflow-hidden rounded-xl">
                <div className="terminal-header flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                    <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
                    <span className="font-code-snippet text-[11px] tracking-[0.2em] text-slate-500">
                      {copy.experience.terminalPrimaryLabel}
                    </span>
                  </div>
                  <span className="rounded-sm bg-primary-container/20 px-2 py-0.5 font-code-snippet text-[10px] text-primary-container">
                    {copy.experience.activeStatus}
                  </span>
                </div>

                <div className="relative flex flex-col items-start gap-8 p-stack-lg md:flex-row">
                  <div className="absolute right-0 top-0 h-full w-1 bg-primary-container" />

                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-primary-container/10">
                    <span className="material-symbols-outlined text-4xl text-primary-container" data-icon="architecture">
                      architecture
                    </span>
                  </div>

                  <div className="flex-grow">
                    <div className="mb-4 flex flex-col items-start justify-between md:flex-row md:items-center">
                      <div>
                        <h3 className="text-2xl font-bold text-white">{copy.experience.primaryRole}</h3>
                        <p className="font-medium text-primary-container">{copy.experience.primaryCompany}</p>
                      </div>
                      <span className="rounded bg-primary-container/5 px-3 py-1 font-code-snippet text-primary-container">
                        {copy.experience.primaryDate}
                      </span>
                    </div>

                    <div className="mb-5 flex flex-wrap gap-2">
                      {['C#', '.NET', 'Node.js', 'Python', 'PostgreSQL', 'AWS', 'Railway'].map((tag) => (
                        <span
                          key={`primary-tag-${tag}`}
                          className="rounded-sm border border-primary-container/15 bg-slate-900/60 px-2 py-1 font-code-snippet text-[10px] text-slate-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <p className="mb-6 max-w-3xl font-body-md text-on-surface-variant">{copy.experience.primaryDescription}</p>

                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="border border-primary-container/10 bg-surface-container p-4">
                        <div className="mb-1 text-4xl font-bold text-primary-container">99.99%</div>
                        <div className="font-label-caps text-sm text-slate-400">{copy.experience.uptimeLabel}</div>
                      </div>

                      <div className="border border-primary-container/10 bg-surface-container p-4">
                        <div className="mb-1 text-4xl font-bold text-primary-container">50%</div>
                        <div className="font-label-caps text-sm text-slate-400">{copy.experience.latencyLabel}</div>
                      </div>

                      <div className="border border-primary-container/10 bg-surface-container p-4">
                        <div className="mb-1 text-4xl font-bold text-primary-container">20+</div>
                        <div className="font-label-caps text-sm text-slate-400">{copy.experience.microservicesLabel}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card overflow-hidden rounded-xl opacity-80 transition-opacity hover:opacity-100">
                <div className="terminal-header flex items-center gap-3 px-4 py-3">
                  <div className="h-2.5 w-2.5 rounded-full bg-slate-600" />
                  <div className="h-2.5 w-2.5 rounded-full bg-slate-600" />
                  <div className="h-2.5 w-2.5 rounded-full bg-slate-600" />
                  <span className="font-code-snippet text-[11px] tracking-[0.2em] text-slate-600">
                    {copy.experience.terminalSecondaryLabel}
                  </span>
                </div>

                <div className="relative flex flex-col items-start gap-8 p-stack-lg md:flex-row">
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-slate-400/10">
                    <span className="material-symbols-outlined text-4xl text-slate-400" data-icon="terminal">
                      terminal
                    </span>
                  </div>

                  <div className="flex-grow">
                    <div className="mb-4 flex flex-col items-start justify-between md:flex-row md:items-center">
                      <div>
                        <h3 className="text-xl font-bold text-white">{copy.experience.secondaryRole}</h3>
                        <p className="font-medium text-slate-400">{copy.experience.secondaryCompany}</p>
                      </div>
                      <span className="font-code-snippet text-slate-400">{copy.experience.secondaryDate}</span>
                    </div>

                    <p className="max-w-3xl font-body-md text-on-surface-variant">{copy.experience.secondaryDescription}</p>

                    <div className="mt-6 flex flex-wrap gap-6 text-xs text-slate-500">
                      <span>{copy.experience.secondaryTagOne}</span>
                      <span>{copy.experience.secondaryTagTwo}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-section-padding" id="projects">
          <div className="container-max mx-auto px-gutter">
            <div className="mb-stack-lg flex flex-col items-end justify-between gap-4 md:flex-row">
              <div>
                <h2 className="font-h2 text-on-background">{copy.projects.title}</h2>
                <p className="mt-2 text-on-surface-variant">{copy.projects.description}</p>
              </div>

              <div className="flex rounded-lg bg-surface-container-high p-1">
                <button className="rounded-md bg-primary-container px-6 py-2 text-sm font-bold text-on-primary-fixed" type="button">
                  {copy.projects.architectures}
                </button>
                <button className="rounded-md px-6 py-2 text-sm font-medium text-slate-400 transition-colors hover:text-white" type="button">
                  {copy.projects.components}
                </button>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="glass-card group flex flex-col overflow-hidden rounded-xl border border-white/5 transition-all duration-300 hover:border-primary-container/40">
                <div className="relative aspect-video overflow-hidden bg-surface-container-highest">
                  <img
                    alt={copy.projects.firstAlt}
                    className="h-full w-full object-cover opacity-60 transition-transform duration-500 group-hover:scale-105"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCplPS6nzU5oLfjNJ28njKnphdNfdnQaAnC7EDwIbxAkUqQdCFhj21bY92lBySVlyHxu86ogLefM69wYikUhkcZRslKYCn_QddjVc8OoYVWP_DxWVfEJXKT5EXDajUtE4GENkJ5Lc0NqHjwfMo5WTCINk_zBbZzvFqb5VAyIbo0_SYCSCEuiapAZpxSJfE7upurbt__fWFn9X1QwadKfcdi0lBiIzY55QoperOrLsBxypQNZWX_NAomXPsyn0anrT93i6xJ2LFbP8M"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />

                  <div className="absolute bottom-4 left-4 flex gap-2">
                    <span className="rounded border border-primary-container/20 bg-black/60 px-2 py-0.5 font-code-snippet text-[10px] text-primary-container">
                      TERRAFORM
                    </span>
                    <span className="rounded border border-primary-container/20 bg-black/60 px-2 py-0.5 font-code-snippet text-[10px] text-primary-container">
                      AWS
                    </span>
                  </div>
                </div>

                <div className="flex flex-grow flex-col p-6">
                  <h4 className="mb-2 text-xl font-bold text-white">{copy.projects.firstTitle}</h4>
                  <p className="mb-6 flex-grow text-sm text-on-surface-variant">{copy.projects.firstDescription}</p>

                  <div className="flex items-center justify-between border-t border-white/5 pt-4">
                    <a
                      className="flex items-center gap-2 font-label-caps text-xs text-slate-400 transition-colors hover:text-primary-container"
                      href="#"
                    >
                      <span className="material-symbols-outlined text-sm" data-icon="code">
                        code
                      </span>{' '}
                      {copy.projects.github}
                    </a>
                    <a className="flex items-center gap-2 font-label-caps text-xs text-primary-container hover:underline" href="#">
                      <span className="material-symbols-outlined text-sm" data-icon="launch">
                        launch
                      </span>{' '}
                      {copy.projects.demo}
                    </a>
                  </div>
                </div>
              </div>

              <div className="glass-card group flex flex-col overflow-hidden rounded-xl border border-white/5 transition-all duration-300 hover:border-primary-container/40">
                <div className="relative aspect-video overflow-hidden bg-surface-container-highest">
                  <img
                    alt={copy.projects.secondAlt}
                    className="h-full w-full object-cover opacity-60 transition-transform duration-500 group-hover:scale-105"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1tkvK4JCWX28yEqspgnVOzQDjyifUVetsdKOZk-D9fQc_XxT1F5UCaDTlIlHZMSdKLOzu-ND0YC71ISRmwo7JsdDdXhibyBgTkVyvu6tg8WrmVkMTfKk3UWZ__5IsTFz0-EyZIRbjFGc-Tq1uqPLXnY9TbG8S0AJxet5EpdL8rfM8KEAOVLUrpRXXbNV6BBdoHozJrEqZC_iEDtlVZi8NtWY6DmPc_dTF2-DvATOAz5FGKaeyVcNIe_LYIjUczEW5xpYrngSF7jA"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />

                  <div className="absolute bottom-4 left-4 flex gap-2">
                    <span className="rounded border border-primary-container/20 bg-black/60 px-2 py-0.5 font-code-snippet text-[10px] text-primary-container">
                      .NET 8
                    </span>
                    <span className="rounded border border-primary-container/20 bg-black/60 px-2 py-0.5 font-code-snippet text-[10px] text-primary-container">
                      GRPC
                    </span>
                  </div>
                </div>

                <div className="flex flex-grow flex-col p-6">
                  <h4 className="mb-2 text-xl font-bold text-white">{copy.projects.secondTitle}</h4>
                  <p className="mb-6 flex-grow text-sm text-on-surface-variant">{copy.projects.secondDescription}</p>

                  <div className="flex items-center justify-between border-t border-white/5 pt-4">
                    <a
                      className="flex items-center gap-2 font-label-caps text-xs text-slate-400 transition-colors hover:text-primary-container"
                      href="#"
                    >
                      <span className="material-symbols-outlined text-sm" data-icon="code">
                        code
                      </span>{' '}
                      {copy.projects.github}
                    </a>
                    <a className="flex items-center gap-2 font-label-caps text-xs text-primary-container hover:underline" href="#">
                      <span className="material-symbols-outlined text-sm" data-icon="launch">
                        launch
                      </span>{' '}
                      {copy.projects.demo}
                    </a>
                  </div>
                </div>
              </div>

              <div className="glass-card group flex flex-col overflow-hidden rounded-xl border border-white/5 transition-all duration-300 hover:border-primary-container/40">
                <div className="relative aspect-video overflow-hidden bg-surface-container-highest">
                  <img
                    alt={copy.projects.thirdAlt}
                    className="h-full w-full object-cover opacity-60 transition-transform duration-500 group-hover:scale-105"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLLKkPEtPoPykuQsFy7gioItD2yLTHCxZytJC-T6miwiLcsQPxiiNTnh9H-n9caphP0s3tutr4qkYMjS57WIBTe_fqZGMCsn7YOlfcIrjQLyDDUfW_ybUhBaw4DiQ-Meoc37K37AOqWiYXbY66caH5Em0GUbHnw3VYclVbCmbAbXxhpHRKoxvplTbfpRHkcmCOoWenLZzg3wcsEE1jt1MeZjUDKB27luMoHriVItCq3sAYcjFCvKMUTN9SKFjg60Gztb4eTysdHmw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />

                  <div className="absolute bottom-4 left-4 flex gap-2">
                    <span className="rounded border border-primary-container/20 bg-black/60 px-2 py-0.5 font-code-snippet text-[10px] text-primary-container">
                      NESTJS
                    </span>
                    <span className="rounded border border-primary-container/20 bg-black/60 px-2 py-0.5 font-code-snippet text-[10px] text-primary-container">
                      REDIS
                    </span>
                  </div>
                </div>

                <div className="flex flex-grow flex-col p-6">
                  <h4 className="mb-2 text-xl font-bold text-white">{copy.projects.thirdTitle}</h4>
                  <p className="mb-6 flex-grow text-sm text-on-surface-variant">{copy.projects.thirdDescription}</p>

                  <div className="flex items-center justify-between border-t border-white/5 pt-4">
                    <a
                      className="flex items-center gap-2 font-label-caps text-xs text-slate-400 transition-colors hover:text-primary-container"
                      href="#"
                    >
                      <span className="material-symbols-outlined text-sm" data-icon="code">
                        code
                      </span>{' '}
                      {copy.projects.github}
                    </a>
                    <a className="flex items-center gap-2 font-label-caps text-xs text-primary-container hover:underline" href="#">
                      <span className="material-symbols-outlined text-sm" data-icon="launch">
                        launch
                      </span>{' '}
                      {copy.projects.demo}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-section-padding" id="stack">
          <div className="container-max mx-auto px-gutter">
            <div className="mb-stack-lg text-center">
              <h2 className="font-h2 text-on-background">{copy.stack.title}</h2>
              <p className="mt-2 font-body-md text-on-surface-variant">{copy.stack.description}</p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="glass-card flex h-full flex-col rounded-xl border border-white/5 p-8 transition-colors hover:border-primary-container/30">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-primary-container/10">
                    <span className="material-symbols-outlined text-primary-container">dns</span>
                  </div>
                  <h3 className="font-h2 text-2xl text-white">{copy.stack.backendTitle}</h3>
                </div>

                <p className="mb-8 text-on-surface-variant">{copy.stack.backendDescription}</p>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  <div className="flex flex-col items-center justify-center rounded-lg border border-white/5 bg-surface-container-high p-4 transition-colors hover:bg-surface-container-highest">
                    <span className="material-symbols-outlined mb-2 text-3xl text-primary-container">terminal</span>
                    <span className="font-code-snippet text-sm font-semibold">C#</span>
                  </div>
                  <div className="flex flex-col items-center justify-center rounded-lg border border-white/5 bg-surface-container-high p-4 transition-colors hover:bg-surface-container-highest">
                    <span className="material-symbols-outlined mb-2 text-3xl text-primary-container">data_object</span>
                    <span className="font-code-snippet text-sm font-semibold">Java</span>
                  </div>
                  <div className="flex flex-col items-center justify-center rounded-lg border border-white/5 bg-surface-container-high p-4 transition-colors hover:bg-surface-container-highest">
                    <span className="material-symbols-outlined mb-2 text-3xl text-primary-container">database</span>
                    <span className="font-code-snippet text-sm font-semibold">SQL</span>
                  </div>
                  <div className="flex flex-col items-center justify-center rounded-lg border border-white/5 bg-surface-container-high p-4 transition-colors hover:bg-surface-container-highest">
                    <span className="material-symbols-outlined mb-2 text-3xl text-primary-container">bolt</span>
                    <span className="font-code-snippet text-sm font-semibold">Go</span>
                  </div>
                  <div className="flex flex-col items-center justify-center rounded-lg border border-white/5 bg-surface-container-high p-4 transition-colors hover:bg-surface-container-highest">
                    <span className="material-symbols-outlined mb-2 text-3xl text-primary-container">cloud</span>
                    <span className="font-code-snippet text-sm font-semibold">AWS</span>
                  </div>
                  <div className="flex flex-col items-center justify-center rounded-lg border border-white/5 bg-surface-container-high p-4 transition-colors hover:bg-surface-container-highest">
                    <span className="material-symbols-outlined mb-2 text-3xl text-primary-container">hub</span>
                    <span className="font-code-snippet text-sm font-semibold">Docker</span>
                  </div>
                </div>
              </div>

              <div className="glass-card flex h-full flex-col rounded-xl border border-white/5 p-8 transition-colors hover:border-primary-container/30">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-cyan-400/10">
                    <span className="material-symbols-outlined text-cyan-400">layers</span>
                  </div>
                  <h3 className="font-h2 text-2xl text-white">{copy.stack.frontendTitle}</h3>
                </div>

                <p className="mb-8 text-on-surface-variant">{copy.stack.frontendDescription}</p>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  <div className="flex flex-col items-center justify-center rounded-lg border border-white/5 bg-surface-container-high p-4 transition-colors hover:bg-surface-container-highest">
                    <span className="material-symbols-outlined mb-2 text-3xl text-cyan-400">code</span>
                    <span className="font-code-snippet text-sm font-semibold">TypeScript</span>
                  </div>
                  <div className="flex flex-col items-center justify-center rounded-lg border border-white/5 bg-surface-container-high p-4 transition-colors hover:bg-surface-container-highest">
                    <span className="material-symbols-outlined mb-2 text-3xl text-cyan-400">widgets</span>
                    <span className="font-code-snippet text-sm font-semibold">React</span>
                  </div>
                  <div className="flex flex-col items-center justify-center rounded-lg border border-white/5 bg-surface-container-high p-4 transition-colors hover:bg-surface-container-highest">
                    <span className="material-symbols-outlined mb-2 text-3xl text-cyan-400">palette</span>
                    <span className="font-code-snippet text-sm font-semibold">Tailwind</span>
                  </div>
                  <div className="flex flex-col items-center justify-center rounded-lg border border-white/5 bg-surface-container-high p-4 transition-colors hover:bg-surface-container-highest">
                    <span className="material-symbols-outlined mb-2 text-3xl text-cyan-400">api</span>
                    <span className="font-code-snippet text-sm font-semibold">Next.js</span>
                  </div>
                  <div className="flex flex-col items-center justify-center rounded-lg border border-white/5 bg-surface-container-high p-4 transition-colors hover:bg-surface-container-highest">
                    <span className="material-symbols-outlined mb-2 text-3xl text-cyan-400">web</span>
                    <span className="font-code-snippet text-sm font-semibold">HTML/CSS</span>
                  </div>
                  <div className="flex flex-col items-center justify-center rounded-lg border border-white/5 bg-surface-container-high p-4 transition-colors hover:bg-surface-container-highest">
                    <span className="material-symbols-outlined mb-2 text-3xl text-cyan-400">javascript</span>
                    <span className="font-code-snippet text-sm font-semibold">JavaScript</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface-container-low py-section-padding">
          <div className="container-max mx-auto px-gutter">
            <div className="glass-card relative mx-auto max-w-3xl overflow-hidden rounded-xl p-stack-lg">
              <div className="absolute right-0 top-0 p-8 opacity-10">
                <span className="material-symbols-outlined text-9xl text-primary-container" data-icon="school">
                  school
                </span>
              </div>

              <h2 className="mb-6 font-h2 text-on-background">{copy.education.title}</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{copy.education.degree}</h3>
                  <p className="text-primary-container">{copy.education.university}</p>
                </div>

                <p className="font-body-md leading-relaxed text-on-surface-variant">{copy.education.description}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-section-padding" id="contact">
          <div className="container-max mx-auto px-gutter text-center">
            <div className="ambient-glow glass-card mx-auto max-w-4xl rounded-2xl border border-white/10 p-12">
              <h2 className="mb-4 font-h1 text-white">
                {copy.contact.titleStart} <span className="text-primary-container">{copy.contact.titleHighlight}</span>{' '}
                {copy.contact.titleEnd}
              </h2>

              <p className="mx-auto mb-8 max-w-2xl font-body-lg text-on-surface-variant">{copy.contact.description}</p>

              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <button
                  className="flex items-center justify-center gap-2 rounded-lg bg-primary-container px-8 py-4 font-bold text-on-primary-fixed transition-transform hover:scale-105"
                  type="button"
                >
                  <span className="material-symbols-outlined" data-icon="mail">
                    mail
                  </span>
                  {copy.contact.primaryButton}
                </button>

                <button
                  className="rounded-lg border border-primary-container px-8 py-4 font-bold text-primary-container transition-colors hover:bg-primary-container/10"
                  type="button"
                >
                  {copy.contact.secondaryButton}
                </button>
              </div>

              <div className="mt-8 flex justify-center gap-8 text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary-container" data-icon="translate">
                    translate
                  </span>
                  <span className="font-code-snippet">{copy.contact.languageLevel}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary-container" data-icon="location_on">
                    location_on
                  </span>
                  <span className="font-code-snippet">{copy.contact.availability}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex w-full items-center justify-between border-t border-cyan-900/30 bg-slate-950 px-6 py-8">
        <div className="font-mono text-[10px] uppercase text-cyan-500 opacity-60">© 2024 DEPLOYED_SUCCESSFULLY</div>

        <div className="flex gap-6">
          <a className="font-mono text-[10px] uppercase text-slate-600 opacity-60 transition-colors hover:text-cyan-400" href="#">
            {copy.footer.status}
          </a>
          <a className="font-mono text-[10px] uppercase text-slate-600 opacity-60 transition-colors hover:text-cyan-400" href="#">
            {copy.footer.documentation}
          </a>
          <a className="font-mono text-[10px] uppercase text-slate-600 opacity-60 transition-colors hover:text-cyan-400" href="#">
            {copy.footer.privacy}
          </a>
        </div>
      </footer>
    </div>
  )
}

export default App
