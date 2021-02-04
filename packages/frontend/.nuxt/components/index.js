export { default as Steps } from '../../components/Steps.vue'
export { default as Earth } from '../../components/index/Earth.vue'
export { default as Meteorites } from '../../components/index/Meteorites.vue'
export { default as MarkerButton } from '../../components/maps/MarkerButton.vue'
export { default as Header } from '../../components/shared/Header.vue'
export { default as Category } from '../../components/steps/Category.vue'
export { default as General } from '../../components/steps/General.vue'
export { default as Location } from '../../components/steps/Location.vue'
export { default as Review } from '../../components/steps/Review.vue'
export { default as Type } from '../../components/steps/Type.vue'

export const LazySteps = import('../../components/Steps.vue' /* webpackChunkName: "components/steps" */).then(c => c.default || c)
export const LazyEarth = import('../../components/index/Earth.vue' /* webpackChunkName: "components/earth" */).then(c => c.default || c)
export const LazyMeteorites = import('../../components/index/Meteorites.vue' /* webpackChunkName: "components/meteorites" */).then(c => c.default || c)
export const LazyMarkerButton = import('../../components/maps/MarkerButton.vue' /* webpackChunkName: "components/marker-button" */).then(c => c.default || c)
export const LazyHeader = import('../../components/shared/Header.vue' /* webpackChunkName: "components/header" */).then(c => c.default || c)
export const LazyCategory = import('../../components/steps/Category.vue' /* webpackChunkName: "components/category" */).then(c => c.default || c)
export const LazyGeneral = import('../../components/steps/General.vue' /* webpackChunkName: "components/general" */).then(c => c.default || c)
export const LazyLocation = import('../../components/steps/Location.vue' /* webpackChunkName: "components/location" */).then(c => c.default || c)
export const LazyReview = import('../../components/steps/Review.vue' /* webpackChunkName: "components/review" */).then(c => c.default || c)
export const LazyType = import('../../components/steps/Type.vue' /* webpackChunkName: "components/type" */).then(c => c.default || c)
