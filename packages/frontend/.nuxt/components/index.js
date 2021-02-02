export { default as Category } from '../../components/Category.vue'
export { default as Control } from '../../components/Control.vue'
export { default as Earth } from '../../components/Earth.vue'
export { default as General } from '../../components/General.vue'
export { default as Header } from '../../components/Header.vue'
export { default as Location } from '../../components/Location.vue'
export { default as Meteorites } from '../../components/Meteorites.vue'
export { default as Review } from '../../components/Review.vue'
export { default as Steps } from '../../components/Steps.vue'
export { default as Type } from '../../components/Type.vue'

export const LazyCategory = import('../../components/Category.vue' /* webpackChunkName: "components/category" */).then(c => c.default || c)
export const LazyControl = import('../../components/Control.vue' /* webpackChunkName: "components/control" */).then(c => c.default || c)
export const LazyEarth = import('../../components/Earth.vue' /* webpackChunkName: "components/earth" */).then(c => c.default || c)
export const LazyGeneral = import('../../components/General.vue' /* webpackChunkName: "components/general" */).then(c => c.default || c)
export const LazyHeader = import('../../components/Header.vue' /* webpackChunkName: "components/header" */).then(c => c.default || c)
export const LazyLocation = import('../../components/Location.vue' /* webpackChunkName: "components/location" */).then(c => c.default || c)
export const LazyMeteorites = import('../../components/Meteorites.vue' /* webpackChunkName: "components/meteorites" */).then(c => c.default || c)
export const LazyReview = import('../../components/Review.vue' /* webpackChunkName: "components/review" */).then(c => c.default || c)
export const LazySteps = import('../../components/Steps.vue' /* webpackChunkName: "components/steps" */).then(c => c.default || c)
export const LazyType = import('../../components/Type.vue' /* webpackChunkName: "components/type" */).then(c => c.default || c)
