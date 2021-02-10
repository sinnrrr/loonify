export { default as AuthForm } from '../../components/AuthForm.vue'
export { default as AuthModal } from '../../components/AuthModal.vue'
export { default as CategoryStep } from '../../components/CategoryStep.vue'
export { default as Earth } from '../../components/Earth.vue'
export { default as GeneralStep } from '../../components/GeneralStep.vue'
export { default as Header } from '../../components/Header.vue'
export { default as LocationStep } from '../../components/LocationStep.vue'
export { default as MapCircleControl } from '../../components/MapCircleControl.vue'
export { default as MapMarkerControl } from '../../components/MapMarkerControl.vue'
export { default as MapSidebarButton } from '../../components/MapSidebarButton.vue'
export { default as Meteorites } from '../../components/Meteorites.vue'
export { default as OfflinePost } from '../../components/OfflinePost.vue'
export { default as ReviewStep } from '../../components/ReviewStep.vue'
export { default as Sidebar } from '../../components/Sidebar.vue'
export { default as Steps } from '../../components/Steps.vue'
export { default as TypeStep } from '../../components/TypeStep.vue'

export const LazyAuthForm = import('../../components/AuthForm.vue' /* webpackChunkName: "components/auth-form" */).then(c => c.default || c)
export const LazyAuthModal = import('../../components/AuthModal.vue' /* webpackChunkName: "components/auth-modal" */).then(c => c.default || c)
export const LazyCategoryStep = import('../../components/CategoryStep.vue' /* webpackChunkName: "components/category-step" */).then(c => c.default || c)
export const LazyEarth = import('../../components/Earth.vue' /* webpackChunkName: "components/earth" */).then(c => c.default || c)
export const LazyGeneralStep = import('../../components/GeneralStep.vue' /* webpackChunkName: "components/general-step" */).then(c => c.default || c)
export const LazyHeader = import('../../components/Header.vue' /* webpackChunkName: "components/header" */).then(c => c.default || c)
export const LazyLocationStep = import('../../components/LocationStep.vue' /* webpackChunkName: "components/location-step" */).then(c => c.default || c)
export const LazyMapCircleControl = import('../../components/MapCircleControl.vue' /* webpackChunkName: "components/map-circle-control" */).then(c => c.default || c)
export const LazyMapMarkerControl = import('../../components/MapMarkerControl.vue' /* webpackChunkName: "components/map-marker-control" */).then(c => c.default || c)
export const LazyMapSidebarButton = import('../../components/MapSidebarButton.vue' /* webpackChunkName: "components/map-sidebar-button" */).then(c => c.default || c)
export const LazyMeteorites = import('../../components/Meteorites.vue' /* webpackChunkName: "components/meteorites" */).then(c => c.default || c)
export const LazyOfflinePost = import('../../components/OfflinePost.vue' /* webpackChunkName: "components/offline-post" */).then(c => c.default || c)
export const LazyReviewStep = import('../../components/ReviewStep.vue' /* webpackChunkName: "components/review-step" */).then(c => c.default || c)
export const LazySidebar = import('../../components/Sidebar.vue' /* webpackChunkName: "components/sidebar" */).then(c => c.default || c)
export const LazySteps = import('../../components/Steps.vue' /* webpackChunkName: "components/steps" */).then(c => c.default || c)
export const LazyTypeStep = import('../../components/TypeStep.vue' /* webpackChunkName: "components/type-step" */).then(c => c.default || c)
