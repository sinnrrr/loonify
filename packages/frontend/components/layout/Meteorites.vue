<template>
  <img src="~assets/svg/space/meteorites.svg" alt="Meteorites">
</template>

<script>
export default {
  name: "Meteorites"
}
</script>

<style lang="scss" scoped>
  img {
    position: absolute;
    margin-left: 2rem;
    height: 8vmin;
    transform: scaleX(-1);

    @include from($desktop) {
      height: 10vmin;
    }
  }
</style>
