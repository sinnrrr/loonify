<template>
  <section class="index">
    <Search />
    <div class="about">
      <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate ducimus incidunt nostrum. Distinctio
        enim
        exercitationem laborum maiores molestias nulla tempore voluptate. Cum eos facilis ipsum, labore odio quas
        repellat unde!</h1>
      <img src="index.svg" class="hoverable" alt="Index illustration">
    </div>
  </section>
</template>

<script>
  import Search from "~/components/Search"

  export default {
    components: {
      Search
    },
    transition(to, from) {
      if (to.name === "index") {
        return 'fade'
      } else {
        return to.params.animation
      }
    }
  }
</script>

<style scoped>
  * {
    font-family: 'Rubik', sans-serif;
  }

  section.index {
    position: relative;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  section.index > div {
    margin: 0 3rem;
  }

  div.about {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  h1 {
    font-weight: 900;
    font-size: 32px;
    max-width: 600px;
  }

  img {
    width: 100%;
    height: auto;
    max-width: 600px;
    max-height: 60vh;
    margin-bottom: 1rem;
    -webkit-user-drag: none;
  }

  @media screen and (max-width: 992px) {
    div.about {
      flex-direction: column-reverse;
    }
  }
</style>
