<template>
  <div class="wrapper">
    <Navbar />
    <nuxt/>
    <Animation v-if="showAnimation" />
    <Pointer v-if="this.$device.isDesktop" />
  </div>
</template>

<script>
  import Arrow from "~/components/Arrow"
  import Navbar from "~/components/Navbar"
  import Pointer from "~/components/Pointer"
  import Animation from "~/components/Animation"

  export default {
    components: {
      Arrow,
      Navbar,
      Pointer,
      Animation
    },
    data: () => {
      return {
        transition: "fade",
        showAnimation: true,
      }
    },
    mounted() {
      setTimeout(() => {
        document.querySelector('.animation').remove()
        this.showAnimation = false
      }, 3500)
    },
  }
</script>

<style>
  html, body {
    font-family: 'Source Code Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
    overflow: hidden;
    background-color: var(--bs-yellow);
  }

  a:active, a:visited {
    color: initial;
  }

  div.wrapper {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  *,
  *:before,
  *:after {
    cursor: none !important;
    box-sizing: border-box;
    margin: 0;
  }

</style>
