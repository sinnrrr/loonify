<template>
  <section class="about">
    asdasdas Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius, odit, porro. Accusantium adipisci alias aliquid animi aspernatur consequatur dicta, enim eos fuga ipsa iusto natus, neque, quasi reiciendis similique sit?
  </section>
</template>

<script>

  export default {
    name: "language",
    transition(to, from) {
      if (to.name === "language") {
        return {name: 'slide-to-right'}
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
