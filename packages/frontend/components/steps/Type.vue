<template>
  <section>
    <div
      v-for="(card, index) in cards"
      :key="index"
      class="card">
      <input :id="'radio-'+ index" type="radio" :value="card.name.toLowerCase()" v-model="pick"/>
      <label :for="'radio-'+ index" class="title">
        <img :src="card.icon" alt="Card icon">
        {{ card.name }}
      </label>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: 'Type',
  data() {
    return {
      cards: [
        {
          name: 'Found',
          icon: require('~/assets/svg/space/lander.svg'),
        },
        {
          name: 'Lost',
          icon: require('~/assets/svg/space/astronaut.svg'),
        },
        {
          name: 'Theft',
          icon: require('~/assets/svg/space/alien-1.svg'),
        },
      ],
    }
  },
  methods: { ...mapMutations('posts', ['setType']) },
  computed: {
    ...mapGetters('posts', ['type']),
    pick: {
      get() {
        return this.type
      },
      set(type) {
        this.setType(type)
      }
    }
  },
  watch: {
    pick(value) {
      if (value.length > 0) this.$emit('enable-navigation', this.$options.name)
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  display: flex !important;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  * {
    cursor: pointer;
  }

  @include fromXs {
    flex-direction: row;

    .card:nth-child(2n) {
      margin: 1rem;
    }
  }

  .card {
    display: flex;
    flex: 1;
    width: 100%;
    text-align: center;
    justify-content: space-between;
    flex-direction: column;
    transition: $transition;
    border: $border-width solid $primary;

    input[type=radio] {
      display: none;

      & + label {
        padding: 1rem;
      }

      &:checked + label {
        box-shadow: 0 0 1rem 2px $primary;
      }
    }

    &:nth-child(2n) {
      margin: 2rem 0 2rem 0;

      @include from($tablet) {
        margin: 0 2rem 0 2rem;
      }
    }
  }
}
</style>
