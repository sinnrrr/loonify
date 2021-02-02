<template>
    <button @click.prevent="clickHandler"><b-icon :icon="icon"></b-icon></button>
</template>

<script>
export default {
  name: 'Control',
  props: {
    icon: {
      type: String,
      default: 'plus',
      required: true
    }
  },
  methods: {
    clickHandler() {
      this.$emit('click')
    }
  },
  mounted() {
    this.$nuxt.$on('message', message => this.$buefy.toast.open(message))
  }
}
</script>

<style scoped>
button {
  background-color: #fff;
  border: 2px solid #fff;
  width: 40px;
  height: 40px;
  font-size: 18px;
  border-radius: 3px;
  box-shadow: 0 2px 6px rgba(0,0,0,.3);
  cursor: pointer;
  margin: 10px;
  text-align: center;
}
</style>
