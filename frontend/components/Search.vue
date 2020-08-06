<template>
  <div class="search">
    <input type="text" class="hoverable" v-model="query" placeholder="Search">
    <NuxtLink class="search-button hoverable" :to="'/search?q=' + query">Go</NuxtLink>
  </div>
</template>

<script>
  export default {
    name: "Search",
    data: () => ({
      query: '',
    }),
  }
</script>

<style scoped>
  div.search {
    display: flex;
    justify-content: center;
  }

  input {
    opacity: 40%;
    width: 70vw;
    font-size: 32px;
    max-width: 600px;
    font-family: 'Rubik', sans-serif;
    font-weight: 700;
    border-radius: 5px 0 0 5px;
    margin-bottom: 2rem;
    color: var(--bs-gray-dark);
    transition: all ease-in-out 0.5s;
    padding: 15px;
  }

  input:hover {
    opacity: 60%;
  }

  input:focus {
    opacity: 80%;
    box-shadow: 15px 15px 30px -25px var(--bs-gray-dark);
  }

  a.search-button {
    position: relative;
    text-transform: uppercase;
    text-decoration: none;
    margin-bottom: 2rem;
    padding: 15px;
    left: -1px;
    font-size: 32px;
    opacity: 60%;
    transition: all ease-in-out 0.5s;
    font-weight: 700;
    background-color: var(--bs-gray-dark);
    color: var(--bs-light);
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
  }

  a.search-button:hover {
    opacity: 80%;
  }

  a.search-button:active {
    opacity: 90%;
  }
</style>
