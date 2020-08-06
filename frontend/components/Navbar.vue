<template>
  <header>
    <nav>
      <NuxtLink
        :to="{name:'office', params: {'animation': 'slide-to-top'}}"
        :class="(this.$route.name === 'office') ? 'active' : ''"
        class="hoverable"
      >
        Office
      </NuxtLink>
      <NuxtLink
        :to="{name:'about', params: {'animation': 'slide-to-bottom'}}"
        :class="(this.$route.name === 'about') ? 'active' : ''"
        class="hoverable">
        About
      </NuxtLink>
    </nav>
    <div class="logo">
        <NuxtLink
          :to="{name:'index', params: {'animation': 'fade'}}"
          :class="(this.$route.name !== 'index') ? 'active' : ''"
          class="hoverable">
          loonify
      </NuxtLink>
        <NuxtLink
          :to="{name:'index', params: {'animation': 'fade'}}"
          :class="(this.$route.name !== 'index') ? 'active' : ''"
          class="hoverable">
          lost and found <br> of the future
        </NuxtLink>
    </div>
    <nav>
      <NuxtLink
        :to="{name:'account', params: {'animation': 'slide-to-left'}}"
        :class="(this.$route.name === 'account') ? 'active' : ''"
        class="hoverable"
      >
        Account
      </NuxtLink>
      <NuxtLink
        :to="{name:'language', params: {'animation': 'slide-to-right'}}"
        :class="(this.$route.name === 'language') ? 'active' : ''"
        class="hoverable">
        Language
      </NuxtLink>
    </nav>
  </header>
</template>

<script>
  export default {
    name: "Navbar",
  }
</script>

<style scoped>
  a {
    text-decoration: none;
  }

  nav > a {
    color: var(--bs-yellow);
    letter-spacing: 1px;
    transition: 500ms;
    text-shadow: -1px -1px 0 var(--bs-gray-dark),
                  1px -1px 0 var(--bs-gray-dark),
                 -1px 1px 0 var(--bs-gray-dark),
                  1px 1px 0 var(--bs-gray-dark);
  }

  nav > a:hover {
    text-shadow: none;
    color: var(--bs-gray-dark);
  }

  nav > a.active {
    display: inline-block;
    padding-bottom: 3px;
  }

  nav > a.active:after {
    content: '';
    transition: ease-in-out 300ms;
    display: block;
    margin: auto;
    height: 2px;
    opacity: 40%;
    background-color: var(--bs-gray-dark);
    animation: underline 5s infinite;
  }

  nav > a.active:hover:after {
    opacity: 80%;
  }

  header {
    display: flex;
    flex-direction: row;
    position: relative;
    width: 100%;
    padding: 2rem;
    justify-content: center;
    font-family: 'Rubik Mono One', sans-serif;
    font-size: 24px;
    user-select: none;
  }

  div.logo {
    display: flex;
    text-align: center;
    flex-direction: column;
    justify-content: center;
    padding: 0 1rem;
  }

  div.logo > a {
    color: var(--bs-gray-dark);
    transition: ease-in-out 500ms;
  }

  div.logo:hover > a:not(.active) {
    color: var(--bs-blue);
  }

  div.logo > a:first-child {
    font-size: 48px;
    line-height: 40px;
    letter-spacing: 1px;
  }

  div.logo > a:last-child {
    font-size: 18px;
    line-height: 18px;
    opacity: 80%;
  }

  div.logo > a.active {
    text-shadow: -2px -2px 0 var(--bs-indigo),
    2px -2px 0 var(--bs-indigo),
    -2px 2px 0 var(--bs-indigo),
    2px 2px 0 var(--bs-indigo);
    color: var(--bs-yellow);
  }

  div.logo:hover > a.active {
    text-shadow: none;
    color: var(--bs-indigo);
  }

  nav:first-of-type {
    text-align: left;
  }

  nav:last-of-type {
    text-align: right;
  }

  @media screen and (max-width: 992px) {
    header {
      justify-content: space-between;
    }
  }

  @keyframes underline {
    0%    { width: 80%    }
    50%   { width: 100%   }
    100%  { width: 80%    }
  }
</style>
