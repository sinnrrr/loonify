<template>
  <section class="about">
    asdasdas
  </section></template>

<script>
  export default {
    name: "account",
    transition(to, from) {
      if (to.name === "account") {
        return {name: 'slide-to-left'}
      } else {
        return to.params.animation
      }
    }
  }
</script>

<style scoped>
  section.about {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
</style>
