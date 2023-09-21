// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@vueuse/nuxt', 'nuxt-icon'],
  generate:{
    nojekyll: true
  },
  ssr: false,
  target: "static",
})