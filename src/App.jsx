import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { motion } from 'motion/react'
import './App.css'
import profilePhoto from './assets/profile-photo.png'

const LANGUAGE_STORAGE_KEY = 'portfolio-language'
const CONTACT_EMAIL = 'joaovictordev0720@gmail.com'
const WHATSAPP_URL = 'https://w.app/nwcv1h'
const NAV_SECTION_IDS = ['top', 'value', 'projects', 'expertise', /* 'experience', */ 'stack', 'about', 'contact']
const NAV_SCROLL_IDLE_MS = 140
const SUMMARY_TERRAIN_COLOR = '#071827'
const SUMMARY_TERRAIN_WIDTH = 110
const SUMMARY_TERRAIN_HEIGHT = 80
const SUMMARY_TERRAIN_COLUMNS = 92
const SUMMARY_TERRAIN_ROWS = 66
const SUMMARY_TERRAIN_DOT_COUNT = 170
const SUMMARY_TERRAIN_IMPACT_DURATION = 1.35
const SUMMARY_TERRAIN_POINTER_SAMPLE_SECONDS = 0.068
const SUMMARY_TERRAIN_POINTER_IMPACT_LIMIT = 18

const translations = {
  en: {
    nav: {
      summary: 'Summary',
      value: 'Why Choose Me',
      projects: 'Projects',
      experience: 'Professional Trajectory',
      stack: 'Arsenal',
      expertise: 'Expertise',
      about: 'About',
      contact: 'Contact',
      resume: 'Resume',
    },
    language: {
      english: 'English',
      portuguese: 'Portuguese',
    },
    value: {
      title: 'Partnering for Success',
      description: 'Beyond code: bringing business vision, reliability, and true ownership to your project.',
      businessTitle: 'Business-Driven Mindset',
      businessDesc: 'I do not just write code; I build solutions that solve real business problems. Every technical decision is made with your ROI, scalability, and market goals in mind.',
      communicationTitle: 'Clear Communication',
      communicationDesc: 'No confusing technical jargon. I believe in transparent updates, aligning expectations early, and working as a true partner to ensure you are always in the loop.',
      ownershipTitle: 'Unwavering Ownership',
      ownershipDesc: 'I treat your product as if it were my own. From proactive problem-solving to predictable and reliable deliveries, you can count on my full commitment to your success.',
    },
    expertise: {
      title: 'Scalability & Security',
      description: 'Architecting robust systems built for extreme throughput and uncompromising security.',
      scalableTitle: 'Scalable Architecture',
      scalableDesc: 'Designing distributed systems, microservices, and asynchronous communication patterns capable of horizontal scaling and handling high traffic loads effortlessly.',
      securityTitle: 'Enterprise Security',
      securityDesc: 'Implementing robust authentication, authorization, data encryption, and defensive programming practices to protect sensitive data and ensure compliance.',
      availabilityTitle: 'High Availability & Cloud',
      availabilityDesc: 'Leveraging cloud-native infrastructure, containerization, and automated deployments to guarantee maximum uptime and fault tolerance.',
      performanceTitle: 'Performance Optimization',
      performanceDesc: 'Profiling bottlenecks, optimizing complex queries, and implementing advanced caching strategies (Redis) to ensure sub-millisecond latency.',
      cicdTitle: 'CI/CD & Automation',
      cicdDesc: 'Building robust delivery pipelines with automated testing and zero-downtime deployments for fast and reliable release cycles.',
      apiTitle: 'API Design & Integration',
      apiDesc: 'Designing robust, versioned RESTful APIs with clean contracts, rate limiting, and seamless third-party enterprise integrations.',
    },
    about: {
      title: 'About Me',
      description: 'My trajectory and capabilities as a software engineer.',
      cardTitle: 'João Victor',
      cardSubtitle: 'Fullstack Developer & System Architect',
      cardText: 'I am a passionate software engineer with a strong focus on building scalable, high-performance distributed systems. With expertise spanning robust backend infrastructures using .NET, Node.js, and Python, to crafting elegant frontend experiences with React and Tailwind CSS, I bring a comprehensive approach to software development. My trajectory includes working on mission-critical applications, optimizing database queries, and deploying cloud-native solutions on AWS, always aiming for extreme throughput and enterprise-grade reliability.',
      tags: ['System Architecture', 'Fullstack Development', 'Cloud Computing'],
    },
    hero: {
      badge: 'SYSTEM ARCHITECT',
      titleStart: 'Building High-Performance',
      titleHighlight: 'Distributed Systems',
      description:
        'Seasoned systems architect specialized in crafting robust backend infrastructures and high-performance APIs. I architect scalable cloud solutions across the .NET, React, and AWS ecosystems, focusing on mission-critical stability and extreme throughput for enterprise platforms.',
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
        'I develop and maintain backend APIs and services for web and mobile products using C# (.NET), Node.js, Python, PostgreSQL, AWS, and Railway, focusing on scalable architecture, integrations, query optimization, and production stability.',
      uptimeLabel: 'UPTIME ARCHITECTURE',
      latencyLabel: 'LATENCY REDUCTION',
      microservicesLabel: 'MICROSERVICES',
      secondaryRole: 'Software Developer',
      secondaryDate: 'MAY 2025 - FEB 2026',
      secondaryCompany: 'Second Mind',
      secondaryDescription:
        'Built and maintained backend services, REST APIs, external integrations, and PostgreSQL data models while improving application performance and supporting cloud deployment routines.',
      secondaryTagOne: 'High-Volume Data Pipelines',
      secondaryTagTwo: 'Observability Implementation',
      tertiaryRole: 'Web Developer / Freelancer',
      tertiaryDate: 'MAR 2024 - PRESENT',
      tertiaryCompany: 'Independent',
      tertiaryDescription: 'Designing and developing high-quality, responsive websites and web applications tailored to clients needs, focusing on modern aesthetics, performance, and user experience.',
    },
    projects: {
      title: 'Projects',
      cardSubtitle: 'Global Impact & Technical Excellence',
      description: 'Throughout my career, I have worked on a wide variety of projects for both national and international clients. My experience spans the entire development lifecycle, crafting everything from high-conversion interfaces to resilient distributed systems. Every delivered solution reflects my focus on technical quality, scalability, and real business impact.',
      github: 'GITHUB',
      demo: 'Visit Site',
      firstAlt: 'Recipe App Launch Page',
      firstTitle: 'Culinary Artisan',
      firstDescription:
        'A beautiful, responsive landing page for the CulinaryArtisan app featuring elegant styling and modern UI components.',
      secondAlt: 'Hours Tracker Interface',
      secondTitle: 'Hours Tracker',
      secondDescription: 'A modern landing page and web application interface for tracking work hours, built with high performance and usability in mind.',
      thirdAlt: 'Pulse Fit Gym Landing Page',
      thirdTitle: 'Pulse Fit',
      thirdDescription: 'A bold, premium gym landing page with neon CTAs, training programs, testimonials, progress bars, and a limited-time offer.',
      fourthAlt: 'Restaurant Landing Page',
      fourthTitle: 'Gourmet Bistro',
      fourthDescription: 'An elegant, mouth-watering landing page for a premium restaurant. Showcases the menu, ambiance, and online reservations.',
      fifthAlt: 'Duo Fin Landing Page',
      fifthTitle: 'Duo Fin',
      fifthDescription: 'A complete financial management solution for couples, featuring shared tracking, budget synchronization, and high-performance cross-platform capabilities.',
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
      eyebrow: "LET'S TALK",
      headline: 'Let’s turn your idea into a fast, reliable web product.',
      description: 'Send the project goal and I will reply with the next steps.',
      primaryButton: 'Email',
      whatsappButton: 'Message on WhatsApp',
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
      value: 'Diferenciais',
      projects: 'Projetos',
      experience: 'Trajetória Profissional',
      stack: 'Arsenal',
      expertise: 'Especialidades',
      about: 'Sobre',
      contact: 'Contato',
      resume: 'Curriculo',
    },
    language: {
      english: 'Ingles',
      portuguese: 'Portugues',
    },
    value: {
      title: 'Parceria para o Sucesso',
      description: 'Muito além do código: visão de negócios, comunicação clara e total comprometimento com o seu projeto.',
      businessTitle: 'Foco em Resultados',
      businessDesc: 'Não escrevo apenas código; construo soluções que resolvem problemas reais de negócio. Cada decisão técnica é pensada no seu ROI e nos objetivos de mercado.',
      communicationTitle: 'Comunicação Transparente',
      communicationDesc: 'Sem jargões técnicos confusos. Acredito em atualizações constantes, alinhamento de expectativas e em atuar como um verdadeiro parceiro estratégico.',
      ownershipTitle: 'Total Comprometimento',
      ownershipDesc: 'Trato o seu produto como se fosse meu. Da resolução proativa de problemas às entregas previsíveis, você pode contar com minha total dedicação ao seu sucesso.',
    },
    expertise: {
      title: 'Escalabilidade & Segurança',
      description: 'Arquitetando sistemas robustos preparados para extrema vazão e segurança sem concessões.',
      scalableTitle: 'Arquitetura Escalável',
      scalableDesc: 'Design de sistemas distribuídos, microsserviços e padrões de comunicação assíncrona capazes de escalar horizontalmente e suportar grandes volumes de tráfego.',
      securityTitle: 'Segurança Corporativa',
      securityDesc: 'Implementação de autenticação robusta, autorização, criptografia de dados e práticas de programação defensiva para proteger dados sensíveis e garantir conformidade.',
      availabilityTitle: 'Alta Disponibilidade e Cloud',
      availabilityDesc: 'Utilização de infraestrutura nativa em nuvem, conteinerização e deploys automatizados para garantir o máximo de uptime e tolerância a falhas.',
      performanceTitle: 'Otimização de Performance',
      performanceDesc: 'Mapeamento de gargalos, otimização de consultas complexas e implementação de estratégias avançadas de cache (Redis) para garantir latência sub-milissegundo.',
      cicdTitle: 'CI/CD & Automação',
      cicdDesc: 'Construção de pipelines de entrega robustos com testes automatizados e deploys sem downtime para ciclos de lançamento rápidos e confiáveis.',
      apiTitle: 'Design de APIs & Integrações',
      apiDesc: 'Desenvolvimento de APIs RESTful robustas e versionadas, com contratos claros, rate limiting e integrações perfeitas com sistemas corporativos de terceiros.',
    },
    about: {
      title: 'Sobre Mim',
      description: 'Minha trajetória e capacidades como engenheiro de software.',
      cardTitle: 'João Victor',
      cardSubtitle: 'Desenvolvedor Fullstack & Arquiteto de Sistemas',
      cardText: 'Sou um engenheiro de software apaixonado, com forte foco na construção de sistemas distribuídos escaláveis e de alta performance. Com expertise que abrange desde infraestruturas robustas de backend usando .NET, Node.js e Python, até a criação de experiências frontend elegantes com React e Tailwind CSS, trago uma abordagem abrangente para o desenvolvimento de software. Minha trajetória inclui o trabalho em aplicações de missão crítica, otimização de consultas a bancos de dados e implantação de soluções nativas em nuvem na AWS, sempre visando alta vazão e confiabilidade de nível corporativo.',
      tags: ['Arquitetura de Sistemas', 'Desenvolvimento Fullstack', 'Cloud Computing'],
    },
    hero: {
      badge: 'ARQUITETO DE SISTEMAS',
      titleStart: 'Construindo',
      titleHighlight: 'Sistemas Distribuidos de Alta Performance',
      description:
        'Arquiteto de sistemas com experiencia na construcao de infraestruturas de backend robustas e APIs de alta performance. Projeto solucoes em nuvem escalaveis nos ecossistemas .NET, React e AWS, com foco em estabilidade critica e alta vazao para plataformas corporativas.',
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
        'Atuo no desenvolvimento e manutenção de APIs e serviços back-end para produtos web e mobile com C# (.NET), Node.js, Python, PostgreSQL, AWS e Railway, com foco em arquitetura escalável, integrações, otimização de consultas e estabilidade em produção.',
      uptimeLabel: 'ARQUITETURA DE UPTIME',
      latencyLabel: 'REDUCAO DE LATENCIA',
      microservicesLabel: 'MICROSSERVIÇOS',
      secondaryRole: 'Desenvolvedor de Software',
      secondaryDate: 'MAI 2025 - FEV 2026',
      secondaryCompany: 'Second Mind',
      secondaryDescription:
        'Atuei na construção e manutenção de serviços back-end, APIs REST, integrações externas e modelos de dados em PostgreSQL, apoiando melhorias de performance e rotinas de deploy em cloud.',
      secondaryTagOne: 'Pipelines de Dados de Alto Volume',
      secondaryTagTwo: 'Implementacao de Observabilidade',
      tertiaryRole: 'Desenvolvedor de Sites / Freelancer',
      tertiaryDate: 'MAR 2024 - ATUAL',
      tertiaryCompany: 'Autônomo',
      tertiaryDescription: 'Desenvolvimento e design de sites e aplicações web responsivas sob demanda para clientes, focando em estética moderna, alta performance e experiência do usuário.',
    },
    projects: {
      title: 'Projetos',
      cardSubtitle: 'Impacto Global & Excelência Técnica',
      description: 'Ao longo da minha trajetória, atuei em uma ampla variedade de projetos para clientes nacionais e internacionais. Minha experiência abrange o ciclo de vida completo do desenvolvimento, criando desde interfaces de alta conversão até sistemas distribuídos resilientes. Cada solução entregue reflete meu foco em qualidade técnica, escalabilidade e impacto nos negócios.',
      github: 'GITHUB',
      demo: 'Visitar site',
      firstAlt: 'Recipe App Launch Page',
      firstTitle: 'Culinary Artisan',
      firstDescription:
        'Uma landing page responsiva e elegante para o aplicativo CulinaryArtisan, criada com Tailwind CSS e design moderno.',
      secondAlt: 'Interface do Hours Tracker',
      secondTitle: 'Hours Tracker',
      secondDescription: 'Uma landing page e interface web moderna para rastreamento de horas de trabalho, construída com foco em alta performance e usabilidade.',
      thirdAlt: 'Landing Page Pulse Fit',
      thirdTitle: 'Pulse Fit',
      thirdDescription: 'Uma landing page premium para academia, com visual escuro, CTAs neon, programas de treino, depoimentos, barras de progresso e promocao.',
      fourthAlt: 'Landing Page de Restaurante',
      fourthTitle: 'Gourmet Bistro',
      fourthDescription: 'Uma landing page elegante para um restaurante premium. Destaca o cardápio, o ambiente e um formulário de reservas online.',
      fifthAlt: 'Landing Page Duo Fin',
      fifthTitle: 'Duo Fin',
      fifthDescription: 'Uma plataforma completa de gestão financeira para casais, com sincronização de gastos, planejamento conjunto e alta performance multiplataforma.',
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
      eyebrow: 'VAMOS CONVERSAR',
      headline: 'Vamos tirar sua ideia do papel com clareza e performance.',
      description: 'Me envie o objetivo do projeto e eu retorno com os proximos passos.',
      primaryButton: 'Email',
      whatsappButton: 'Falar no WhatsApp',
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

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

const createSummaryDotTexture = () => {
  const canvas = document.createElement('canvas')
  canvas.height = 64
  canvas.width = 64

  const context = canvas.getContext('2d')
  const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32)
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
  gradient.addColorStop(0.18, 'rgba(186, 244, 255, 0.95)')
  gradient.addColorStop(0.44, 'rgba(0, 229, 255, 0.38)')
  gradient.addColorStop(0.72, 'rgba(139, 92, 246, 0.12)')
  gradient.addColorStop(1, 'rgba(0, 229, 255, 0)')

  context.fillStyle = gradient
  context.fillRect(0, 0, 64, 64)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

const createSeededRandom = () => {
  let seed = 24

  return () => {
    const nextValue = Math.sin(seed) * 10000
    seed += 1
    return nextValue - Math.floor(nextValue)
  }
}

const getSummaryTerrainHeight = (x, y, time) => {
  const centerEnvelope = 0.38 + Math.max(0, 1 - Math.abs(y) / (SUMMARY_TERRAIN_HEIGHT * 0.5)) * 0.62
  const travelingWave = Math.sin(x * 0.18 + time * 0.58) * 1.12
  const diagonalWave = Math.sin((x + y * 1.18) * 0.09 - time * 0.38) * 0.86
  const longWave = Math.cos(y * 0.15 - time * 0.28 + x * 0.035) * 1.06
  const centralRise = Math.exp(-(((x / 32) ** 2) + (((y - 2) / 24) ** 2))) * 2.08
  const farRidge = Math.exp(-(((y - 23) / 19) ** 2)) * Math.sin(x * 0.12 + time * 0.22) * 1.04

  return (travelingWave + diagonalWave + longWave) * centerEnvelope + centralRise + farRidge
}

const getSummaryPointerImpulseHeight = (x, y, time, impacts) => {
  let impulseHeight = 0

  for (const impact of impacts) {
    const age = time - impact.startedAt
    if (age < 0 || age > SUMMARY_TERRAIN_IMPACT_DURATION) {
      continue
    }

    const dx = x - impact.x
    const dy = y - impact.y
    const distanceSquared = dx * dx + dy * dy
    const ringPosition = age * 16
    const influenceRadius = ringPosition + 18

    if (distanceSquared > influenceRadius * influenceRadius) {
      continue
    }

    const distance = Math.sqrt(distanceSquared)
    const ringFalloff = Math.exp(-Math.abs(distance - ringPosition) * 0.14)
    const energy = (1 - age / SUMMARY_TERRAIN_IMPACT_DURATION) ** 2.2
    const ripple = Math.sin(distance * 0.62 - age * 8.4) * 0.72
    const lift = Math.exp(-distanceSquared / 260) * Math.sin(age * 6.8) * 0.42

    let intensity = impact.isHover ? 0.35 : 1.0
    const edgeMultiplier = 1 + (Math.abs(impact.x) / 55) * 1.2 + (Math.abs(impact.y) / 40) * 0.6
    intensity *= edgeMultiplier

    impulseHeight += (ripple * ringFalloff + lift) * energy * intensity
  }

  return impulseHeight
}

const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') {
      return false
    }

    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches)

    updatePreference()
    mediaQuery.addEventListener('change', updatePreference)

    return () => mediaQuery.removeEventListener('change', updatePreference)
  }, [])

  return prefersReducedMotion
}

function SummaryWaveBackground({ pointerImpact }) {
  const canvasRef = useRef(null)
  const pointerImpactsRef = useRef([])
  const lastPointerImpactAtRef = useRef(0)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (!pointerImpact || prefersReducedMotion) {
      return
    }

    const now = performance.now() * 0.001
    if ((pointerImpact.isActive || pointerImpact.isHover) && now - lastPointerImpactAtRef.current < SUMMARY_TERRAIN_POINTER_SAMPLE_SECONDS) {
      return
    }

    lastPointerImpactAtRef.current = now
    pointerImpactsRef.current = [
      ...pointerImpactsRef.current.slice(-(SUMMARY_TERRAIN_POINTER_IMPACT_LIMIT - 1)),
      {
        startedAt: now,
        x: pointerImpact.terrainX,
        y: pointerImpact.terrainY,
        isHover: pointerImpact.isHover,
      },
    ]
  }, [pointerImpact, prefersReducedMotion])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return undefined
    }

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
        canvas,
        powerPreference: 'high-performance',
      })
    } catch {
      canvas.classList.add('summary-terrain-canvas--fallback')
      return undefined
    }

    const backgroundColor = new THREE.Color(SUMMARY_TERRAIN_COLOR)
    const scene = new THREE.Scene()
    scene.background = backgroundColor
    scene.fog = new THREE.Fog(SUMMARY_TERRAIN_COLOR, 22, 92)

    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.setClearColor(backgroundColor, 1)

    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 160)
    const terrainGroup = new THREE.Group()
    terrainGroup.position.set(0, -5.2, -9)
    terrainGroup.rotation.x = -Math.PI / 2
    terrainGroup.scale.set(1.18, 1.18, 1.18)
    scene.add(terrainGroup)

    const terrainGeometry = new THREE.PlaneGeometry(
      SUMMARY_TERRAIN_WIDTH,
      SUMMARY_TERRAIN_HEIGHT,
      SUMMARY_TERRAIN_COLUMNS,
      SUMMARY_TERRAIN_ROWS,
    )
    const positionAttribute = terrainGeometry.attributes.position
    const basePositions = positionAttribute.array.slice()
    const terrainHeights = new Float32Array(positionAttribute.count)
    const terrainColors = new Float32Array(positionAttribute.count * 3)
    const cyanColor = new THREE.Color('#00e5ff')
    const nearBlueColor = new THREE.Color('#bff7ff')
    const blueColor = new THREE.Color('#38bdf8')
    const purpleColor = new THREE.Color('#8b5cf6')
    const edgeColor = new THREE.Color('#073140')
    const colorMixer = new THREE.Color()

    for (let index = 0; index < positionAttribute.count; index += 1) {
      const x = basePositions[index * 3]
      const y = basePositions[index * 3 + 1]
      const centerGlow = clamp(1 - Math.abs(x) / (SUMMARY_TERRAIN_WIDTH * 0.5), 0, 1)
      const nearGlow = clamp(1 - (y + SUMMARY_TERRAIN_HEIGHT * 0.5) / SUMMARY_TERRAIN_HEIGHT, 0, 1)
      const colorIntensity = clamp(centerGlow ** 1.4 * 0.58 + nearGlow ** 1.12 * 0.52, 0, 1)
      const fogFade = clamp((1 - nearGlow) * 0.34 + (1 - centerGlow) * 0.24, 0, 0.48)

      colorMixer
        .copy(edgeColor)
        .lerp(blueColor, (1 - centerGlow) * 0.14)
        .lerp(cyanColor, colorIntensity)
        .lerp(nearBlueColor, centerGlow * nearGlow * 0.22)
        .lerp(purpleColor, (1 - nearGlow) * 0.05 + (1 - centerGlow) * 0.035)
      colorMixer.lerp(backgroundColor, fogFade)
      terrainColors[index * 3] = colorMixer.r
      terrainColors[index * 3 + 1] = colorMixer.g
      terrainColors[index * 3 + 2] = colorMixer.b
    }

    terrainGeometry.setAttribute('color', new THREE.BufferAttribute(terrainColors, 3))

    const terrainMaterial = new THREE.MeshBasicMaterial({
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: true,
      opacity: 0.58,
      transparent: true,
      vertexColors: true,
      wireframe: true,
    })
    const terrainMesh = new THREE.Mesh(terrainGeometry, terrainMaterial)
    terrainGroup.add(terrainMesh)

    const dotTexture = createSummaryDotTexture()
    const dotGeometry = new THREE.BufferGeometry()
    const dotPositions = new Float32Array(SUMMARY_TERRAIN_DOT_COUNT * 3)
    const dotColors = new Float32Array(SUMMARY_TERRAIN_DOT_COUNT * 3)
    const dotVertexIndices = []
    const random = createSeededRandom()

    for (let index = 0; index < SUMMARY_TERRAIN_DOT_COUNT; index += 1) {
      const vertexIndex = Math.floor(random() * positionAttribute.count)
      const colorOffset = index * 3
      const glowColor = colorMixer
        .copy(cyanColor)
        .lerp(nearBlueColor, 0.28 + random() * 0.46)
        .lerp(purpleColor, random() * 0.1)
        .lerp(new THREE.Color('#ffffff'), random() * 0.16)

      dotVertexIndices.push(vertexIndex)
      dotColors[colorOffset] = glowColor.r
      dotColors[colorOffset + 1] = glowColor.g
      dotColors[colorOffset + 2] = glowColor.b
    }

    dotGeometry.setAttribute('position', new THREE.BufferAttribute(dotPositions, 3))
    dotGeometry.setAttribute('color', new THREE.BufferAttribute(dotColors, 3))

    const dotMaterial = new THREE.PointsMaterial({
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      map: dotTexture,
      opacity: 0.86,
      size: 0.38,
      sizeAttenuation: true,
      transparent: true,
      vertexColors: true,
    })
    const dotMesh = new THREE.Points(dotGeometry, dotMaterial)
    terrainGroup.add(dotMesh)

    let animationFrameId = null
    let cameraBaseY = 13.2
    let cameraBaseZ = 43
    let lastRenderTime = prefersReducedMotion ? 9.4 : 0

    const updateTerrain = (time) => {
      const positionArray = positionAttribute.array
      const dotPositionArray = dotGeometry.attributes.position.array
      const activeImpacts = pointerImpactsRef.current.filter(
        (impact) => time - impact.startedAt <= SUMMARY_TERRAIN_IMPACT_DURATION,
      )
      pointerImpactsRef.current = activeImpacts

      for (let index = 0; index < positionAttribute.count; index += 1) {
        const offset = index * 3
        const x = basePositions[offset]
        const y = basePositions[offset + 1]
        const height = getSummaryTerrainHeight(x, y, time) + getSummaryPointerImpulseHeight(x, y, time, activeImpacts)

        terrainHeights[index] = height
        positionArray[offset + 2] = height
      }

      for (let index = 0; index < SUMMARY_TERRAIN_DOT_COUNT; index += 1) {
        const vertexIndex = dotVertexIndices[index]
        const vertexOffset = vertexIndex * 3
        const dotOffset = index * 3
        const pulse = prefersReducedMotion ? 0 : Math.sin(time * 1.8 + index * 0.37) * 0.05

        dotPositionArray[dotOffset] = basePositions[vertexOffset]
        dotPositionArray[dotOffset + 1] = basePositions[vertexOffset + 1]
        dotPositionArray[dotOffset + 2] = terrainHeights[vertexIndex] + 0.14 + pulse
      }

      positionAttribute.needsUpdate = true
      dotGeometry.attributes.position.needsUpdate = true
    }

    const renderFrame = (time) => {
      lastRenderTime = time
      updateTerrain(time)
      renderer.render(scene, camera)
    }

    const resizeRenderer = () => {
      const width = Math.max(1, canvas.clientWidth || canvas.parentElement?.clientWidth || 1)
      const height = Math.max(1, canvas.clientHeight || canvas.parentElement?.clientHeight || 1)
      const isCompact = width < 760

      cameraBaseY = isCompact ? 14.8 : 13.2
      cameraBaseZ = isCompact ? 52 : 43
      camera.fov = isCompact ? 54 : 48
      camera.aspect = width / height
      camera.position.set(0, cameraBaseY, cameraBaseZ)
      camera.lookAt(0, -3.6, -16)
      camera.updateProjectionMatrix()

      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75))
      renderer.setSize(width, height, false)
      renderFrame(lastRenderTime)
    }

    const animate = () => {
      const time = performance.now() * 0.001

      camera.position.x = Math.sin(time * 0.16) * 1.15
      camera.position.y = cameraBaseY + Math.cos(time * 0.19) * 0.54
      camera.position.z = cameraBaseZ + Math.sin(time * 0.11) * 0.72
      camera.lookAt(Math.sin(time * 0.12) * 1.4, -3.5 + Math.cos(time * 0.14) * 0.28, -16)
      renderFrame(time)
      animationFrameId = window.requestAnimationFrame(animate)
    }

    const resizeObserver = new ResizeObserver(resizeRenderer)
    resizeObserver.observe(canvas)
    resizeRenderer()

    if (prefersReducedMotion) {
      renderFrame(lastRenderTime)
    } else {
      animate()
    }

    return () => {
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId)
      }

      resizeObserver.disconnect()
      terrainGeometry.dispose()
      terrainMaterial.dispose()
      dotGeometry.dispose()
      dotMaterial.dispose()
      dotTexture.dispose()
      renderer.dispose()
    }
  }, [prefersReducedMotion])

  return (
    <div aria-hidden="true" className="summary-wave-background">
      <canvas className="summary-terrain-canvas" ref={canvasRef} />
      <div className="summary-wave-glow" />
      <div className="summary-terrain-horizon" />
      {pointerImpact?.isActive ? (
        <div
          className="summary-terrain-pointer-glow"
          style={{
            '--summary-pointer-x': `${pointerImpact.screenX}px`,
            '--summary-pointer-y': `${pointerImpact.screenY}px`,
          }}
        />
      ) : null}
      <div className="summary-terrain-vignette" />
    </div>
  )
}

function App() {
  const [language, setLanguage] = useState(resolveInitialLanguage)
  const [activeSection, setActiveSection] = useState(NAV_SECTION_IDS[0])
  const [selectedProjectUrl, setSelectedProjectUrl] = useState(null)

  const openProject = (url) => {
    setSelectedProjectUrl(url)
  }

  const getRawProjectUrl = (projectUrl) => projectUrl
  const [summaryTerrainPointer, setSummaryTerrainPointer] = useState(null)
  const summaryTerrainPointerIdRef = useRef(null)
  const queuedSummaryTerrainPointerRef = useRef(null)
  const summaryTerrainPointerFrameRef = useRef(null)
  const pendingNavTargetRef = useRef(null)
  const isClickNavigatingRef = useRef(false)
  const clickScrollIdleTimeoutRef = useRef(null)
  const copy = translations[language]
  const navItems = [
    { id: 'top', label: copy.nav.summary },
    { id: 'value', label: copy.nav.value },
    { id: 'projects', label: copy.nav.projects },
    { id: 'expertise', label: copy.nav.expertise },
    /* { id: 'experience', label: copy.nav.experience }, */
    { id: 'stack', label: copy.nav.stack },
    { id: 'about', label: copy.nav.about },
    { id: 'contact', label: copy.nav.contact },
  ]

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en'
  }, [language])

  const getNavOffset = () => 24

  const createSummaryTerrainPointer = (event, isActive, isHover = false) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return null
    }

    const sectionBounds = event.currentTarget.getBoundingClientRect()
    const sectionWidth = Math.max(sectionBounds.width, 1)
    const sectionHeight = Math.max(sectionBounds.height, 1)
    const screenX = event.clientX - sectionBounds.left
    const screenY = event.clientY - sectionBounds.top
    const normalizedX = clamp(screenX / sectionWidth, 0, 1)
    const normalizedY = clamp(screenY / sectionHeight, 0, 1)
    const terrainX = clamp((normalizedX - 0.5) * SUMMARY_TERRAIN_WIDTH * 1.12, -54, 54)
    const terrainY = clamp((0.62 - normalizedY) * SUMMARY_TERRAIN_HEIGHT * 1.36, -39, 39)

    return {
      isActive,
      isHover,
      screenX,
      screenY,
      terrainX,
      terrainY,
    }
  }

  const cancelQueuedSummaryTerrainPointer = () => {
    if (summaryTerrainPointerFrameRef.current !== null) {
      window.cancelAnimationFrame(summaryTerrainPointerFrameRef.current)
      summaryTerrainPointerFrameRef.current = null
    }

    queuedSummaryTerrainPointerRef.current = null
  }

  const queueSummaryTerrainPointer = (pointer) => {
    queuedSummaryTerrainPointerRef.current = pointer

    if (summaryTerrainPointerFrameRef.current !== null) {
      return
    }

    summaryTerrainPointerFrameRef.current = window.requestAnimationFrame(() => {
      summaryTerrainPointerFrameRef.current = null
      setSummaryTerrainPointer(queuedSummaryTerrainPointerRef.current)
      queuedSummaryTerrainPointerRef.current = null
    })
  }

  const handleSummaryTerrainPointerDown = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) {
      return
    }

    const pointer = createSummaryTerrainPointer(event, true)
    if (!pointer) {
      return
    }

    if (event.pointerType === 'mouse') {
      event.preventDefault()
    }

    summaryTerrainPointerIdRef.current = event.pointerId
    cancelQueuedSummaryTerrainPointer()
    event.currentTarget.setPointerCapture?.(event.pointerId)
    setSummaryTerrainPointer(pointer)
  }

  const handleSummaryTerrainPointerMove = (event) => {
    const isCaptured = summaryTerrainPointerIdRef.current === event.pointerId

    if (summaryTerrainPointerIdRef.current !== null && !isCaptured) {
      return
    }

    if (isCaptured && event.pointerType === 'mouse' && event.buttons !== 1) {
      handleSummaryTerrainPointerEnd(event)
      return
    }

    const pointer = createSummaryTerrainPointer(event, isCaptured, !isCaptured)
    if (!pointer) {
      return
    }

    queueSummaryTerrainPointer(pointer)
  }

  const handleSummaryTerrainPointerEnd = (event) => {
    if (summaryTerrainPointerIdRef.current !== event.pointerId) {
      return
    }

    const pointer = createSummaryTerrainPointer(event, false)
    summaryTerrainPointerIdRef.current = null
    cancelQueuedSummaryTerrainPointer()

    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    if (pointer) {
      setSummaryTerrainPointer(pointer)
    }
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
      if (summaryTerrainPointerFrameRef.current !== null) {
        window.cancelAnimationFrame(summaryTerrainPointerFrameRef.current)
        summaryTerrainPointerFrameRef.current = null
      }

      queuedSummaryTerrainPointerRef.current = null
    }
  }, [])

  useEffect(() => {
    if (selectedProjectUrl) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
      document.documentElement.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
      document.documentElement.style.overflow = 'unset'
    }
  }, [selectedProjectUrl])

  const getLanguageButtonClass = (targetLanguage) => {
    const baseClass =
      'flex h-7 min-w-9 items-center justify-center rounded-md bg-[#10182a] px-2 text-[11px] font-bold transition-all'

    if (language === targetLanguage) {
      return `${baseClass} language-button-active border border-white/20 opacity-100 ring-2 ring-primary-container/50`
    }

    return `${baseClass} border border-white/10 opacity-50 hover:opacity-100`
  }

  return (
    <div className="landing-page-shell text-on-background font-body-md selection:bg-primary-container selection:text-on-primary-fixed">
      <nav
        className="nav-surface relative z-20 flex w-full flex-wrap items-center justify-between gap-3 px-4 py-3 shadow-[0_4px_20px_rgba(0,229,255,0.05)] backdrop-blur-xl sm:px-6 sm:py-4"
      >
        <a
          className="nav-brand flex min-w-0 flex-1 items-center gap-3 font-inter lg:flex-none"
          href="#top"
          onClick={(event) => handleNavItemClick(event, 'top')}
        >
          <img
            alt="Logo JV"
            className="nav-logo h-10 w-10 rounded-md border object-cover"
            src="/logo-jv-cyan.svg"
          />
          <span className="truncate text-xs font-black tracking-normal sm:text-base">Desenvolvedor Fullstack</span>
        </a>

        <div className="hidden items-center gap-8 font-inter tracking-normal lg:flex">
          {navItems.map((item) => {
            const isActive = activeSection === item.id

            return (
              <a
                className={`border-b-2 pb-1 transition-colors ${
                  isActive
                    ? 'nav-link-active font-semibold'
                    : 'nav-link-idle border-transparent text-slate-400 hover:text-slate-100'
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

        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <div className="language-switcher flex items-center gap-2 rounded-full border border-white/5 bg-black/20 p-1.5">
            <button
              aria-label={copy.language.portuguese}
              aria-pressed={language === 'pt'}
              className={getLanguageButtonClass('pt')}
              onClick={() => setLanguage('pt')}
              title={copy.language.portuguese}
              type="button"
            >
              PT
            </button>
            <button
              aria-label={copy.language.english}
              aria-pressed={language === 'en'}
              className={getLanguageButtonClass('en')}
              onClick={() => setLanguage('en')}
              title={copy.language.english}
              type="button"
            >
              EN
            </button>
          </div>

          {/* <a
            className="rounded bg-primary-container px-4 py-2 text-sm font-bold text-on-primary-fixed transition-all duration-300 hover:scale-95 hover:opacity-80 sm:px-6 sm:text-base"
            href={RESUME_PATH}
            rel="noreferrer"
            target="_blank"
          >
            {copy.nav.resume}
          </a> */}
        </div>
      </nav>
      <div className="nav-surface mobile-nav-surface px-4 py-2 lg:hidden">
        <div className="mobile-nav-scroll flex gap-2 overflow-x-auto pb-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id

            return (
              <a
                className={`whitespace-nowrap rounded-full border px-3 py-2 text-xs font-semibold transition-colors ${
                  isActive
                    ? 'mobile-nav-active'
                    : 'border-white/10 text-slate-400 hover:border-white/20 hover:text-slate-100'
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
      </div>
      <div aria-hidden="true" className="section-glow-divider" />

      <main>
        <section
          className="summary-hero-section relative flex min-h-screen items-center overflow-hidden"
          id="top"
          onPointerCancel={handleSummaryTerrainPointerEnd}
          onPointerDown={handleSummaryTerrainPointerDown}
          onPointerMove={handleSummaryTerrainPointerMove}
          onPointerUp={handleSummaryTerrainPointerEnd}
        >
          <SummaryWaveBackground pointerImpact={summaryTerrainPointer} />

          <div className="summary-hero-content container-max relative z-10 mx-auto grid items-center gap-stack-lg px-0 sm:px-gutter lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-stack-md">
              <span className="summary-accent-badge rounded-full px-3 py-1 font-label-caps">
                <span className="accent-gradient-text">{copy.hero.badge}</span>
              </span>

              <h1 className="max-w-2xl break-words font-inter text-4xl font-extrabold leading-tight tracking-normal text-[#c3d5eb] sm:text-5xl md:text-6xl lg:text-[66px]">
                {copy.hero.titleStart} <span className="accent-gradient-text">{copy.hero.titleHighlight}</span>
              </h1>

              <p className="max-w-xl font-body-lg leading-relaxed text-on-surface-variant">{copy.hero.description}</p>

              <div className="flex flex-wrap gap-stack-sm pt-stack-sm">
                <span className="glass-card rounded-full px-4 py-1.5 font-code-snippet text-primary-container">.NET</span>
                <span className="glass-card rounded-full px-4 py-1.5 font-code-snippet text-primary-container">
                  React
                </span>
                <span className="glass-card rounded-full px-4 py-1.5 font-code-snippet text-primary-container">AWS</span>
                <span className="glass-card rounded-full px-4 py-1.5 font-code-snippet text-primary-container">
                  Docker
                </span>
              </div>
            </div>

            <div className="hidden w-full justify-end lg:flex">
              <div className="group relative w-full max-w-md">
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-cyan-400/45 via-sky-400/25 to-violet-500/20 opacity-25 blur transition duration-1000 group-hover:opacity-50 group-hover:duration-200" />

                <div className="ambient-glow glass-card relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#080d1a]/90 shadow-2xl backdrop-blur-xl">
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

        <section className="landing-section py-16 sm:py-20" id="value">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-50px" }}
              className="mb-12 text-center"
            >
              <h2 className="mb-2 text-3xl font-bold text-white">{copy.value.title}</h2>
              <p className="text-slate-400">{copy.value.description}</p>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="glass-card flex flex-col rounded-2xl border border-primary-container/15 p-6 sm:p-8 transition-colors hover:border-primary-container/50"
              >
                <div className="mb-4 rounded-lg bg-primary-container/10 p-3 w-fit text-primary-container">
                  <span className="material-symbols-outlined text-2xl">handshake</span>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-white">{copy.value.businessTitle}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{copy.value.businessDesc}</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true, margin: "-50px" }}
                className="glass-card flex flex-col rounded-2xl border border-primary-container/15 p-6 sm:p-8 transition-colors hover:border-primary-container/50"
              >
                <div className="mb-4 rounded-lg bg-primary-container/10 p-3 w-fit text-primary-container">
                  <span className="material-symbols-outlined text-2xl">forum</span>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-white">{copy.value.communicationTitle}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{copy.value.communicationDesc}</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true, margin: "-50px" }}
                className="glass-card flex flex-col rounded-2xl border border-primary-container/15 p-6 sm:p-8 transition-colors hover:border-primary-container/50"
              >
                <div className="mb-4 rounded-lg bg-primary-container/10 p-3 w-fit text-primary-container">
                  <span className="material-symbols-outlined text-2xl">verified_user</span>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-white">{copy.value.ownershipTitle}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{copy.value.ownershipDesc}</p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="landing-section py-16 sm:py-20" id="projects">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <h2 className="mb-6 text-3xl font-bold text-white">{copy.projects.title}</h2>
                
                <div className="glass-card relative flex flex-col overflow-hidden rounded-2xl border border-primary-container/15 p-6 sm:p-8 shadow-lg">
                  <div className="absolute -right-6 -top-6 opacity-[0.03] pointer-events-none">
                    <span className="material-symbols-outlined text-[160px]">public</span>
                  </div>
                  
                  <div className="relative z-10 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-primary-container/10 p-2 text-primary-container flex items-center justify-center">
                        <span className="material-symbols-outlined text-xl">rocket_launch</span>
                      </div>
                      <h3 className="text-xl font-semibold text-white">{copy.projects.cardSubtitle}</h3>
                    </div>
                    <p className="text-lg leading-relaxed text-slate-300">
                      {copy.projects.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="glass-card group relative flex flex-col overflow-hidden rounded-xl border border-primary-container/15 p-6 transition-colors hover:border-primary-container/50 min-h-[320px] cursor-pointer"
                onClick={() => setSelectedProjectUrl('/culinary-artisan.html')}
              >
                <div 
                  className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-60"
                  style={{ backgroundImage: "url('/culinary-artisan-bg.jpg')" }}
                />
                <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#050816] via-[#080d1a]/85 to-transparent" />
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary-container/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                
                <div className="relative z-10 mt-auto pt-16 mb-4 flex flex-wrap gap-2">
                  <span className="rounded border border-primary-container/50 bg-[#10182a]/80 px-2 py-1 font-code-snippet text-[10px] text-slate-300 shadow-sm backdrop-blur-sm">
                    React
                  </span>
                  <span className="rounded border border-primary-container/50 bg-[#10182a]/80 px-2 py-1 font-code-snippet text-[10px] text-slate-300 shadow-sm backdrop-blur-sm">
                    HTML
                  </span>
                  <span className="rounded border border-primary-container/50 bg-[#10182a]/80 px-2 py-1 font-code-snippet text-[10px] text-slate-300 shadow-sm backdrop-blur-sm">
                    Tailwind CSS
                  </span>
                </div>
                <h3 className="relative z-10 mb-3 text-2xl font-bold text-white transition-colors group-hover:text-primary-container">
                  {copy.projects.firstTitle}
                </h3>
                <p className="relative z-10 mb-6 flex-grow text-sm text-slate-300 drop-shadow-md">{copy.projects.firstDescription}</p>
                <div className="card-action-divider relative z-10 mt-auto flex items-center justify-between border-t pt-4">
                  <a
                    href="/culinary-artisan.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1 text-xs font-semibold text-primary-container transition-colors hover:text-white"
                  >
                    <span className="material-symbols-outlined text-base">launch</span>
                    {copy.projects.demo}
                  </a>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true, margin: "-50px" }}
                className="glass-card group relative flex flex-col overflow-hidden rounded-xl border border-primary-container/15 p-6 transition-colors hover:border-primary-container/50 min-h-[320px] cursor-pointer"
                onClick={() => openProject('https://hours-tracker-front.vercel.app')}
              >
                <div 
                  className="absolute inset-0 z-0 bg-cover bg-top bg-no-repeat opacity-40 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-60 bg-[#10182a]"
                  style={{ backgroundImage: "url('/hours-tracker-bg.png')" }}
                />
                <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#050816] via-[#080d1a]/85 to-transparent" />
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary-container/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                
                <div className="relative z-10 mt-auto pt-16 mb-4 flex flex-wrap gap-2">
                  <span className="rounded border border-primary-container/50 bg-[#10182a]/80 px-2 py-1 font-code-snippet text-[10px] text-slate-300 shadow-sm backdrop-blur-sm">
                    React
                  </span>
                  <span className="rounded border border-primary-container/50 bg-[#10182a]/80 px-2 py-1 font-code-snippet text-[10px] text-slate-300 shadow-sm backdrop-blur-sm">
                    Tailwind CSS
                  </span>
                  <span className="rounded border border-primary-container/50 bg-[#10182a]/80 px-2 py-1 font-code-snippet text-[10px] text-slate-300 shadow-sm backdrop-blur-sm">
                    Node.JS
                  </span>
                </div>
                <h3 className="relative z-10 mb-3 text-2xl font-bold text-white transition-colors group-hover:text-primary-container">
                  {copy.projects.secondTitle}
                </h3>
                <p className="relative z-10 mb-6 flex-grow text-sm text-slate-300 drop-shadow-md">{copy.projects.secondDescription}</p>
                <div className="card-action-divider relative z-10 mt-auto flex items-center justify-between border-t pt-4">
                  <a
                    href="https://hours-tracker-front.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => { e.stopPropagation(); openProject('https://hours-tracker-front.vercel.app'); e.preventDefault(); }}
                    className="flex items-center gap-1 text-xs font-semibold text-primary-container transition-colors hover:text-white"
                  >
                    <span className="material-symbols-outlined text-base">launch</span>
                    {copy.projects.demo}
                  </a>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true, margin: "-50px" }}
                className="glass-card group relative flex flex-col overflow-hidden rounded-xl border border-primary-container/15 p-6 transition-colors hover:border-primary-container/50 min-h-[320px] cursor-pointer"
                onClick={() => setSelectedProjectUrl('/pulse-fit.html')}
              >
                <div 
                  className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-60 bg-[#10182a]"
                  style={{ backgroundImage: "url('/pulse-fit-hero.jpg')" }}
                />
                <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#050816] via-[#080d1a]/85 to-transparent" />
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary-container/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                
                <div className="relative z-10 mt-auto pt-16 mb-4 flex flex-wrap gap-2">
                  <span className="rounded border border-primary-container/50 bg-[#10182a]/80 px-2 py-1 font-code-snippet text-[10px] text-slate-300 shadow-sm backdrop-blur-sm">
                    React
                  </span>
                  <span className="rounded border border-primary-container/50 bg-[#10182a]/80 px-2 py-1 font-code-snippet text-[10px] text-slate-300 shadow-sm backdrop-blur-sm">
                    HTML
                  </span>
                  <span className="rounded border border-primary-container/50 bg-[#10182a]/80 px-2 py-1 font-code-snippet text-[10px] text-slate-300 shadow-sm backdrop-blur-sm">
                    CSS
                  </span>
                  <span className="rounded border border-primary-container/50 bg-[#10182a]/80 px-2 py-1 font-code-snippet text-[10px] text-slate-300 shadow-sm backdrop-blur-sm">
                    Responsive UI
                  </span>
                </div>
                <h3 className="relative z-10 mb-3 text-2xl font-bold text-white transition-colors group-hover:text-primary-container">
                  {copy.projects.thirdTitle}
                </h3>
                <p className="relative z-10 mb-6 flex-grow text-sm text-slate-300 drop-shadow-md">{copy.projects.thirdDescription}</p>
                <div className="card-action-divider relative z-10 mt-auto flex items-center justify-between border-t pt-4">
                  <a
                    href="/pulse-fit.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1 text-xs font-semibold text-primary-container transition-colors hover:text-white"
                  >
                    <span className="material-symbols-outlined text-base">launch</span>
                    {copy.projects.demo}
                  </a>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true, margin: "-50px" }}
                className="glass-card group relative flex flex-col overflow-hidden rounded-xl border border-primary-container/15 p-6 transition-colors hover:border-primary-container/50 min-h-[320px] cursor-pointer"
                onClick={() => setSelectedProjectUrl('/gourmet-bistro')}
              >
                <div 
                  className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-60 bg-[#10182a]"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop')" }}
                />
                <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#050816] via-[#080d1a]/85 to-transparent" />
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary-container/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                
                <div className="relative z-10 mt-auto pt-16 mb-4 flex flex-wrap gap-2">
                  <span className="rounded border border-primary-container/50 bg-[#10182a]/80 px-2 py-1 font-code-snippet text-[10px] text-slate-300 shadow-sm backdrop-blur-sm">
                    React
                  </span>
                  <span className="rounded border border-primary-container/50 bg-[#10182a]/80 px-2 py-1 font-code-snippet text-[10px] text-slate-300 shadow-sm backdrop-blur-sm">
                    Vanilla CSS
                  </span>
                </div>
                <h3 className="relative z-10 mb-3 text-2xl font-bold text-white transition-colors group-hover:text-primary-container">
                  {copy.projects.fourthTitle}
                </h3>
                <p className="relative z-10 mb-6 flex-grow text-sm text-slate-300 drop-shadow-md">{copy.projects.fourthDescription}</p>
                <div className="card-action-divider relative z-10 mt-auto flex items-center justify-between border-t pt-4">
                  <a
                    href="/gourmet-bistro"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1 text-xs font-semibold text-primary-container transition-colors hover:text-white"
                  >
                    <span className="material-symbols-outlined text-base">launch</span>
                    {copy.projects.demo}
                  </a>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true, margin: "-50px" }}
                className="glass-card group relative flex flex-col overflow-hidden rounded-xl border border-primary-container/15 p-6 transition-colors hover:border-primary-container/50 min-h-[320px] cursor-pointer md:col-span-2 lg:col-span-1"
                onClick={() => openProject('https://duo-fin-landing-page.vercel.app')}
              >
                <div 
                  className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-60 bg-[#10182a]"
                  style={{ backgroundImage: "url('/duo-fin-bg.png')" }}
                />
                <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#050816] via-[#080d1a]/85 to-transparent" />
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary-container/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                
                <div className="relative z-10 mt-auto pt-16 mb-4 flex flex-wrap gap-2">
                  <span className="rounded border border-primary-container/50 bg-[#10182a]/80 px-2 py-1 font-code-snippet text-[10px] text-slate-300 shadow-sm backdrop-blur-sm">
                    .NET
                  </span>
                  <span className="rounded border border-primary-container/50 bg-[#10182a]/80 px-2 py-1 font-code-snippet text-[10px] text-slate-300 shadow-sm backdrop-blur-sm">
                    Flutter
                  </span>
                  <span className="rounded border border-primary-container/50 bg-[#10182a]/80 px-2 py-1 font-code-snippet text-[10px] text-slate-300 shadow-sm backdrop-blur-sm">
                    React
                  </span>
                </div>
                <h3 className="relative z-10 mb-3 text-2xl font-bold text-white transition-colors group-hover:text-primary-container">
                  {copy.projects.fifthTitle}
                </h3>
                <p className="relative z-10 mb-6 flex-grow text-sm text-slate-300 drop-shadow-md">{copy.projects.fifthDescription}</p>
                <div className="card-action-divider relative z-10 mt-auto flex items-center justify-between border-t pt-4">
                  <a
                    href="https://duo-fin-landing-page.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => { e.stopPropagation(); openProject('https://duo-fin-landing-page.vercel.app'); e.preventDefault(); }}
                    className="flex items-center gap-1 text-xs font-semibold text-primary-container transition-colors hover:text-white"
                  >
                    <span className="material-symbols-outlined text-base">launch</span>
                    {copy.projects.demo}
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="landing-section py-16 sm:py-20" id="expertise">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-50px" }}
              className="mb-12 text-center"
            >
              <h2 className="mb-2 text-3xl font-bold text-white">{copy.expertise.title}</h2>
              <p className="text-slate-400">{copy.expertise.description}</p>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="glass-card flex flex-col rounded-2xl border border-primary-container/15 p-6 sm:p-8 transition-colors hover:border-primary-container/50"
              >
                <div className="mb-4 rounded-lg bg-primary-container/10 p-3 w-fit text-primary-container">
                  <span className="material-symbols-outlined text-2xl">account_tree</span>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-white">{copy.expertise.scalableTitle}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{copy.expertise.scalableDesc}</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true, margin: "-50px" }}
                className="glass-card flex flex-col rounded-2xl border border-primary-container/15 p-6 sm:p-8 transition-colors hover:border-primary-container/50"
              >
                <div className="mb-4 rounded-lg bg-primary-container/10 p-3 w-fit text-primary-container">
                  <span className="material-symbols-outlined text-2xl">shield_locked</span>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-white">{copy.expertise.securityTitle}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{copy.expertise.securityDesc}</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true, margin: "-50px" }}
                className="glass-card flex flex-col rounded-2xl border border-primary-container/15 p-6 sm:p-8 transition-colors hover:border-primary-container/50"
              >
                <div className="mb-4 rounded-lg bg-primary-container/10 p-3 w-fit text-primary-container">
                  <span className="material-symbols-outlined text-2xl">cloud_done</span>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-white">{copy.expertise.availabilityTitle}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{copy.expertise.availabilityDesc}</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true, margin: "-50px" }}
                className="glass-card flex flex-col rounded-2xl border border-primary-container/15 p-6 sm:p-8 transition-colors hover:border-primary-container/50"
              >
                <div className="mb-4 rounded-lg bg-primary-container/10 p-3 w-fit text-primary-container">
                  <span className="material-symbols-outlined text-2xl">speed</span>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-white">{copy.expertise.performanceTitle}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{copy.expertise.performanceDesc}</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true, margin: "-50px" }}
                className="glass-card flex flex-col rounded-2xl border border-primary-container/15 p-6 sm:p-8 transition-colors hover:border-primary-container/50"
              >
                <div className="mb-4 rounded-lg bg-primary-container/10 p-3 w-fit text-primary-container">
                  <span className="material-symbols-outlined text-2xl">autorenew</span>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-white">{copy.expertise.cicdTitle}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{copy.expertise.cicdDesc}</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true, margin: "-50px" }}
                className="glass-card flex flex-col rounded-2xl border border-primary-container/15 p-6 sm:p-8 transition-colors hover:border-primary-container/50"
              >
                <div className="mb-4 rounded-lg bg-primary-container/10 p-3 w-fit text-primary-container">
                  <span className="material-symbols-outlined text-2xl">api</span>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-white">{copy.expertise.apiTitle}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{copy.expertise.apiDesc}</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* <section className="relative overflow-hidden border-t border-white/5 bg-[#050816] py-16 sm:py-20" id="experience">
          <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-primary-container/5 blur-[120px]" />

          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-50px" }}
              className="mb-16"
            >
              <h2 className="mb-2 text-3xl font-bold text-white">{copy.experience.title}</h2>
              <p className="text-slate-400">{copy.experience.subtitle}</p>
            </motion.div>

            <div className="relative">
              <div className="absolute bottom-0 left-[20px] top-0 w-px bg-[#10182a] md:left-1/2 md:-translate-x-1/2">
                <div className="absolute top-0 w-full bg-primary-container shadow-[0_0_10px_#00e5ff]" style={{ height: '58%' }} />
              </div>

              <div className="space-y-12">
                <div className="relative flex w-full flex-col items-center justify-between md:flex-row">
                  <div className="hidden md:block md:w-5/12" />

                  <div className="absolute left-[20px] z-10 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-primary-container bg-[#050816] shadow-[0_0_10px_#00e5ff] md:left-1/2">
                    <div className="absolute inset-1 rounded-full bg-primary-container" />
                  </div>

                  <div className="w-full pl-[50px] text-left md:w-5/12 md:pl-0">
                    <motion.div 
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      viewport={{ once: true, margin: "-50px" }}
                      className="selectable-card glass-card rounded-xl border border-primary-container/15 p-6 transition-colors hover:border-primary-container/60"
                    >
                      <div className="mb-2 flex flex-col justify-between gap-2 md:flex-row md:items-center">
                        <h3 className="text-lg font-bold text-primary-container">{copy.experience.primaryRole}</h3>
                        <span className="font-code-snippet text-xs text-slate-400">{copy.experience.primaryDate}</span>
                      </div>
                      <h4 className="mb-3 text-sm font-medium text-white">{copy.experience.primaryCompany}</h4>
                      <p className="text-sm leading-relaxed text-slate-400">{copy.experience.primaryDescription}</p>
                    </motion.div>
                  </div>
                </div>

                <div className="relative flex w-full flex-col items-center justify-between md:flex-row">
                  <div className="w-full pl-[50px] text-left md:w-5/12 md:pl-0 md:text-right">
                    <motion.div 
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      viewport={{ once: true, margin: "-50px" }}
                      className="selectable-card glass-card rounded-xl border border-primary-container/15 p-6 transition-colors hover:border-primary-container/60"
                    >
                      <div className="mb-2 flex flex-col justify-between gap-2 md:flex-row-reverse md:items-center">
                        <h3 className="text-lg font-bold text-primary-container">{copy.experience.secondaryRole}</h3>
                        <span className="font-code-snippet text-xs text-slate-400">{copy.experience.secondaryDate}</span>
                      </div>
                      <h4 className="mb-3 text-sm font-medium text-white">{copy.experience.secondaryCompany}</h4>
                      <p className="text-sm leading-relaxed text-slate-400">{copy.experience.secondaryDescription}</p>
                    </motion.div>
                  </div>

                  <div className="absolute left-[20px] z-10 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-primary-container bg-[#050816] shadow-[0_0_10px_#00e5ff] md:left-1/2" />
                  <div className="hidden md:block md:w-5/12" />
                </div>

                <div className="relative flex w-full flex-col items-center justify-between md:flex-row">
                  <div className="hidden md:block md:w-5/12" />

                  <div className="absolute left-[20px] z-10 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-primary-container bg-[#050816] shadow-[0_0_10px_#00e5ff] md:left-1/2">
                    <div className="absolute inset-1 rounded-full bg-primary-container" />
                  </div>

                  <div className="w-full pl-[50px] text-left md:w-5/12 md:pl-0">
                    <motion.div 
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      viewport={{ once: true, margin: "-50px" }}
                      className="selectable-card glass-card rounded-xl border border-primary-container/15 p-6 transition-colors hover:border-primary-container/60"
                    >
                      <div className="mb-2 flex flex-col justify-between gap-2 md:flex-row md:items-center">
                        <h3 className="text-lg font-bold text-primary-container">{copy.experience.tertiaryRole}</h3>
                        <span className="font-code-snippet text-xs text-slate-400">{copy.experience.tertiaryDate}</span>
                      </div>
                      <h4 className="mb-3 text-sm font-medium text-white">{copy.experience.tertiaryCompany}</h4>
                      <p className="text-sm leading-relaxed text-slate-400">{copy.experience.tertiaryDescription}</p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        <section className="landing-section py-16 sm:py-20" id="stack">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-50px" }}
              className="mb-12 text-center"
            >
              <h2 className="mb-2 text-3xl font-bold text-white">{copy.stack.title}</h2>
              <p className="text-slate-400">{copy.stack.description}</p>
            </motion.div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="glass-card flex h-full flex-col rounded-2xl border border-primary-container/15 p-6 sm:p-8"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-lg bg-primary-container/10 p-2 text-primary-container">
                    <span className="material-symbols-outlined text-primary-container">dns</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white">{copy.stack.backendTitle}</h3>
                </div>

                <p className="mb-8 text-sm text-slate-400">{copy.stack.backendDescription}</p>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                  <div className="group flex flex-col items-center justify-center rounded-xl border border-primary-container/10 bg-white/[0.03] p-3 transition-colors hover:border-primary-container/50 sm:p-4">
                    <span className="material-symbols-outlined mb-2 text-3xl text-primary-container">terminal</span>
                    <span className="text-xs font-medium text-slate-300">C#</span>
                  </div>
                  <div className="group flex flex-col items-center justify-center rounded-xl border border-primary-container/10 bg-white/[0.03] p-3 transition-colors hover:border-primary-container/50 sm:p-4">
                    <span className="material-symbols-outlined mb-2 text-3xl text-primary-container">data_object</span>
                    <span className="text-xs font-medium text-slate-300">Node.Js</span>
                  </div>
                  <div className="group flex flex-col items-center justify-center rounded-xl border border-primary-container/10 bg-white/[0.03] p-3 transition-colors hover:border-primary-container/50 sm:p-4">
                    <span className="material-symbols-outlined mb-2 text-3xl text-primary-container">database</span>
                    <span className="text-xs font-medium text-slate-300">SQL</span>
                  </div>
                  <div className="group flex flex-col items-center justify-center rounded-xl border border-primary-container/10 bg-white/[0.03] p-3 transition-colors hover:border-primary-container/50 sm:p-4">
                    <span className="material-symbols-outlined mb-2 text-3xl text-primary-container">code_blocks</span>
                    <span className="text-xs font-medium text-slate-300">Python</span>
                  </div>
                  <div className="group flex flex-col items-center justify-center rounded-xl border border-primary-container/10 bg-white/[0.03] p-3 transition-colors hover:border-primary-container/50 sm:p-4">
                    <span className="material-symbols-outlined mb-2 text-3xl text-primary-container">cloud</span>
                    <span className="text-xs font-medium text-slate-300">AWS</span>
                  </div>
                  <div className="group flex flex-col items-center justify-center rounded-xl border border-primary-container/10 bg-white/[0.03] p-3 transition-colors hover:border-primary-container/50 sm:p-4">
                    <span className="material-symbols-outlined mb-2 text-3xl text-primary-container">hub</span>
                    <span className="text-xs font-medium text-slate-300">Docker</span>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true, margin: "-50px" }}
                className="glass-card flex h-full flex-col rounded-2xl border border-primary-container/15 p-6 sm:p-8"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-lg bg-primary-container/10 p-2 text-primary-container">
                    <span className="material-symbols-outlined text-cyan-400">layers</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white">{copy.stack.frontendTitle}</h3>
                </div>

                <p className="mb-8 text-sm text-slate-400">{copy.stack.frontendDescription}</p>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                  <div className="group flex flex-col items-center justify-center rounded-xl border border-primary-container/10 bg-white/[0.03] p-3 transition-colors hover:border-primary-container/50 sm:p-4">
                    <span className="material-symbols-outlined mb-2 text-3xl text-cyan-400">code</span>
                    <span className="text-xs font-medium text-slate-300">TypeScript</span>
                  </div>
                  <div className="group flex flex-col items-center justify-center rounded-xl border border-primary-container/10 bg-white/[0.03] p-3 transition-colors hover:border-primary-container/50 sm:p-4">
                    <span className="material-symbols-outlined mb-2 text-3xl text-cyan-400">widgets</span>
                    <span className="text-xs font-medium text-slate-300">React</span>
                  </div>
                  <div className="group flex flex-col items-center justify-center rounded-xl border border-primary-container/10 bg-white/[0.03] p-3 transition-colors hover:border-primary-container/50 sm:p-4">
                    <span className="material-symbols-outlined mb-2 text-3xl text-cyan-400">palette</span>
                    <span className="text-xs font-medium text-slate-300">Tailwind</span>
                  </div>
                  <div className="group flex flex-col items-center justify-center rounded-xl border border-primary-container/10 bg-white/[0.03] p-3 transition-colors hover:border-primary-container/50 sm:p-4">
                    <span className="material-symbols-outlined mb-2 text-3xl text-cyan-400">api</span>
                    <span className="text-xs font-medium text-slate-300">Next.js</span>
                  </div>
                  <div className="group flex flex-col items-center justify-center rounded-xl border border-primary-container/10 bg-white/[0.03] p-3 transition-colors hover:border-primary-container/50 sm:p-4">
                    <span className="material-symbols-outlined mb-2 text-3xl text-cyan-400">web</span>
                    <span className="text-xs font-medium text-slate-300">HTML/CSS</span>
                  </div>
                  <div className="group flex flex-col items-center justify-center rounded-xl border border-primary-container/10 bg-white/[0.03] p-3 transition-colors hover:border-primary-container/50 sm:p-4">
                    <span className="material-symbols-outlined mb-2 text-3xl text-cyan-400">javascript</span>
                    <span className="text-xs font-medium text-slate-300">JavaScript</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="landing-section py-16 sm:py-20" id="about">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <h2 className="mb-2 text-3xl font-bold text-white">{copy.about.title}</h2>
                <p className="text-slate-400">{copy.about.description}</p>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-50px" }}
              className="glass-card flex flex-col md:flex-row overflow-hidden rounded-2xl border border-primary-container/15 transition-colors hover:border-primary-container/50"
            >
              <div className="md:w-2/5 lg:w-1/3 relative flex-shrink-0 bg-white/[0.03]">
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#050816] via-[#080d1a]/20 to-transparent z-10" />
                <img
                  alt={copy.about.cardTitle}
                  className="h-full w-full object-cover min-h-[300px] md:min-h-full"
                  src={profilePhoto}
                />
              </div>
              <div className="p-8 md:p-10 md:w-3/5 lg:w-2/3 flex flex-col justify-center relative z-20">
                <div className="mb-4">
                  <h3 className="text-3xl font-bold text-white mb-1">{copy.about.cardTitle}</h3>
                  <p className="text-primary-container font-medium">{copy.about.cardSubtitle}</p>
                </div>
                <p className="text-slate-300 leading-relaxed text-base sm:text-lg mb-8">
                  {copy.about.cardText}
                </p>
                <div className="flex flex-wrap gap-2">
                  {copy.about.tags.map(tag => (
                    <span key={tag} className="rounded border border-primary-container/30 bg-primary-container/5 px-3 py-1.5 font-code-snippet text-xs font-semibold text-primary-container backdrop-blur-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="landing-section py-16 sm:py-20" id="contact">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-50px" }}
              className="tone-card relative overflow-hidden rounded-2xl border border-primary-container/25 px-6 py-10 text-left shadow-[0_0_40px_rgba(0,229,255,0.05)] sm:rounded-3xl sm:px-10 sm:py-12 md:p-16"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_14%,rgba(0,229,255,0.16),transparent_30%),radial-gradient(circle_at_10%_92%,rgba(124,58,237,0.22),transparent_28%)]" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-container/60 to-transparent" />

              <div className="relative z-10 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.8fr)] lg:items-center">
                <div>
                  <p className="mb-7 font-label-caps text-primary-container">{copy.contact.eyebrow}</p>
                  <h2 className="max-w-2xl break-words text-3xl font-bold leading-[1.08] text-white sm:text-4xl lg:text-5xl">
                    {copy.contact.headline}
                  </h2>
                  <p className="mt-6 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">
                    {copy.contact.description}
                  </p>

                  <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                    <a
                      className="flex items-center justify-center gap-2 rounded-full bg-primary-container px-7 py-3 text-sm font-bold text-on-primary-fixed transition-all hover:scale-[0.98] hover:bg-primary-container/90"
                      href={WHATSAPP_URL}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {copy.contact.whatsappButton}
                      <span className="material-symbols-outlined text-base">arrow_outward</span>
                    </a>
                  </div>
                </div>

                <div className="space-y-3 lg:pt-10">
                  <a
                    className="group flex min-h-[70px] items-center justify-between gap-4 rounded-xl border border-slate-700/80 bg-white/[0.03] px-5 py-4 text-white transition-colors hover:border-[#25D366]/60 hover:bg-[#25D366]/10"
                    href={WHATSAPP_URL}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span className="flex items-center gap-4">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-slate-300">
                        <span className="material-symbols-outlined text-xl">call</span>
                      </span>
                      <span className="font-semibold">WhatsApp</span>
                    </span>
                    <span className="material-symbols-outlined text-lg text-slate-500 transition-colors group-hover:text-[#25D366]">
                      arrow_outward
                    </span>
                  </a>

                  <a
                    className="group flex min-h-[70px] items-center justify-between gap-4 rounded-xl border border-slate-700/80 bg-white/[0.03] px-5 py-4 text-white transition-colors hover:border-primary-container/60 hover:bg-primary-container/10 hover:text-primary-container"
                    href={`mailto:${CONTACT_EMAIL}`}
                  >
                    <span className="flex items-center gap-4">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-slate-300 transition-colors group-hover:border-primary-container/30 group-hover:bg-primary-container/10 group-hover:text-primary-container">
                        <span className="material-symbols-outlined text-xl">mail</span>
                      </span>
                      <span className="font-semibold">{copy.contact.primaryButton}</span>
                    </span>
                    <span className="material-symbols-outlined text-lg text-slate-500 transition-colors group-hover:text-primary-container">
                      arrow_outward
                    </span>
                  </a>

                  <a
                    className="group flex min-h-[70px] items-center justify-between gap-4 rounded-xl border border-slate-700/80 bg-white/[0.03] px-5 py-4 text-white transition-colors hover:border-primary-container/60 hover:bg-primary-container/10"
                    href="https://www.linkedin.com/in/joão-victor-218b26315"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span className="flex items-center gap-4">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-slate-300">
                        <span className="material-symbols-outlined text-xl">badge</span>
                      </span>
                      <span className="font-semibold">LinkedIn</span>
                    </span>
                    <span className="material-symbols-outlined text-lg text-slate-500 transition-colors group-hover:text-primary-container">
                      arrow_outward
                    </span>
                  </a>

                  <a
                    className="group flex min-h-[70px] items-center justify-between gap-4 rounded-xl border border-slate-700/80 bg-white/[0.03] px-5 py-4 text-white transition-colors hover:border-primary-container/60 hover:bg-primary-container/10"
                    href="https://github.com/Zenx007"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span className="flex items-center gap-4">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-slate-300">
                        <span className="material-symbols-outlined text-xl">code</span>
                      </span>
                      <span className="font-semibold">GitHub</span>
                    </span>
                    <span className="material-symbols-outlined text-lg text-slate-500 transition-colors group-hover:text-primary-container">
                      arrow_outward
                    </span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="mt-auto border-t border-primary-container/10 bg-[#050816] py-8">
        <div className="container mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-center text-xs text-slate-500 sm:px-6 md:flex-row md:text-left">
          <p>© 2026 DEVPORTFOLIO. ALL RIGHTS RESERVED.</p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <span>{copy.hero.badge}</span>
            <span>MODERN INFRASTRUCTURE</span>
          </div>
        </div>
      </footer>

      {selectedProjectUrl && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-8"
          onClick={() => setSelectedProjectUrl(null)}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="relative w-full h-full max-w-7xl max-h-[90vh] bg-[#050816] rounded-2xl overflow-hidden border border-primary-container/15 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-3 sm:p-4 border-b border-white/10 bg-[#080d1a]/90">
              <div className="flex gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedProjectUrl(null); }}
                  className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer"
                  title="Fechar"
                />
                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedProjectUrl(null); }}
                  className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors cursor-pointer"
                  title="Voltar"
                />
                <button
                  onClick={(e) => { e.stopPropagation(); window.open(getRawProjectUrl(selectedProjectUrl), '_blank', 'noopener,noreferrer'); }}
                  className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors cursor-pointer"
                  title="Abrir no navegador"
                />
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={getRawProjectUrl(selectedProjectUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-slate-400 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10 flex items-center justify-center gap-1 text-xs"
                >
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                </a>
                <button 
                  onClick={(e) => { e.stopPropagation(); setSelectedProjectUrl(null); }}
                  className="text-slate-400 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10 flex items-center justify-center"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
            </div>
            <div className="flex-1 w-full relative bg-white">
              <div className="absolute inset-0 flex items-center justify-center text-slate-400 bg-[#080d1a]">
                 <span className="material-symbols-outlined animate-spin text-4xl">progress_activity</span>
              </div>
              <iframe 
                src={selectedProjectUrl} 
                className="relative z-10 w-full h-full border-0"
                title="Project Preview"
              />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default App
