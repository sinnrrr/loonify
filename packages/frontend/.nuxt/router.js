import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _1ed51616 = () => interopDefault(import('../pages/about.vue' /* webpackChunkName: "pages/about" */))
const _a19bab0e = () => interopDefault(import('../pages/account/index.vue' /* webpackChunkName: "pages/account/index" */))
const _27df2b46 = () => interopDefault(import('../pages/office/index.vue' /* webpackChunkName: "pages/office/index" */))
const _78d9cd90 = () => interopDefault(import('../pages/account/login.vue' /* webpackChunkName: "pages/account/login" */))
const _64252268 = () => interopDefault(import('../pages/account/settings.vue' /* webpackChunkName: "pages/account/settings" */))
const _228c5cfe = () => interopDefault(import('../pages/account/signup.vue' /* webpackChunkName: "pages/account/signup" */))
const _72c77746 = () => interopDefault(import('../pages/office/edit.vue' /* webpackChunkName: "pages/office/edit" */))
const _3e8cf0db = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _1b81ca35 = () => interopDefault(import('../pages/index/login.vue' /* webpackChunkName: "pages/index/login" */))
const _bddd2d08 = () => interopDefault(import('../pages/index/signup.vue' /* webpackChunkName: "pages/index/signup" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/about",
    component: _1ed51616,
    name: "about"
  }, {
    path: "/account",
    component: _a19bab0e,
    name: "account"
  }, {
    path: "/office",
    component: _27df2b46,
    name: "office"
  }, {
    path: "/account/login",
    component: _78d9cd90,
    name: "account-login"
  }, {
    path: "/account/settings",
    component: _64252268,
    name: "account-settings"
  }, {
    path: "/account/signup",
    component: _228c5cfe,
    name: "account-signup"
  }, {
    path: "/office/edit",
    component: _72c77746,
    name: "office-edit"
  }, {
    path: "/",
    component: _3e8cf0db,
    name: "index",
    children: [{
      path: "login",
      component: _1b81ca35,
      name: "index-login"
    }, {
      path: "signup",
      component: _bddd2d08,
      name: "index-signup"
    }]
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decode(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}
