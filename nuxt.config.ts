// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  ssr: true,
  nitro: {
    preset: 'static',
    prerender: {
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
        { rel: 'icon', type: 'image/png', href: '/image/favicon.png' },
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
