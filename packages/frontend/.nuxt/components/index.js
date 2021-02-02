export { default as Earth } from '../../components/layout/Earth.vue'
export { default as Meteorites } from '../../components/layout/Meteorites.vue'
export { default as Category } from '../../components/steps/Category.vue'
export { default as General } from '../../components/steps/General.vue'
export { default as Location } from '../../components/steps/Location.vue'
export { default as Review } from '../../components/steps/Review.vue'
export { default as Type } from '../../components/steps/Type.vue'
export { default as Control } from '../../components/layout/maps/Control.vue'
export { default as Header } from '../../components/layout/shared/Header.vue'
export { default as Steps } from '../../components/layout/shared/Steps.vue'

export const LazyEarth = import('../../components/layout/Earth.vue' /* webpackChunkName: "components/earth" */).then(c => c.default || c)
export const LazyMeteorites = import('../../components/layout/Meteorites.vue' /* webpackChunkName: "components/meteorites" */).then(c => c.default || c)
export const LazyCategory = import('../../components/steps/Category.vue' /* webpackChunkName: "components/category" */).then(c => c.default || c)
export const LazyGeneral = import('../../components/steps/General.vue' /* webpackChunkName: "components/general" */).then(c => c.default || c)
export const LazyLocation = import('../../components/steps/Location.vue' /* webpackChunkName: "components/location" */).then(c => c.default || c)
export const LazyReview = import('../../components/steps/Review.vue' /* webpackChunkName: "components/review" */).then(c => c.default || c)
export const LazyType = import('../../components/steps/Type.vue' /* webpackChunkName: "components/type" */).then(c => c.default || c)
export const LazyControl = import('../../components/layout/maps/Control.vue' /* webpackChunkName: "components/control" */).then(c => c.default || c)
export const LazyHeader = import('../../components/layout/shared/Header.vue' /* webpackChunkName: "components/header" */).then(c => c.default || c)
export const LazySteps = import('../../components/layout/shared/Steps.vue' /* webpackChunkName: "components/steps" */).then(c => c.default || c)
