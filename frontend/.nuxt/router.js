import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _4607a126 = () => interopDefault(import('../pages/about.vue' /* webpackChunkName: "pages/about" */))
const _16515b86 = () => interopDefault(import('../pages/account.vue' /* webpackChunkName: "pages/account" */))
const _0e84f662 = () => interopDefault(import('../pages/language.vue' /* webpackChunkName: "pages/language" */))
const _279dec1a = () => interopDefault(import('../pages/office.vue' /* webpackChunkName: "pages/office" */))
const _04224a42 = () => interopDefault(import('../pages/search.vue' /* webpackChunkName: "pages/search" */))
const _65bf7beb = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/about",
    component: _4607a126,
    name: "about"
  }, {
    path: "/account",
    component: _16515b86,
    name: "account"
  }, {
    path: "/language",
    component: _0e84f662,
    name: "language"
  }, {
    path: "/office",
    component: _279dec1a,
    name: "office"
  }, {
    path: "/search",
    component: _04224a42,
    name: "search"
  }, {
    path: "/",
    component: _65bf7beb,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
