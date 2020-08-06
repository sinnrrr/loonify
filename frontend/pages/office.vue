<template>
  <section class="about">
    asdasdas Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi aperiam architecto, aspernatur atque cupiditate delectus dicta doloremque, excepturi, impedit ipsam itaque modi mollitia odio perferendis provident ratione ullam. Exercitationem, id.
  </section>
</template>

<script>

  export default {
    name: "office",
    transition(to, from) {
      if (to.name === "office") {
        return {name: 'slide-to-top'}
      } else {
        return to.params.animation
      }
    }
  }
</script>

<style scoped>
  section.about {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
  }
</style>
