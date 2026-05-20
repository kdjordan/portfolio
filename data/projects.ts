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
  {
    name: 'MockDeskAI',
    description: 'AI-powered design-to-proof automation for decorated apparel. Reps upload a PSD or image, paint masks over the regions they want changed, describe edits in plain text, and generate pixel-accurate proof variants through provider-agnostic inpainting. The product ships as a signed Electron desktop app with a sibling webapp at mockdeskai.com.',
    link: 'https://mockdeskai.com',
    image: null,
    techs: ['Electron', 'React 19', 'TypeScript', 'Fastify', 'Drizzle', 'SQLite', 'Claude', 'Ideogram', 'GPT-Image 2', 'Sharp'],
    github: null,
    category: 'product',
    featured: true
  },
]

export default projects
