export interface Project {
  name: string
  description: string
  link: string | null
  image: string | null
  imagePosition?: string
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
    image: 'zoe.png',
    imagePosition: 'left top',
    techs: ['Vue 3', 'Node.js', 'Tailwind', 'WebSocket'],
    github: null,
    category: 'ai',
    featured: true
  },
  {
    name: 'TelcoOS',
    description: 'Customer-hosted AI operator workspace with streamed sessions, persistent history, per-customer storage, and a browser terminal.',
    link: 'https://telcoos.io',
    image: null,
    techs: ['React 18', 'Express', 'SQLite', 'Hetzner'],
    github: null,
    category: 'ai',
    featured: true
  },
  {
    name: 'CDRCheck',
    description: 'Professional-grade billing reconciliation for telecom carriers. Identify billing discrepancies in seconds across wholesale voice routes.',
    link: null,
    image: 'cdrcheck.png',
    imagePosition: 'center top',
    techs: ['Next.js', 'TypeScript', 'SQLite', 'Coolify'],
    github: 'https://github.com/kdjordan',
    category: 'product',
    featured: true
  },
  {
    name: 'VOIPAccelerator',
    description: 'Rate deck analysis and customization tool for VoIP carriers. Upload, compare, and optimize pricing structures across wholesale voice routes.',
    link: 'https://voipaccelerator.com',
    image: 'vaccelerator.png',
    imagePosition: 'left top',
    techs: ['Vue 3', 'Hono', 'Postgres', 'Hetzner'],
    github: null,
    category: 'product',
    featured: true
  },
  // Web / Product Projects
  {
    name: 'GRHIIT',
    description: 'iOS fitness app with AI-powered content pipeline for research, drafting, and social distribution.',
    link: null,
    image: null,
    techs: ['Swift', 'iOS'],
    github: 'https://github.com/kdjordan',
    category: 'product',
    featured: true
  },
  {
    name: 'kevinjordan.dev',
    description: 'This portfolio. Built with Claude Code as a proof-of-concept for AI-assisted development.',
    link: 'https://kevinjordan.dev',
    image: null,
    techs: ['Nuxt 3', 'Tailwind', 'GSAP', 'Claude Code'],
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
    name: 'Outbound Props',
    description: 'Housing development marketing site.',
    link: 'https://outboundprops.com/',
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
