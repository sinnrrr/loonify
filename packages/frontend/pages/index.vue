<template>
  <main>
    <section>
      <Earth/>
      <Meteorites/>
    </section>
    <section>
      <div class="my-6">
        <h1 class="title is-size-1-tablet">Find what you're looking for</h1>
        <h2 class="subtitle is-size-3-tablet">
          This is more, than just ordinary portal, with posts. Find, return and get a reward!
        </h2>
      </div>
      <div>
        <b-button
          tag="nuxt-link"
          size='is-medium'
          :to="{ name: 'office' }"
          class="is-primary has-text-weight-bold is-size-4-tablet">
          Go to office
        </b-button>
      </div>
    </section>
    <NuxtChild />
  </main>
</template>

<script>
export default {
  name: 'index'
}
</script>

<style lang="scss" scoped>
main {
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  @include from($tablet) {
    margin-top: 0;
    flex-direction: row;
  }

  section:first-child {
    margin-right: 10rem;
  }
}
</style>
