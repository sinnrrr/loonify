<template>
  <div>
    <b-field>
      <b-autocomplete
        v-model="name"
        ref="autocomplete"
        :data="filteredDataArray"
        placeholder="Search for category"
        @select="option => selected = option">
        <template #footer>
          <a @click="showAddFruit">
            <span> Add new... </span>
          </a>
        </template>
        <template #empty>No results for {{name}}</template>
      </b-autocomplete>
    </b-field>
    <section>
<!--      <div-->
<!--        v-for="(category, index) in categories"-->
<!--        :key="index"-->
<!--        class="card">-->
<!--        <input :id="'radio-'+ index" type="radio" :value="card.name.toLowerCase()" v-model="pick"/>-->
<!--        <label :for="'radio-'+ index" class="title">-->
<!--          <img :src="card.icon" alt="Card icon">-->
<!--          {{ card.name }}-->
<!--        </label>-->
<!--      </div>-->
    </section>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
  name: 'Category',
  data() {
    return {
      data: [
        'Orange',
        'Apple',
        'Banana',
        'Pear',
        'Lemon',
        'Strawberry',
        'Kiwi'
      ],
      name: '',
      selected: null
    }
  },
  computed: {
    ...mapGetters('posts', ['categories']),

    filteredDataArray() {
      return this.data.filter((option) => {
        return option
          .toString()
          .toLowerCase()
          .indexOf(this.name.toLowerCase()) >= 0
      })
    }
  },
  methods: {
    ...mapMutations('posts', ['setCategory']),

    showAddFruit() {
      this.$buefy.dialog.prompt({
        message: `Fruit`,
        inputAttrs: {
          placeholder: 'e.g. Watermelon',
          maxlength: 20,
          value: this.name
        },
        confirmText: 'Add',
        onConfirm: (value) => {
          this.data.push(value)
          this.$refs.autocomplete.setSelected(value)
        }
      })
    }
  }
}
</script>
