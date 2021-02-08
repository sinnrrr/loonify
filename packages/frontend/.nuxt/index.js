import Vue from 'vue'
import Vuex from 'vuex'
import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from './components/nuxt-error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'
import { createStore } from './store.js'

/* Plugins */

import nuxt_plugin_plugin_25e9d4cd from 'nuxt_plugin_plugin_25e9d4cd' // Source: ./components/plugin.js (mode: 'all')
import nuxt_plugin_axios_0c19e93a from 'nuxt_plugin_axios_0c19e93a' // Source: ./axios.js (mode: 'all')
import nuxt_plugin_nuxtbreakpoints_7bd0d13d from 'nuxt_plugin_nuxtbreakpoints_7bd0d13d' // Source: ./nuxt-breakpoints.js (mode: 'all')
import nuxt_plugin_templatesplugin3d717680_2499ef9e from 'nuxt_plugin_templatesplugin3d717680_2499ef9e' // Source: ./templates.plugin.3d717680.js (mode: 'all')
import nuxt_plugin_buefy_885bea98 from 'nuxt_plugin_buefy_885bea98' // Source: ./buefy.js (mode: 'all')
import nuxt_plugin_vueformulate_7bd14f1a from 'nuxt_plugin_vueformulate_7bd14f1a' // Source: ../plugins/vue-formulate (mode: 'all')
import nuxt_plugin_vue2googlemaps_94a82780 from 'nuxt_plugin_vue2googlemaps_94a82780' // Source: ../plugins/vue2-google-maps (mode: 'all')
import nuxt_plugin_vuehtml2pdfclient_948a6f34 from 'nuxt_plugin_vuehtml2pdfclient_948a6f34' // Source: ../plugins/vue-html2pdf.client.js (mode: 'client')
import nuxt_plugin_persistedStateclient_3b127e9c from 'nuxt_plugin_persistedStateclient_3b127e9c' // Source: ../plugins/persistedState.client.js (mode: 'client')
import nuxt_plugin_auth_3affb526 from 'nuxt_plugin_auth_3affb526' // Source: ./auth.js (mode: 'all')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Object.defineProperty(Vue.prototype, '$nuxt', {
  get() {
    return this.$root.$options.$nuxt
  },
  configurable: true
})

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":false,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

const originalRegisterModule = Vuex.Store.prototype.registerModule
const baseStoreOptions = { preserveState: process.client }

function registerModule (path, rawModule, options = {}) {
  return originalRegisterModule.call(this, path, rawModule, { ...baseStoreOptions, ...options })
}

async function createApp(ssrContext, config = {}) {
  const router = await createRouter(ssrContext)

  const store = createStore(ssrContext)
  // Add this.$router into store actions/mutations
  store.$router = router

  // Fix SSR caveat https://github.com/nuxt/nuxt.js/issues/3757#issuecomment-414689141
  store.registerModule = registerModule

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {"title":"Lost and Found of the Future | Loonify","htmlAttrs":{"lang":"en"},"meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"hid":"description","name":"description","content":""}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Ffavicon.ico"},{"hid":"gf-prefetch","rel":"dns-prefetch","href":"https:\u002F\u002Ffonts.gstatic.com\u002F"},{"hid":"gf-preconnect","rel":"preconnect","href":"https:\u002F\u002Ffonts.gstatic.com\u002F","crossorigin":""},{"hid":"gf-preload","rel":"preload","as":"style","href":"https:\u002F\u002Ffonts.googleapis.com\u002Fcss2?family=Rubik:wght@400;500;600;700"}],"style":[],"script":[{"hid":"gf-script","innerHTML":"(function (){var l=document.createElement('link');l.rel=\"stylesheet\";l.href=\"https:\u002F\u002Ffonts.googleapis.com\u002Fcss2?family=Rubik:wght@400;500;600;700\";document.querySelector(\"head\").appendChild(l);})();"}],"noscript":[{"hid":"gf-noscript","innerHTML":"\u003Clink rel=\"stylesheet\" href=\"https:\u002F\u002Ffonts.googleapis.com\u002Fcss2?family=Rubik:wght@400;500;600;700\"\u003E"}],"__dangerouslyDisableSanitizersByTagID":{"gf-script":["innerHTML"],"gf-noscript":["innerHTML"]}},

    store,
    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  // Make app available into store via this.app
  store.app = app

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    store,
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  })

  function inject(key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value
    // Add into context
    if (!app.context[key]) {
      app.context[key] = value
    }

    // Add into store
    store[key] = app[key]

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue.prototype, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  // Inject runtime config as $config
  inject('config', config)

  if (process.client) {
    // Replace store state before plugins execution
    if (window.__NUXT__ && window.__NUXT__.state) {
      store.replaceState(window.__NUXT__.state)
    }
  }

  // Add enablePreview(previewData = {}) in context for plugins
  if (process.static && process.client) {
    app.context.enablePreview = function (previewData = {}) {
      app.previewData = Object.assign({}, previewData)
      inject('preview', previewData)
    }
  }
  // Plugin execution

  if (typeof nuxt_plugin_plugin_25e9d4cd === 'function') {
    await nuxt_plugin_plugin_25e9d4cd(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_0c19e93a === 'function') {
    await nuxt_plugin_axios_0c19e93a(app.context, inject)
  }

  if (typeof nuxt_plugin_nuxtbreakpoints_7bd0d13d === 'function') {
    await nuxt_plugin_nuxtbreakpoints_7bd0d13d(app.context, inject)
  }

  if (typeof nuxt_plugin_templatesplugin3d717680_2499ef9e === 'function') {
    await nuxt_plugin_templatesplugin3d717680_2499ef9e(app.context, inject)
  }

  if (typeof nuxt_plugin_buefy_885bea98 === 'function') {
    await nuxt_plugin_buefy_885bea98(app.context, inject)
  }

  if (typeof nuxt_plugin_vueformulate_7bd14f1a === 'function') {
    await nuxt_plugin_vueformulate_7bd14f1a(app.context, inject)
  }

  if (typeof nuxt_plugin_vue2googlemaps_94a82780 === 'function') {
    await nuxt_plugin_vue2googlemaps_94a82780(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vuehtml2pdfclient_948a6f34 === 'function') {
    await nuxt_plugin_vuehtml2pdfclient_948a6f34(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_persistedStateclient_3b127e9c === 'function') {
    await nuxt_plugin_persistedStateclient_3b127e9c(app.context, inject)
  }

  if (typeof nuxt_plugin_auth_3affb526 === 'function') {
    await nuxt_plugin_auth_3affb526(app.context, inject)
  }

  // Lock enablePreview in context
  if (process.static && process.client) {
    app.context.enablePreview = function () {
      console.warn('You cannot call enablePreview() outside a plugin.')
    }
  }

  // If server-side, wait for async component to be resolved first
  if (process.server && ssrContext && ssrContext.url) {
    await new Promise((resolve, reject) => {
      router.push(ssrContext.url, resolve, (err) => {
        // https://github.com/vuejs/vue-router/blob/v3.4.3/src/util/errors.js
        if (!err._isRouter) return reject(err)
        if (err.type !== 2 /* NavigationFailureType.redirected */) return resolve()

        // navigated to a different route in router guard
        const unregister = router.afterEach(async (to, from) => {
          ssrContext.url = to.fullPath
          app.context.route = await getRouteData(to)
          app.context.params = to.params || {}
          app.context.query = to.query || {}
          unregister()
          resolve()
        })
      })
    })
  }

  return {
    store,
    app,
    router
  }
}

export { createApp, NuxtError }
