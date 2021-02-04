<template>
  <button class="map-control" @click.prevent="createMarker">
    <b-icon icon="map-marker"></b-icon>
  </button>
</template>

<script>
import controlMixin from "@/mixins/control";
import {mapGetters, mapMutations} from "vuex";

export default {
  name: 'MapMarkerControl',
  mixins: [controlMixin],
  computed: {...mapGetters('posts', ['markers']),},
  props: {
    map: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapMutations('posts', ['addMarker']),

    createMarker() {
      const markersLimit = 5
      const markersCount = this.markers.length

      if (markersCount !== markersLimit) {
        let marker = {lat: this.map.getCenter().lat(), lng: this.map.getCenter().lng()}

        this.markers.map(storedMarker => {
          if (storedMarker.lat === marker.lat && storedMarker.lng === marker.lng) {
            marker.lat += this.randomNumber(0.01, 0.05)
            marker.lng += this.randomNumber(0.01, 0.05);
          }
        })

        this.addMarker(marker)

        if (marker.lat === this.map.getCenter().lat() || marker.lng === this.map.getCenter().lng()) {
          this.$buefy.toast.open('Marker created successfully')
        } else {
          this.$buefy.toast.open('Marker created, but was placed near the same one')
        }
      } else {
        this.$buefy.toast.open('You can create only 5 markers')
      }
    },
  },
}
</script>
