export default {
  ssr: false, // Sever side rendering
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'account-shop--front',
    htmlAttrs: {
      lang: 'vi',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/status-code'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/type-check',
    '~/plugins/axios',
    '~/plugins/vuelidate',
    '~/plugins/moment',
    '~/plugins/sanctum',
    '~/plugins/auth',
    '~/plugins/dynamic-config',
    '~/plugins/recharge-phonecard',
    '~/plugins/vue-datetime',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  // Used as fallback if no runtime config is provided
  axios: {
    host: process.env.API_PORT,
    port: process.env.API_PORT,
    prefix: process.env.API_PREFIX,
    credentials: true,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // Public config in runtime
  publicRuntimeConfig: {
    axios: {
      host: process.env.PUBLIC_API_PORT,
      port: process.env.PUBLIC_API_PORT,
      prefix: process.env.PUBLIC_API_PREFIX,
      credentials: true,
    },
  },

  // Private config
  privateRuntimeConfig: {
    axios: {
      host: process.env.PRIVATE_API_PORT,
      port: process.env.PRIVATE_API_PORT,
      prefix: process.env.PRIVATE_API_PREFIX,
      credentials: true,
    },
  },
};
