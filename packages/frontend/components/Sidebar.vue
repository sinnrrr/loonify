<template>
  <b-sidebar
    position='static'
    class='is-light is-flex is-flex-grow-1'
    mobile='fullwidth'
    v-model='sidebarOpen'
    :class="{ 'mr-6': sidebarOpen && $breakpoints.lSm }"
  >
    <div class='is-flex is-justify-content-space-between is-flex-grow-1'>
      <h1 class='title mb-5'>Categories</h1>
      <b-button
        v-if='$breakpoints.sSm'
        @click.prevent="$nuxt.$emit('toggle-sidebar')">
        <b-icon icon='times'></b-icon>
      </b-button>
    </div>
    <div>
      <b-field>
        <b-input
          placeholder='Search categories'
          icon='search'
          v-model='searchQuery'
        ></b-input>
      </b-field>
      <template v-for='(activeCategory, index) in activeCategories'>
        <b-tag
          type='is-primary'
          closable
          class='mr-1'
          aria-close-label='Close tag'
          @close='activeCategories.splice(index, 1)'>
          {{ getCategoryName(activeCategory) }}
        </b-tag>
      </template>
      <section class='categories'>
        <button
          v-for='category in filteredList'
          @click.prevent='toggleActiveCategory(category.id)'
          class='button is-primary is-outlined is-small m-1 ml-1'>
          {{ category.name }}
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
      categories: [],
      activeCategories: [],
      searchQuery: '',
      sidebarOpen: false,
    };
  },
  async fetch() {
    await this.$axios.$get('categories').then(({ data }) => this.categories = data)
  },
  methods: {
    replaceQuery() {
      this.$router.replace({
        name: this.$route.name,
        query: {
          ...(this.activeCategories.length > 0 && { categories: this.activeCategories.join(',') }),
        },
      });
    },
    getCategoryName(categoryId) {
      return this.categories.filter(category => category.id === categoryId)[0].name;
    },
    toggleActiveCategory(categoryId) {
      if (this.activeCategories.includes(categoryId)) this.activeCategories.splice(categoryId, 1);
      else this.activeCategories.push(categoryId);

      this.$emit('filter-posts', this.activeCategories)
      this.replaceQuery()
    },
  },
  mounted() {
    if (this.$route.query.categories) {
      this.activeCategories = this.$route.query.categories
        .split(',')
        .map(category => {
          const parsedCategory = parseInt(category);

          if (typeof parsedCategory === 'number') return parsedCategory;
          else return NaN;
        })
        .filter(value => !Number.isNaN(value))
      ;
    }

    this.$nuxt.$on('toggle-sidebar', () => this.sidebarOpen = !this.sidebarOpen);
  },
  computed: {
    filteredList() {
      return this.categories.filter(category => {
        return category.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    },
  },
};
</script>

<style lang='scss' scoped>
.categories {
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
