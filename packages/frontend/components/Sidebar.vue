<template>
  <b-sidebar
    position='static'
    class='is-light is-flex is-flex-grow-1'
    mobile='fullwidth'
    v-model='sidebarOpen'
    :class="{ 'mr-6': sidebarOpen && $breakpoints.lSm }"
  >
    <div class='is-flex is-justify-content-space-between is-flex-grow-1'>
      <h1 class='title mb-5'>Categories</h1>
      <b-button
        v-if='$breakpoints.sSm'
        @click.prevent="$nuxt.$emit('toggle-sidebar')">
        <b-icon icon='times'></b-icon>
      </b-button>
    </div>
    <categories />
  </b-sidebar>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      sidebarOpen: false,
    };
  },
  mounted() {
    this.$nuxt.$on('toggle-sidebar', () => this.sidebarOpen = !this.sidebarOpen);
  },
};
</script>

