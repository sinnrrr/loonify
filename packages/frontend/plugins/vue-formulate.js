import Vue from 'vue'
import VueFormulate from '@braid/vue-formulate'

Vue.use(VueFormulate, {
  classes: {
    input: 'input',
    label: 'label',
    help: 'help',
    error: ['help', 'is-danger'],
  }
})
