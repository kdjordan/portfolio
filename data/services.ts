export interface Service {
  number: string
  title: string
  description: string
}

export const services: Service[] = [
  {
    number: '01',
    title: 'AI Agent Systems',
    description: 'Design and build autonomous agent architectures. Multi-model orchestration, persistent memory, tool integration, and production monitoring.'
  },
  {
    number: '02',
    title: 'AI Strategy',
    description: 'Help companies figure out where AI fits and where it doesn\'t. Practical roadmaps, not slide decks. Focus on implementation, not hype.'
  },
  {
    number: '03',
    title: 'Automation & Infrastructure',
    description: 'Build the pipelines, monitoring, and tooling that keep AI systems running in production. Health checks, failovers, and observability.'
  },
  {
    number: '04',
    title: 'Product Development',
    description: 'Full-stack product development from concept to production. Vue, React, Node, Postgres, AWS. Ship it, don\'t just plan it.'
  },
]
