import { useEffect, useState } from 'react'
import './App.css'
import profilePhoto from './assets/profile-photo.png'

const heroTextureUrl =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBN5x0omsxTH1DGIyaHqqMRoZ_JBzlueM1To7EguutK_rkE0GOaCdRl9fBblP87SV4pZgcgjsHCSju_ClTBnfrVxE8FDFhMNXGIYuFFwvi7bx-HmzitMsCiGkFqzNkwzl0T5_JkOzJQihn-YiRPUeBoZam1rLR3_9DnvOuOne5-h2cCtNBdKcflNap5pDqzxDTbR07eBDr3JQ-sK_pJx7kovi7bGq_Lw1ArE2xWF1gcgb1B5-oI6OXuH3fpu28b7VCQGVlB3DifVu8'

const LANGUAGE_STORAGE_KEY = 'portfolio-language'

const translations = {
  en: {
    nav: {
      stack: 'Arsenal',
      projects: 'Projects',
      experience: 'Experience',
      contact: 'Contact',
      resume: 'Resume.pdf',
    },
    language: {
      english: 'English',
      portuguese: 'Portugues',
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
      primaryRole: 'Systems Analyst',
      primaryDate: 'FEB 2026 - PRESENT',
      primaryDescription:
        'Leading technical architecture for high-scale distributed systems. Responsibility for system integrity, cloud migration strategies, and cross-team architectural alignment on AWS.',
      uptimeLabel: 'UPTIME ARCHITECTURE',
      latencyLabel: 'LATENCY REDUCTION',
      secondaryRole: 'Software Developer',
      secondaryDate: 'MAY 2025 - FEB 2026',
      secondaryDescription:
        'Developed core features for enterprise data pipelines using NestJS and .NET. Contributed to microservices scalability and performance monitoring improvements.',
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
      stack: 'Arsenal',
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
      title: 'Trajetoria Profissional',
      primaryRole: 'Analista de Sistemas',
      primaryDate: 'FEV 2026 - ATUAL',
      primaryDescription:
        'Liderando a arquitetura tecnica de sistemas distribuidos em larga escala. Responsavel pela integridade do sistema, estrategias de migracao para nuvem e alinhamento arquitetural entre equipes na AWS.',
      uptimeLabel: 'ARQUITETURA DE UPTIME',
      latencyLabel: 'REDUCAO DE LATENCIA',
      secondaryRole: 'Desenvolvedor de Software',
      secondaryDate: 'MAI 2025 - FEV 2026',
      secondaryDescription:
        'Desenvolvimento de funcionalidades centrais para pipelines de dados corporativos com NestJS e .NET. Contribuicao para escalabilidade de microservicos e melhoria de monitoramento de performance.',
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
  const copy = translations[language]

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en'
  }, [language])

  const getLanguageButtonClass = (targetLanguage) => {
    const baseClass =
      'flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-slate-800 text-sm transition-all'

    if (language === targetLanguage) {
      return `${baseClass} border border-white/20 opacity-100 ring-2 ring-primary-container/50`
    }

    return `${baseClass} border border-white/10 opacity-50 hover:opacity-100`
  }

  return (
    <div className="bg-background text-on-background font-body-md selection:bg-primary-container selection:text-on-primary-fixed">
      <nav className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-cyan-500/20 bg-slate-900/60 px-6 py-4 shadow-[0_4px_20px_rgba(0,229,255,0.05)] backdrop-blur-xl">
        <div className="font-inter text-xl font-black uppercase tracking-tighter text-cyan-400">ENGINEER.OS</div>

        <div className="hidden items-center gap-8 font-inter tracking-tight md:flex">
          <a className="text-slate-400 transition-colors hover:text-slate-100" href="#stack">
            {copy.nav.stack}
          </a>
          <a className="border-b-2 border-cyan-400 pb-1 font-semibold text-cyan-400" href="#projects">
            {copy.nav.projects}
          </a>
          <a className="text-slate-400 transition-colors hover:text-slate-100" href="#experience">
            {copy.nav.experience}
          </a>
          <a className="text-slate-400 transition-colors hover:text-slate-100" href="#contact">
            {copy.nav.contact}
          </a>
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

      <main>
        <section className="relative flex min-h-screen items-center overflow-hidden pt-16">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,229,255,0.1),transparent_70%)]" />
            <div
              className="hero-mesh-layer absolute h-full w-full"
              style={{
                backgroundImage: `url('${heroTextureUrl}')`,
              }}
            />
            <div aria-hidden="true" className="hero-wave-field">
              <svg className="hero-wave-svg" preserveAspectRatio="none" shapeRendering="auto" viewBox="0 24 150 28">
                <defs>
                  <path
                    d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18v44h-352z"
                    id="hero-gentle-wave"
                  />
                </defs>
                <g className="hero-wave-parallax">
                  <use className="hero-wave-layer hero-wave-layer-1" x="48" xlinkHref="#hero-gentle-wave" y="0" />
                  <use className="hero-wave-layer hero-wave-layer-2" x="48" xlinkHref="#hero-gentle-wave" y="3" />
                  <use className="hero-wave-layer hero-wave-layer-3" x="48" xlinkHref="#hero-gentle-wave" y="5" />
                </g>
              </svg>
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
              <h2 className="font-h2 text-on-background">{copy.experience.title}</h2>
              <div className="mt-4 h-1 w-24 bg-primary-container" />
            </div>

            <div className="grid gap-stack-md">
              <div className="glass-card overflow-hidden rounded-xl">
                <div className="terminal-header flex items-center gap-2 px-4 py-3">
                  <div className="h-3 w-3 rounded-full border border-red-600 bg-red-500" />
                  <div className="h-3 w-3 rounded-full border border-yellow-600 bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full border border-green-600 bg-green-500" />
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
                        <p className="font-medium text-primary-container">Second Mind</p>
                      </div>
                      <span className="rounded bg-primary-container/5 px-3 py-1 font-code-snippet text-primary-container">
                        {copy.experience.primaryDate}
                      </span>
                    </div>

                    <p className="mb-6 max-w-3xl font-body-md text-on-surface-variant">{copy.experience.primaryDescription}</p>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="border-l-2 border-primary-container bg-surface-container p-4">
                        <div className="mb-1 text-3xl font-bold text-white">99.99%</div>
                        <div className="font-label-caps text-sm text-slate-400">{copy.experience.uptimeLabel}</div>
                      </div>

                      <div className="border-l-2 border-primary-container bg-surface-container p-4">
                        <div className="mb-1 text-3xl font-bold text-white">50%</div>
                        <div className="font-label-caps text-sm text-slate-400">{copy.experience.latencyLabel}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card overflow-hidden rounded-xl opacity-80 transition-opacity hover:opacity-100">
                <div className="terminal-header flex items-center gap-2 px-4 py-3">
                  <div className="h-3 w-3 rounded-full border border-red-600 bg-red-500" />
                  <div className="h-3 w-3 rounded-full border border-yellow-600 bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full border border-green-600 bg-green-500" />
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
                        <p className="font-medium text-slate-400">Second Mind</p>
                      </div>
                      <span className="font-code-snippet text-slate-400">{copy.experience.secondaryDate}</span>
                    </div>

                    <p className="max-w-3xl font-body-md text-on-surface-variant">{copy.experience.secondaryDescription}</p>
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
