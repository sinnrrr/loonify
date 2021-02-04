<template>
  <b-navbar class="has-background-transparent mb-6">

    <template #brand>
      <b-navbar-item
        class="logo"
        tag="nuxt-link"
        :to="{ name: 'index' }">

        <svg
          viewBox='0 0 50 50'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M0 25V50H25H50V25V0H25H0V25ZM21.875 14.0625V18.75H17.1875H12.5V14.0625V9.375H17.1875H21.875V14.0625ZM37.5 14.0625V18.75H32.8125H28.125V14.0625V9.375H32.8125H37.5V14.0625ZM18.75 34.375V37.5H25H31.25V34.375V31.25H34.375H37.5V37.5V43.75H25H12.5V37.5V31.25H15.625H18.75V34.375Z'/>
        </svg>

      </b-navbar-item>

      <b-navbar-item
        tag="nuxt-link"
        :to="{ name: 'index' }"
        class="logo-text is-hidden-mobile">
        Lost and Found<br>of the Future
      </b-navbar-item>
    </template>


    <template #end>
      <b-navbar-item
        tag="div"
        class="is-size-4 is-uppercase has-text-weight-bold">

        <b-navbar-item
          tag="nuxt-link"
          :to="{ name: 'office' }">
          Office
        </b-navbar-item>

        <b-navbar-item
          tag="nuxt-link"
          :to="{ name: 'about' }">
          About
        </b-navbar-item>

        <b-navbar-dropdown v-if="user" label="Account">
          <b-navbar-item
            tag="nuxt-link"
            :to="{ name: 'account-settings' }">
            Settings
          </b-navbar-item>

          <b-navbar-item
            tag="nuxt-link"
            :to="{ name: 'account-logout' }">
            Logout
          </b-navbar-item>
        </b-navbar-dropdown>

        <b-navbar-item v-if="$route.name !== 'office-edit'">
          <b-button
            tag="nuxt-link"
            class="is-warning"
            :to="{ name: 'office-edit' }">
            Create post
          </b-button>
        </b-navbar-item>

        <b-navbar-item v-else>
          <b-button
            tag="nuxt-link"
            class="is-warning"
            :to="{ name: 'office' }">
            Find thing
          </b-button>
        </b-navbar-item>

        <b-navbar-item v-if="!user" tag="div">
          <b-button
            tag="nuxt-link"
            type="is-primary"
            :to="{ name: 'account-signup' }">
            Sign up
          </b-button>

          <b-button
            tag="nuxt-link"
            class="is-light ml-5"
            :to="{ name: 'account-login' }">
            Log in
          </b-button>
        </b-navbar-item>
      </b-navbar-item>
    </template>

  </b-navbar>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      user: null
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  padding-left: 0 !important;

  svg {
    fill: $primary;
    background-color: $white;
    height: 3.25rem;
  }

  &-text {
    color: $primary;
    font-size: 1.5rem;
    line-height: 100%;
    font-weight: bold;
    text-transform: uppercase;
  }
}
</style>
