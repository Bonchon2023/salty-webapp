// nuxt.config.ts
export default defineNuxtConfig({
  srcDir: 'app/',
  dir: {
    public: 'app/public'
  },
  css: ['~/assets/css/main.css'],
  
  app: {
    head: {
      title: 'SALTY',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
      // ลบ script: [...] ของ ionicons ออกจากตรงนี้ได้เลย
    }
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith('ion-')
    }
  },

  compatibilityDate: '2025-02-21'
})