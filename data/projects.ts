export interface Project {
  name: string
  description: string
  link: string | null
  image: string | null
  techs: string[]
  github: string | null
  category: 'ai' | 'web' | 'product'
  featured: boolean
}

const projects: Project[] = [
  // AI Projects
  {
    name: 'OpenClaw',
    description: 'Personal deployment of the OpenClaw agent framework. Multi-model waterfall, persistent memory, autonomous cron jobs, Telegram integration, and a custom skills architecture — running 24/7 on a Mac Mini.',
    link: null,
    image: null,
    techs: ['Node.js', 'Gemini', 'Claude', 'OpenAI', 'Ollama', 'TypeScript'],
    github: null,
    category: 'ai',
    featured: true
  },
  {
    name: 'Zoe',
    description: 'AI command center and agent identity. Real-time system monitoring, service health, cron oversight, and an always-on agent personality that manages the entire stack.',
    link: null,
    image: null,
    techs: ['Vue 3', 'Node.js', 'Tailwind', 'WebSocket'],
    github: null,
    category: 'ai',
    featured: true
  },
  {
    name: 'SwytchAI',
    description: 'AI-powered telecom switching platform.',
    link: null,
    image: null,
    techs: ['Vue 3', 'TypeScript', 'Node.js', 'AI/ML'],
    github: null,
    category: 'ai',
    featured: false
  },
  {
    name: 'TelcoOS',
    description: 'Desktop application for telecom operators. Rate deck management, carrier routing strategy, margin analysis, and operational tooling. Deployable as a desktop app or VPS instance.',
    link: null,
    image: null,
    techs: ['Vue 3', 'TypeScript', 'Node.js', 'Postgres', 'Electron'],
    github: null,
    category: 'product',
    featured: true
  },
  {
    name: 'VOIPAccelerator',
    description: 'Rate deck analysis and customization tool for VoIP carriers. Upload, compare, and optimize pricing structures across wholesale voice routes.',
    link: 'https://voipaccelerator.com',
    image: null,
    techs: ['Vue 3', 'TypeScript', 'Node.js', 'Postgres'],
    github: null,
    category: 'product',
    featured: true
  },
  // Web / Product Projects
  {
    name: 'GRHIIT',
    description: 'Fitness application with AI-powered content pipeline for research, drafting, and social distribution.',
    link: null,
    image: 'grhiit.png',
    techs: ['React', 'Tailwind', 'Node.js', 'Postgres', 'AI Pipeline'],
    github: 'https://github.com/kdjordan/grhiit',
    category: 'product',
    featured: true
  },
  {
    name: 'kevinjordan.dev',
    description: 'This portfolio. Built with Claude Code as a proof-of-concept for AI-assisted development.',
    link: 'https://kevinjordan.dev',
    image: null,
    techs: ['Nuxt 3', 'Tailwind', 'GSAP', 'Claude Code', 'Three.js'],
    github: 'https://github.com/kdjordan/portfolio',
    category: 'web',
    featured: false
  },
  {
    name: 'Ortiz Metals',
    description: 'Portfolio site for a metal artist. Custom SVG animations and scroll-driven storytelling.',
    link: 'https://ortizmetals.com/',
    image: 'rso.png',
    techs: ['Vue 3', 'GSAP', 'SVG', 'SCSS'],
    github: 'https://github.com/kdjordan/ortiz_v2',
    category: 'web',
    featured: false
  },
  {
    name: 'Eugene Sculpture Group',
    description: 'Website for an artist collective.',
    link: 'https://eugenesculpturegroup.com/',
    image: 'esg.png',
    techs: ['Vue 2', 'SCSS'],
    github: 'https://github.com/kdjordan/esgroup',
    category: 'web',
    featured: false
  },
  {
    name: 'Outbound Props',
    description: 'Housing development marketing site.',
    link: null,
    image: 'ob.png',
    techs: ['Vue 3', 'Tailwind'],
    github: 'https://github.com/kdjordan/outboundProps',
    category: 'web',
    featured: false
  },
  {
    name: 'Bothsides Construction',
    description: 'Construction company website.',
    link: 'https://www.bothsidesconstruction.com/',
    image: 'bsc.png',
    techs: ['WordPress'],
    github: null,
    category: 'web',
    featured: false
  },
]

export default projects
