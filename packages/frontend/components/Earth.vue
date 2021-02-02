<template>
  <img src="~assets/svg/space/planet-earth.svg" alt="Earth icon">
</template>

<script>
export default {
  name: "Earth"
}
</script>

<style lang="scss" scoped>
  img {
    height: auto;
    width: 60vw;

    @include from($tablet){
      width: 50vw;
    }

    @include from($desktop){
      width: 40vw;
    }

    @include from($fullhd) {
      width: 24vw;
    }
  }
</style>
