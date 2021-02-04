export default {
  methods: {
    randomNumber(min, max) {
      return Math.random() * (max - min) + min;
    },
  }
}
