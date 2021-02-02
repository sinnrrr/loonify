export const state = () => ({
  type: 'lost' | 'found' | 'theft',
  places: {
    markers: [],
    rectangles: [],
    circles: [],
    polygons: []
  },
  categoryId: 0,
  general: {},
  form: {
    activeStep: 0,
    navigationDisabled: true,
  }
})

export const getters = {
  type: state => state.type,
  markers: state => state.places.markers,
  formActiveStep: state => state.form.activeStep,
  formNavigationDisabled: state => state.form.navigationDisabled
}

export const mutations = {
  setType: (state, type) => state.type = type,
  setGeneral: (state, value) => state.general = value,
  setCategoryId: (state, categoryId) => state.categoryId = categoryId,
  addMarker: ({ places }, marker) => places.markers.push(marker),
  removeMarker: ({ places }, marker) => places.markers.splice(marker),
  addRectangle: ({ places }, rectangle) => places.markers.push(rectangle),
  removeRectangle: ({ places }, rectangle) => places.markers.splice(rectangle),
  addCircles: ({ places }, circle) => places.markers.push(circle),
  removeCircles: ({ places }, circle) => places.markers.splice(circle),
  addPolygon: ({ places }, polygon) => places.markers.push(polygon),
  removePolygon: ({ places }, polygon) => places.markers.splice(polygon),
  setFormActiveStep: ({ form }, step) => form.activeStep = step,
  enableFormNavigation: ({ form }) => form.navigationDisabled = false,
  disableFormNavigation: ({ form }) => form.navigationDisabled = true
}
