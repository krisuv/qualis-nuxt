// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from "node:url";
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/image', '@nuxt/eslint'],
  nitro: {
    prerender: {
      crawlLinks: false
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
    }
  },
  plugins: [
    './app/plugins/vue-recaptcha.plugin'
  ],
  alias: {
    'constants': fileURLToPath(new URL('./app/utils/constants', import.meta.url)),
    'api': fileURLToPath(new URL('./app/utils/api', import.meta.url)),
    'helpers': fileURLToPath(new URL('./app/utils/helpers', import.meta.url)),
    'types': fileURLToPath(new URL('./app/utils/types', import.meta.url)),
  }
})