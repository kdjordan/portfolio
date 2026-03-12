// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

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
      title: 'Kevin Jordan — Technical Founder & Builder',
      htmlAttrs: {
        lang: 'en',
        style: 'background-color: #050505'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
        { name: 'theme-color', content: '#050505' },
        { name: 'description', content: 'Kevin Jordan — Technical founder, builder, and AI systems engineer. 25+ years shipping products, scaling companies, and building autonomous agent systems.' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/image/favicon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap'
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
