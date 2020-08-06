<template>
  <NuxtLink
    :class="'arrow ' + this.position"
    :to="this.path">
    <img src="arrow.svg" alt="Arrow">
  </NuxtLink>
</template>

<script>
    export default {
        name: "Arrow",
        props: {
          position: String,
          path: String,
          required: true
        }
    }
</script>

<style scoped>
  a.arrow {
    position: absolute;
  }

  a.arrow > img {
    height: 30px;
  }

  .left {
    top: 50%;
    left: 1%;
    transform: translateY(-50%) rotate(180deg);
  }

  .right {
    top: 50%;
    right: 1%;
    transform: translateY(-50%);
  }

  .bottom {
    left: 50%;
    bottom: 1%;
    transform: translateX(-50%) rotate(90deg);
  }

  .disabled {
    opacity: 20%;
  }
</style>
