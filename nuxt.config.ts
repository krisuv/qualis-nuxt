// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from "node:url";
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/image', '@nuxt/eslint'],
  image: {
    staticFilename: '[name]-[hash][ext]'
  },
  nitro: {
    prerender: {
      crawlLinks: false,
      ignore: ['/blur']
    },
    // Add security headers
    routeRules: {
      '/**': {
        headers: {
          'X-Frame-Options': 'SAMEORIGIN',
          'X-Content-Type-Options': 'nosniff',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
          'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
        }
      }
    }
  },
  // ssr: false, // SSR is now enabled with ClientOnly components
  components: [
    {
      path: '~/app/components',
      pathPrefix: false,
    }
  ],
  css: ['./app/assets/css/main.css', './app/assets/css/tailwind.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL || 'http://localhost:1337',
      recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY,
      siteUrl: process.env.PROD_URL || 'http://localhost:3000',
    },
    // Private config (server-side only)
    emailHost: process.env.EMAIL_HOST,
    emailPort: process.env.EMAIL_PORT || String(587),
    emailSecure: process.env.EMAIL_SECURE === 'true',
    emailUser: process.env.EMAIL_USER,
    emailPassword: process.env.EMAIL_PASSWORD,
    emailTo: process.env.EMAIL_TO,
  },
  plugins: [
    './app/plugins/vue-recaptcha.plugin'
  ],
  alias: {
    'constants': fileURLToPath(new URL('./app/utils/constants', import.meta.url)),
    'api': fileURLToPath(new URL('./app/utils/api', import.meta.url)),
    'helpers': fileURLToPath(new URL('./app/utils/helpers', import.meta.url)),
    'types': fileURLToPath(new URL('./app/utils/types', import.meta.url)),
  },
  app: {
    head: {
      title: 'Meble Qualis Pyrzyce - Meble na wymiar stolarz z Pyrzyc',
      htmlAttrs: {
        lang: 'pl'
      },
      link: [
        { rel: 'canonical', href: process.env.PROD_URL || 'http://localhost:3000' }
      ],
      meta: [
        { 
          name: 'description', 
          content: 'Tworzę meble na wymiar dopasowane do Twojego wnętrza i stylu życia. Profesjonalny stolarz z Pyrzyc - meble kuchenne, szafy, sypialnie. Piotr Domański - Qualis.' 
        },
        { name: 'keywords', content: 'stolarz pyrzyce, meble na wymiar, meble na wymiar pyrzyce, meble na wymiar szczecin, meble na wymiar zachodniopomorskie, meble kuchenne pyrzyce, stolarz artysta pyrzyce, meble artystyczne, custom furniture pyrzyce' },
        { name: 'author', content: 'Krzysztof Bujalski' },
        // Open Graph meta tags
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Meble Qualis Pyrzyce - Meble na wymiar' },
        { property: 'og:description', content: 'Tworzę meble na wymiar dopasowane do Twojego wnętrza i stylu życia. Profesjonalny stolarz z Pyrzyc.' },
        { property: 'og:url', content: process.env.PROD_URL || 'http://localhost:3000' },
        { property: 'og:image', content: `${process.env.PROD_URL || 'http://localhost:3000'}/img/hero-1.jpg` },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'Meble na wymiar Pyrzyce - Qualis' },
        { property: 'og:locale', content: 'pl_PL' },
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Meble Qualis Pyrzyce - Meble na wymiar' },
        { name: 'twitter:description', content: 'Tworzę meble na wymiar dopasowane do Twojego wnętrza i stylu życia. Profesjonalny stolarz z Pyrzyc.' },
        { name: 'twitter:image', content: `${process.env.PROD_URL || 'http://localhost:3000'}/img/hero-1.jpg` },
        // Robots
        { name: 'robots', content: 'index, follow' },
        // Application
        { name: "application-name", content: 'Meble Qualis Pyrzyce' },
      ]
    }
  }
})