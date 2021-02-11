<template>
  <button class='map-control' @click.prevent="$nuxt.$emit('toggle-sidebar')">
    <b-icon icon="bars"></b-icon>
  </button>
</template>
