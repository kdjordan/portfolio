export interface Job {
  employer: string
  title: string
  brief: string
  dates: string
  highlights: string[]
}

export const jobs: Job[] = [
  {
    employer: 'BTS',
    title: 'Director US Domestic',
    brief: 'Leading U.S. operations for one of the largest wholesale VoIP carriers. Building internal tools for rate analysis, routing optimization, and carrier strategy.',
    dates: 'Sep 2025 -- Present',
    highlights: [
      'Enhanced infrastructure utilization, achieving a 50% reduction in overhead costs.',
      'Developed a tax reporting system that decreased staff hours by 25%.',
      'Coordinated projects between 3 international teams.',
      'Designed and developed a customer payment portal.'
    ]
  },
  {
    employer: 'V-Tell',
    title: 'VP Wholesale Services',
    brief: 'Managed wholesale voice operations, vendor relationships, and technical infrastructure for a mid-market telecom carrier.',
    dates: '2019 -- Sep 2025',
    highlights: [
      'Enhanced infrastructure utilization, achieving a 50% reduction in overhead costs.',
      'Developed a tax reporting system that decreased staff hours by 25%.',
      'Coordinated projects between 3 international teams.',
      'Designed and developed a customer payment portal.'
    ]
  },
  {
    employer: 'NW Straps',
    title: 'Founder / Dev',
    brief: 'Built a consumer products company from zero to $1M in revenue. Handled everything from product design and manufacturing to e-commerce and fulfillment.',
    dates: '2016 -- 2018',
    highlights: [
      'Conceived and executed a comprehensive business plan.',
      'Developed and launched the initial product line.',
      'Grew the business from inception to $1 million in gross revenue.'
    ]
  },
  {
    employer: '3Charm',
    title: 'Founder / Dev',
    brief: 'Created a streaming sales platform that generated $2M annually. Directed the first streaming virtual trade show, producing $300K in sales over four days.',
    dates: '2012 -- 2015',
    highlights: [
      'Developed an e-commerce website producing $15K/month.',
      'Built a streaming sales platform generating $2 million annually.',
      'Directed the first streaming virtual trade show, resulting in $300K in sales over four days.'
    ]
  },
  {
    employer: 'Tabata Project',
    title: 'Dev / Coach',
    brief: 'Built the web presence and digital product catalog for a fitness brand. Drove a 300% increase in revenue.',
    dates: '2010 -- 2012',
    highlights: [
      'Designed and launched an original web presence.',
      'Created and maintained a catalog of digital workout products.',
      'Drove a 300% increase in revenue.'
    ]
  },
  {
    employer: 'Fired Glass Company',
    title: 'Founder / Dev',
    brief: 'Established and led a 25-person artist co-op for a decade. Managed operations, production, and logistics.',
    dates: '2000 -- 2010',
    highlights: [
      'Established and led an artist co-op, managing 25 individuals.',
      'Handled operations, accounting, and daily logistics.',
      'Supervised production and managed shipping.'
    ]
  },
  {
    employer: 'Catalogfinder',
    title: 'Lead Dev',
    brief: 'Hired and managed an engineering team. Built the software projects that initially funded the company.',
    dates: '1998 -- 2000',
    highlights: [
      'Hired and managed a small engineering team.',
      'Built software projects that initially funded the company.'
    ]
  },
]
