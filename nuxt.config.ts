// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['nuxt-cron', '@nuxtjs/tailwindcss'],
  cron: {
    runOnInit: true,
    jobsDir: 'cron'
  },
  tailwindcss: {
    exposeConfig: true,
  },
  runtimeConfig: {
    statsPath: undefined,
    dbPath: undefined,
  },
  css: ['~/styles/global.css']
})