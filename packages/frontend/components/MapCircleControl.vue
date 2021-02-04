<template>
  <button class="map-control" @click.prevent="createCircle">
    <b-icon icon="circle"></b-icon>
  </button>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import controlMixin from "@/mixins/control";

export default {
  name: 'MapCircleControl',
  mixins: [controlMixin],
  computed: {...mapGetters('posts', ['circles'])},
  props: {
    map: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapMutations('posts', ['addCircle']),

    createCircle() {
      const circlesLimit = 3
      const circlesCount = this.circles.length

      if (circlesCount !== circlesLimit) {
        let circle = {center: {lat: this.map.getCenter().lat(), lng: this.map.getCenter().lng()}, radius: 100}

        this.circles.map(storedCircle => {
          if (storedCircle.center.lat === circle.center.lat && storedCircle.center.lng === circle.center.lng) {
            circle.center.lat += this.randomNumber(0.01, 0.05)
            circle.center.lng += this.randomNumber(0.01, 0.05);
          }
        })

        this.addCircle(circle)

        if (circle.center.lat === this.map.getCenter().lat() || circle.center.lng === this.map.getCenter().lng()) {
          this.$buefy.toast.open('Circle created successfully')
        } else {
          this.$buefy.toast.open('Circle created, but was placed near the same one')
        }
      } else {
        this.$buefy.toast.open('You can create only 5 circles')
      }
    },
  },
}
</script>
