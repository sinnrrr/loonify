<template>
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
</template>

<script>
export default {
  name: 'Categories',
  data() {
    return {
      categories: [],
      activeCategories: [],
      searchQuery: '',
    }
  },
  mounted() {
    this.$axios.$get('categories')
      .then(({ data }) => this.categories = data)

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
      const categoryIndex = this.activeCategories.indexOf(categoryId)

      if (categoryIndex >= 0) this.activeCategories.splice(categoryIndex, 1);
      else this.activeCategories.push(categoryId);

      this.replaceQuery()
      this.$emit('filter-posts', this.activeCategories)
    },
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
