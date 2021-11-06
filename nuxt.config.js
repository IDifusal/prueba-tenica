export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'prueba-tecnica',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/static/styles.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: 'AIzaSyDG7WEY6kdFeWVLZOshDnivcGMiWX0F24w',
          authDomain: 'smart-doctor-a3652.firebaseapp.com',
          projectId: 'smart-doctor-a3652',
          storageBucket: 'smart-doctor-a3652.appspot.com',
          messagingSenderId: '499907840066',
          appId: '1:499907840066:web:a4cca542df1f7dfa6205db',
        },
        firestore: {
          memoryOnly: false, // default
          chunkName:
            process.env.NODE_ENV !== 'production' ? 'firebase-auth' : '[id]', // default
          enablePersistence: true,
          emulatorPort: 8080,
          emulatorHost: 'localhost',
          settings: {
            // Firestore Settings - currently only works in SPA mode
          },
        },
        auth: {
          persistence: 'local', // default
          initialize: {
            onAuthStateChangedMutation: 'ON_AUTH_STATE_CHANGED_MUTATION',
            onAuthStateChangedAction: 'onAuthStateChangedAction',
            subscribeManually: false,
          },
          ssr: false, // default
          emulatorPort: 9099,
          emulatorHost: 'http://localhost',
        },
        services: {
          auth: true,
          firestore: true,
          functions: true,
          storage: true,
          database: true,
        },
      },
    ],
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
