<template>
  <b-steps
    :size="$breakpoints.lMd ? 'is-large' : 'is-medium'"
    :vertical="$breakpoints.lMd"
    v-model="step"
    :rounded="false"
    :has-navigation="true"
    :mobile-mode="$breakpoints.lSm ? 'compact' : 'minimalist'">

    <template v-for="(component, index) in components">
      <b-step-item
        :key="index+1"
        :step="index+1"
        :label="component.name"
        class="step"
        :class="{ 'is-block': formActiveStep === 0 && index === 0 }">

        <keep-alive>
          <component
            :is="component"
            v-on:enable-navigation="enableFormNavigation"
          ></component>
        </keep-alive>

      </b-step-item>
    </template>

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
          :disabled="next.disabled || formNavigationDisabled"
          @click.prevent="next.action()">
          Next
        </b-button>
      </section>
    </template>

  </b-steps>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
  name: 'Steps',
  props: {
    components: {
      type: Array,
      required: true
    },
    type: {
      type: String,
      default: 'view'
    },
  },
  methods: {...mapMutations('posts', ['setFormActiveStep', 'enableFormNavigation', 'disableFormNavigation']),},
  computed: {
    ...mapGetters('posts', ['formActiveStep', 'formNavigationDisabled']),

    step: {
      get() {
        return this.formActiveStep
      },
      set(newStep) {
        if (newStep > this.step) {
          this.disableFormNavigation()
        } else {
          this.enableFormNavigation()
        }

        this.setFormActiveStep(newStep)
      }
    },
  }
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

    button:nth-child(2n) {
      margin: 0.5rem 0 0.5rem 0;
    }
  }
}

.step {
  @include from($tablet) {
    margin-left: 2rem;
  }
}
</style>

