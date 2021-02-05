<template>
  <p>Auth login works!</p>
</template>

<script>
export default {
  name: 'login',
  methods: {
    async userLogin() {
      try {
        let response = await this.$auth.loginWith('local', {
          data: {
            email: "asdas@asd.asddss",
            password: "asdasdasd"
          },
        });
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    this.userLogin();
  },
};
</script>
