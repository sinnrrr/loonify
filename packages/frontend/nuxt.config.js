export default {
  head: {
    title: 'Lost and Found of the Future | Loonify',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },

  loading: {
    color: '#6610f2',
    continious: true
  },

  css: [
    '@/assets/scss/global.scss'
  ],

  plugins: [
    '~/plugins/vue-formulate',
    '~/plugins/vue2-google-maps',
    '~/plugins/persistedState.client.js'
  ],

  components: true,

  buildModules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/google-fonts'
  ],

  modules: [
    'nuxt-buefy',
    'nuxt-fontawesome',
    'nuxt-breakpoints',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
  ],

  build: {
    transpile: [/^vue2-google-maps($|\/)/]
  },

  axios: {},

  auth: {
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'data.accessToken',
        },
        refreshToken: {
          property: 'data.refreshToken',
          data: 'refreshToken',
        },
        user: {
          property: 'data'
        },
        endpoints: {
          login: { url: '/api/v0/auth/login', method: 'post' },
          refresh: { url: '/api/v0/auth/refresh', method: 'post' },
          user: { url: '/api/v0/auth/user', method: 'get' },
          logout: { url: '/api/v0/auth/logout', method: 'post' }
        },
      }
    }
  },

  googleFonts: {
    families: {
      Rubik: [400, 500, 600, 700],
    }
  },

  buefy: {
    css: false,
    materialDesignIcons: false,
    defaultIconPack: 'fas',
    defaultIconComponent: 'font-awesome-icon'
  },

  breakpoints: {
    sm: 576,
    md: 768,
    lg: 1023,
    xl: 1215,
    options: {
      polyfill: true,
      throttle: 200
    }
  },

  fontawesome: {
    imports: [
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['fas']
      }
    ]
  },

  styleResources: {
    scss: [
      '@/assets/scss/global.scss',
    ]
  },
}
