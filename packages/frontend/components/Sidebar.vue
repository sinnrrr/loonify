<template>
  <b-sidebar
    position='static'
    class='is-light is-flex is-flex-grow-1'
    mobile='fullwidth'
    v-model='sidebarOpen'
    :class="{ 'mr-6': sidebarOpen && $breakpoints.lSm }"
  >
    <div class='is-flex is-justify-content-space-between is-flex-grow-1'>
      <h1 class='title mb-5'>Filters</h1>
      <b-button
        v-if='$breakpoints.sSm'
        @click.prevent="$nuxt.$emit('toggle-sidebar')">
        <b-icon icon='times'></b-icon>
      </b-button>
    </div>
    <div>
      <b-field>
        <b-input
          placeholder='Search filters'
          icon='search'
          v-model='searchQuery'
        ></b-input>
      </b-field>
      <template v-for='(activeFilter, index) in activeFilters'>
        <b-tag
          type='is-primary'
          closable
          class='mr-1'
          aria-close-label='Close tag'
          @close='activeFilters.splice(index, 1)'>
          {{ getFilterName(activeFilter) }}
        </b-tag>
      </template>
      <section class='filters'>
        <button
          v-for='filter in filteredList'
          @click.prevent='toggleActiveFilter(filter.id)'
          class='button is-primary is-outlined is-small m-1 ml-1'>
          {{ filter.name }}
        </button>
      </section>
    </div>
  </b-sidebar>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      filters: [],
      activeFilters: [],
      searchQuery: '',
      sidebarOpen: false,
    };
  },
  async fetch({ $axios }) {
    this.filtersList = await $axios.$get('filters')
  },
  methods: {
    replaceQuery() {
      this.$router.replace({
        name: this.$route.name,
        query: {
          ...(this.activeFilters.length > 0 && { filters: this.activeFilters.join(',') }),
        },
      });
    },
    getFilterName(filterId) {
      return this.filters.filter(filter => filter.id === filterId)[0].name;
    },
    toggleActiveFilter(filterId) {
      if (this.activeFilters.includes(filterId)) this.activeFilters.splice(filterId, 1);
      else this.activeFilters.push(filterId);

      this.replaceQuery()
    },
  },
  mounted() {
    if (this.$route.query.filters) {
      this.activeFilters = this.$route.query.filters
        .split(',')
        .map(filter => {
          const parsedFilter = parseInt(filter);

          if (typeof parsedFilter === 'number') return parsedFilter;
          else return NaN;
        })
        .filter(value => !Number.isNaN(value))
      ;
    }

    console.log(this.activeFilters);
    this.$nuxt.$on('toggle-sidebar', () => this.sidebarOpen = !this.sidebarOpen);
  },
  computed: {
    filteredList() {
      return this.filters.filter(filter => {
        return filter.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    },
  },
};
</script>

<style lang='scss' scoped>
.filters {
  display: flex;
  margin-top: 2rem;
  flex-wrap: wrap;
  overflow-y: scroll;
}

@mixin reset-styles {
  color: $primary !important;
  background-color: $white !important;
}

.is-outlined {
  transition: $transition;

  &:hover:not(:focus):not(:active) {
    @include reset-styles;

    transform: scale(1.05);
  }

  &:active, &:focus {
    @include reset-styles;
  }
}
</style>
