import './App.css'
import profilePhoto from './assets/profile-photo.png'

const heroTextureUrl =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBN5x0omsxTH1DGIyaHqqMRoZ_JBzlueM1To7EguutK_rkE0GOaCdRl9fBblP87SV4pZgcgjsHCSju_ClTBnfrVxE8FDFhMNXGIYuFFwvi7bx-HmzitMsCiGkFqzNkwzl0T5_JkOzJQihn-YiRPUeBoZam1rLR3_9DnvOuOne5-h2cCtNBdKcflNap5pDqzxDTbR07eBDr3JQ-sK_pJx7kovi7bGq_Lw1ArE2xWF1gcgb1B5-oI6OXuH3fpu28b7VCQGVlB3DifVu8'

function App() {
  return (
    <div className="bg-background text-on-background font-body-md selection:bg-primary-container selection:text-on-primary-fixed">
      <nav className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-cyan-500/20 bg-slate-900/60 px-6 py-4 shadow-[0_4px_20px_rgba(0,229,255,0.05)] backdrop-blur-xl">
        <div className="font-inter text-xl font-black uppercase tracking-tighter text-cyan-400">ENGINEER.OS</div>

        <div className="hidden items-center gap-8 font-inter tracking-tight md:flex">
          <a className="text-slate-400 transition-colors hover:text-slate-100" href="#stack">
            Arsenal
          </a>
          <a className="border-b-2 border-cyan-400 pb-1 font-semibold text-cyan-400" href="#projects">
            Projects
          </a>
          <a className="text-slate-400 transition-colors hover:text-slate-100" href="#experience">
            Experience
          </a>
          <a className="text-slate-400 transition-colors hover:text-slate-100" href="#contact">
            Contact
          </a>
        </div>

        <div className="flex items-center gap-4">
          <div className="mr-4 flex items-center gap-2 rounded-full border border-white/5 bg-black/20 p-1.5">
            <button
              className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-slate-800 text-sm opacity-100 ring-2 ring-primary-container/50"
              title="English"
              type="button"
            >
              🇺🇸
            </button>
            <button
              className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-slate-800 text-sm opacity-50 transition-opacity hover:opacity-100"
              title="Português"
              type="button"
            >
              🇧🇷
            </button>
          </div>

          <button
            className="rounded bg-primary-container px-6 py-2 font-bold text-on-primary-fixed transition-all duration-300 hover:scale-95 hover:opacity-80"
            type="button"
          >
            Resume.pdf
          </button>
        </div>
      </nav>

      <main>
        <section className="relative flex min-h-screen items-center overflow-hidden pt-16">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,229,255,0.1),transparent_70%)]" />
            <div
              className="absolute h-full w-full opacity-20"
              style={{
                backgroundImage: `url('${heroTextureUrl}')`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}
            />
          </div>

          <div className="container-max relative z-10 mx-auto grid items-center gap-stack-lg px-gutter lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-stack-md">
              <span className="rounded-full bg-primary-container/10 px-3 py-1 font-label-caps text-primary-container">
                SYSTEM ARCHITECT
              </span>

              <h1 className="max-w-2xl font-h1 text-on-background">
                Building High-Performance <span className="text-primary-container">Distributed Systems</span>
              </h1>

              <p className="max-w-xl font-body-lg leading-relaxed text-on-surface-variant">
                Seasoned systems architect specialized in crafting robust backend infrastructures and
                high-performance APIs. I architect scalable cloud solutions across the .NET, NestJS, and AWS
                ecosystems, focusing on mission-critical stability and extreme throughput for enterprise platforms.
              </p>

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
                    alt="Foto de perfil"
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
              <h2 className="font-h2 text-on-background">Professional Trajectory</h2>
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
                        <h3 className="text-2xl font-bold text-white">Systems Analyst</h3>
                        <p className="font-medium text-primary-container">Second Mind</p>
                      </div>
                      <span className="rounded bg-primary-container/5 px-3 py-1 font-code-snippet text-primary-container">
                        FEB 2026 — PRESENT
                      </span>
                    </div>

                    <p className="mb-6 max-w-3xl font-body-md text-on-surface-variant">
                      Leading technical architecture for high-scale distributed systems. Responsibility for system
                      integrity, cloud migration strategies, and cross-team architectural alignment on AWS.
                    </p>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="border-l-2 border-primary-container bg-surface-container p-4">
                        <div className="mb-1 text-3xl font-bold text-white">99.99%</div>
                        <div className="font-label-caps text-sm text-slate-400">UPTIME ARCHITECTURE</div>
                      </div>

                      <div className="border-l-2 border-primary-container bg-surface-container p-4">
                        <div className="mb-1 text-3xl font-bold text-white">50%</div>
                        <div className="font-label-caps text-sm text-slate-400">LATENCY REDUCTION</div>
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
                        <h3 className="text-xl font-bold text-white">Software Developer</h3>
                        <p className="font-medium text-slate-400">Second Mind</p>
                      </div>
                      <span className="font-code-snippet text-slate-400">MAY 2025 — FEB 2026</span>
                    </div>

                    <p className="max-w-3xl font-body-md text-on-surface-variant">
                      Developed core features for enterprise data pipelines using NestJS and .NET. Contributed to
                      microservices scalability and performance monitoring improvements.
                    </p>
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
                <h2 className="font-h2 text-on-background">Technical Labs</h2>
                <p className="mt-2 text-on-surface-variant">Experimental architectures and core engineering prototypes.</p>
              </div>

              <div className="flex rounded-lg bg-surface-container-high p-1">
                <button className="rounded-md bg-primary-container px-6 py-2 text-sm font-bold text-on-primary-fixed" type="button">
                  ARCHITECTURES
                </button>
                <button className="rounded-md px-6 py-2 text-sm font-medium text-slate-400 transition-colors hover:text-white" type="button">
                  COMPONENTS
                </button>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="glass-card group flex flex-col overflow-hidden rounded-xl border border-white/5 transition-all duration-300 hover:border-primary-container/40">
                <div className="relative aspect-video overflow-hidden bg-surface-container-highest">
                  <img
                    alt="Cloud Infrastructure Project"
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
                  <h4 className="mb-2 text-xl font-bold text-white">Zero-Trust Cloud Mesh</h4>
                  <p className="mb-6 flex-grow text-sm text-on-surface-variant">
                    Automated multi-region infrastructure deployment with service mesh integration and strict
                    identity-based security policies.
                  </p>

                  <div className="flex items-center justify-between border-t border-white/5 pt-4">
                    <a
                      className="flex items-center gap-2 font-label-caps text-xs text-slate-400 transition-colors hover:text-primary-container"
                      href="#"
                    >
                      <span className="material-symbols-outlined text-sm" data-icon="code">
                        code
                      </span>{' '}
                      GITHUB
                    </a>
                    <a className="flex items-center gap-2 font-label-caps text-xs text-primary-container hover:underline" href="#">
                      <span className="material-symbols-outlined text-sm" data-icon="launch">
                        launch
                      </span>{' '}
                      DEMO
                    </a>
                  </div>
                </div>
              </div>

              <div className="glass-card group flex flex-col overflow-hidden rounded-xl border border-white/5 transition-all duration-300 hover:border-primary-container/40">
                <div className="relative aspect-video overflow-hidden bg-surface-container-highest">
                  <img
                    alt="High Performance API"
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
                  <h4 className="mb-2 text-xl font-bold text-white">High-Throughput Gateway</h4>
                  <p className="mb-6 flex-grow text-sm text-on-surface-variant">
                    A custom API gateway implementation optimized for low-latency gRPC to REST translation and
                    dynamic request routing.
                  </p>

                  <div className="flex items-center justify-between border-t border-white/5 pt-4">
                    <a
                      className="flex items-center gap-2 font-label-caps text-xs text-slate-400 transition-colors hover:text-primary-container"
                      href="#"
                    >
                      <span className="material-symbols-outlined text-sm" data-icon="code">
                        code
                      </span>{' '}
                      GITHUB
                    </a>
                    <a className="flex items-center gap-2 font-label-caps text-xs text-primary-container hover:underline" href="#">
                      <span className="material-symbols-outlined text-sm" data-icon="launch">
                        launch
                      </span>{' '}
                      DEMO
                    </a>
                  </div>
                </div>
              </div>

              <div className="glass-card group flex flex-col overflow-hidden rounded-xl border border-white/5 transition-all duration-300 hover:border-primary-container/40">
                <div className="relative aspect-video overflow-hidden bg-surface-container-highest">
                  <img
                    alt="Realtime Data"
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
                  <h4 className="mb-2 text-xl font-bold text-white">Event Streaming Hub</h4>
                  <p className="mb-6 flex-grow text-sm text-on-surface-variant">
                    Scalable pub/sub architecture handling 50k+ events/sec with guaranteed delivery and persistent
                    audit trails.
                  </p>

                  <div className="flex items-center justify-between border-t border-white/5 pt-4">
                    <a
                      className="flex items-center gap-2 font-label-caps text-xs text-slate-400 transition-colors hover:text-primary-container"
                      href="#"
                    >
                      <span className="material-symbols-outlined text-sm" data-icon="code">
                        code
                      </span>{' '}
                      GITHUB
                    </a>
                    <a className="flex items-center gap-2 font-label-caps text-xs text-primary-container hover:underline" href="#">
                      <span className="material-symbols-outlined text-sm" data-icon="launch">
                        launch
                      </span>{' '}
                      DEMO
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
              <h2 className="font-h2 text-on-background">Technical Arsenal</h2>
              <p className="mt-2 font-body-md text-on-surface-variant">Engineered with modern standards and best practices.</p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="glass-card flex h-full flex-col rounded-xl border border-white/5 p-8 transition-colors hover:border-primary-container/30">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-primary-container/10">
                    <span className="material-symbols-outlined text-primary-container">dns</span>
                  </div>
                  <h3 className="font-h2 text-2xl text-white">Backend Mastery</h3>
                </div>

                <p className="mb-8 text-on-surface-variant">
                  Architecting high-throughput services and robust data pipelines with enterprise-grade reliability.
                </p>

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
                  <h3 className="font-h2 text-2xl text-white">Frontend Excellence</h3>
                </div>

                <p className="mb-8 text-on-surface-variant">
                  Crafting responsive, accessible, and performant user interfaces with modern web technologies.
                </p>

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

              <h2 className="mb-6 font-h2 text-on-background">Academic Foundation</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white">Bachelor of Science in Software Engineering</h3>
                  <p className="text-primary-container">Technical University of Architecture</p>
                </div>

                <p className="font-body-md leading-relaxed text-on-surface-variant">
                  Rigorous focus on algorithmic complexity, data structures, and software design patterns.
                  Specialized in distributed systems and high-concurrency environments during the final thesis
                  project.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-section-padding" id="contact">
          <div className="container-max mx-auto px-gutter text-center">
            <div className="ambient-glow glass-card mx-auto max-w-4xl rounded-2xl border border-white/10 p-12">
              <h2 className="mb-4 font-h1 text-white">
                Let&apos;s build something <span className="text-primary-container">scalable</span> together
              </h2>

              <p className="mx-auto mb-8 max-w-2xl font-body-lg text-on-surface-variant">
                Currently available for senior architectural roles or specialized consulting. Fluent in English (C1
                Proficiency).
              </p>

              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <button
                  className="flex items-center justify-center gap-2 rounded-lg bg-primary-container px-8 py-4 font-bold text-on-primary-fixed transition-transform hover:scale-105"
                  type="button"
                >
                  <span className="material-symbols-outlined" data-icon="mail">
                    mail
                  </span>
                  Contact Me
                </button>

                <button
                  className="rounded-lg border border-primary-container px-8 py-4 font-bold text-primary-container transition-colors hover:bg-primary-container/10"
                  type="button"
                >
                  View Documentation
                </button>
              </div>

              <div className="mt-8 flex justify-center gap-8 text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary-container" data-icon="translate">
                    translate
                  </span>
                  <span className="font-code-snippet">ENGLISH: C1 ADVANCED</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary-container" data-icon="location_on">
                    location_on
                  </span>
                  <span className="font-code-snippet">REMOTE / GLOBAL</span>
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
            System Status
          </a>
          <a className="font-mono text-[10px] uppercase text-slate-600 opacity-60 transition-colors hover:text-cyan-400" href="#">
            Documentation
          </a>
          <a className="font-mono text-[10px] uppercase text-slate-600 opacity-60 transition-colors hover:text-cyan-400" href="#">
            Privacy
          </a>
        </div>
      </footer>
    </div>
  )
}

export default App
