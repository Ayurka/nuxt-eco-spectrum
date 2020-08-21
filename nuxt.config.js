module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'eco-spectrum',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: {
    color: '#9EEA6A',
    height: '2px'
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    vendor: ['axios']
  },
  plugins: [
    { src: '~/plugins/uikit', ssr: false },
    { src: '~/plugins/global', ssr: true },
    { src: '~/plugins/message', ssr: false },
    { src: '~/plugins/fragment', ssr: false },
    { src: '~/plugins/vuelidate', ssr: true },
    { src: '~/plugins/mask', ssr: false }
  ],
  css: [
    'uikit/dist/css/uikit.min.css',
    '~/assets/css/main.scss',
  ],
  modules: [
    ['nuxt-vuex-localstorage', {
      mode: 'debug',
      localStorage: ['cart']
    }],
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],
  auth: {
    token: {
      prefix: '_token.'
    },
    strategies: {
      local: {
        endpoints: {
          login: { url: '/auth/login', method: 'post', propertyName: 'token' },
          logout: { url: '/auth/logout', method: 'post' },
          user: { url: '/auth/user', method: 'get', propertyName: 'data' }
        },
        globalToken: true,
      }
    },
    redirect: {
      login: '/login',
      logout: '/login',
      home: '/'
    }
  },
  axios: {
    baseURL: 'https://api.eco-spectrum.ru/api'
  },
}

