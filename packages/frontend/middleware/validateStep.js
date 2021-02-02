export const validateStep = {
  data() {
    return {
      steps: Object
        .keys(this.$options.components)
        .map(key => {
          return this.$options.components[key]
        }),
    }
  },
  beforeCreate() {
    if (this.$route.params.step) {
      const key = Object
        .keys(this.$options.components)
        .indexOf(
          // capitalizing
          this.$route.params.step.charAt(0).toUpperCase() + this.$route.params.step.slice(1)
        )

      if (key >= 0) {
        // TODO; validate localStorage for having info
        this.activeStep = key
      } else {
        // TODO: handle 404
        this.$router.replace('/')
      }
    } else {
      this.$router.replace(this.$route.path + '/general')
    }
  }
}
