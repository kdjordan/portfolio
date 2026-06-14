// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  ssr: true,
  routeRules: {
    '/work': { redirect: { to: '/#work', statusCode: 301 } },
    '/work/': { redirect: { to: '/#work', statusCode: 301 } },
    // Keep marketing pages prerendered to static HTML so crawlable
    // output is identical to the old Amplify build. Everything else is
    // served by the Node server.
    '/': { prerender: true },
    '/blog/**': { prerender: true },
    '/admin': { prerender: false },
    '/admin/**': { prerender: false },
    '/api/admin/**': { prerender: false }
  },
  nitro: {
    preset: 'node-server',
    prerender: {
      // Crawl from '/' to discover and prerender the blog index and
      // every post at build time (same coverage as the old SSG bundle).
      crawlLinks: true,
      routes: ['/']
    }
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    '@nuxtjs/sitemap'
  ],

  site: {
    url: 'https://kevinjordan.dev',
  },

  app: {
    head: {
      title: 'Kevin Jordan - Technical Founder, Operator',
      htmlAttrs: {
        lang: 'en',
        style: 'background-color: #f1ede3'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
        { name: 'theme-color', content: '#f1ede3' },
        { name: 'description', content: 'Kevin Jordan builds AI systems and operator tools that survive real work. KDJORDAN LLC - Pacific Northwest.' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg?v=2' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon.png?v=2' },
        { rel: 'shortcut icon', href: '/favicon.ico?v=2' },
        { rel: 'alternate icon', type: 'image/png', href: '/image/favicon.png?v=2' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600&family=IBM+Plex+Sans+Condensed:wght@400;500;600;700&family=IBM+Plex+Serif:ital,wght@0,400;0,500;1,400;1,500&display=swap'
        }
      ]
    }
  },

  css: [
    '~/assets/css/main.css'
  ],

  content: {
    highlight: {
      theme: 'github-dark'
    }
  },

  compatibilityDate: '2024-11-01'
})
