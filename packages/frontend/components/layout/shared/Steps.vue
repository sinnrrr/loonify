<template>
  <b-steps
    :size="$breakpoints.lMd ? 'is-large' : 'is-medium'"
    :vertical="$breakpoints.lMd"
    v-model="step"
    :rounded="false"
    :has-navigation="true"
    :mobile-mode="$breakpoints.lSm ? 'compact' : 'minimalist'">

    <b-step-item
      v-for="(component, index) in components"
      :key="index+1"
      :step="index+1"
      :label="component.name"
      class="step"
      :clickable="step >= index"
      :class="{ 'is-block': step === 0 && index === 0 }">

      <keep-alive>
        <component
          :is="component"
          v-on:enable-navigation="navigationDisabled = true"
        ></component>
      </keep-alive>

    </b-step-item>

    <template #navigation="{previous, next}">
      <section class="navigation">
        <b-button
          icon-left="backward"
          :disabled="previous.disabled"
          @click.prevent="previous.action()">
          Previous
        </b-button>

        <b-button
          type="is-primary"
          icon-right="forward"
          :disabled="next.disabled || navigationDisabled"
          @click.prevent="next.action()">
          Next
        </b-button>
      </section>
    </template>

  </b-steps>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: 'Steps',
  data() {
    return {
      navigationDisabled: false
    }
  },
  props: {
    active: {
      type: Number,
      default: 0
    },
    components: {
      type: Array,
      required: true
    },
    type: {
      type: String,
      default: 'view'
    }
  },
  computed: {
    step: {
      ...mapGetters('posts', ['formActiveStep']),
      ...mapMutations('posts', ['setFormActiveStep']),

      get() {
        return this.formActiveStep
      },
      set(value) {
        this.setFormActiveStep(value)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.navigation {
  display: flex;
  padding: 1rem;
  flex-basis: 100%;
  justify-content: space-between;

  @include until($tablet) {
    flex-direction: column-reverse;
  }
}

.step {
  @include from($tablet) {
    margin-left: 2rem;
  }
}
</style>

