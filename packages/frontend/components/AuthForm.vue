<template>
  <form class='modal-card' style='width: auto'>
    <header class='modal-card-head'>
      <p class='modal-card-title'>{{ capitalView }}</p>
      <button
        type='button'
        class='delete'
        @click="$emit('close')" />
    </header>
    <main class='modal-card-body'>
      <b-field v-if='isSignupView' label='Name'>
        <b-input
          v-model='formInput.name'
          placeholder='Your name'
          required>
        </b-input>
      </b-field>

      <b-field label='Email'>
        <b-input
          type='email'
          v-model='formInput.email'
          placeholder='Your email'
          required>
        </b-input>
      </b-field>

      <b-field label='Password'>
        <b-input
          type='password'
          v-model='formInput.password'
          password-reveal
          placeholder='Your password'
          required>
        </b-input>
      </b-field>

      <NuxtLink v-if='isSignupView' :to="{ name: 'index-login' }">Have an account? Log in!</NuxtLink>
      <NuxtLink v-if='isLoginView' :to="{ name: 'index-signup' }">Don't have account? Sign up!</NuxtLink>
    </main>
    <footer class='modal-card-foot'>
      <b-button
        label='Close'
        @click="$emit('close')" />

      <b-button
        @click.prevent='authenticate'
        :label='capitalView'
        type='is-primary'
        native-type='submit' />
    </footer>
  </form>
</template>

<script>
export default {
  name: 'AuthForm',
  data() {
    return {
      formInput: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  computed: {
    currentView() {
      return this.$route.path.split('/').slice(-1)[0];
    },
    capitalView() {
      return this.currentView.charAt(0).toUpperCase() + this.currentView.slice(1);
    },
    isLoginView() {
      return this.currentView === 'login';
    },
    isSignupView() {
      return this.currentView === 'signup';
    },
  },
  methods: {
    async authenticate() {
      switch (this.currentView) {
        case 'login':
          this.$auth.loginWith('local', { data: this.formInput })
            .then(() => this.$buefy.toast.open({
              message: 'Logged in successfully',
              type: 'is-success'
            }))
            .catch(error => console.log(error))
          ;

          break;
        case 'signup':
          console.log('signup', this.$props)

          break;
      }
    },
  },
};
</script>
