<template>
  <h1>Hello to {{ this.viewMode }}</h1>
</template>

<script>
export default {
  name: 'PostForm',
  props: {
    viewMode: {
      type: String,
      required: true
    }
  }
};
</script>
