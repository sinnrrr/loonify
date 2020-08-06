<template>
  <section class="about">
    asdasdas
  </section>
</template>

<script>
  export default {
    name: "about",
    transition(to, from) {
      if (to.name === "about") {
        return {name: 'slide-to-bottom'}
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
