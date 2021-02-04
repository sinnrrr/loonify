<template>
  <gmap-map
    ref="map"
    class="map"
    :zoom="12"
    :center="this.currentLocation"
  >
    <gmap-marker
      v-for="(marker, index) in markers"
      :key="index"
      :position="marker"
      :draggable="true"
      @dragend="markerDragHandler($event, index)"
    />
  </gmap-map>
</template>

<script>
import Vue from "vue";
import {gmapApi} from 'vue2-google-maps'
import {mapGetters, mapMutations} from "vuex";
import MarkerButton from "@/components/maps/MarkerButton";

export default {
  name: "Location",
  data() {
    return {
      currentLocation: {
        lat: 50.4452,
        lng: 25.1928
      },
    }
  },
  computed: {
    google: gmapApi,
    ...mapGetters('posts', [
      'markers',
    ])
  },
  methods: {
    ...mapMutations('posts', [
      'setMarker',
    ]),

    createMapControls(map, controlDiv, controls) {
      controls.map(control => {
        const button = new Vue({
          ...control,
          parent: this,
          propsData: {map}
        }).$mount()

        controlDiv.appendChild(button.$el);
      })
    },
    markerDragHandler(event, index) {
      this.setMarker({
        index,
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      })

      this.$buefy.toast.open('Changed position of the marker')
    }
  },
  mounted() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.currentLocation.lat = position.coords.latitude
        this.currentLocation.lng = position.coords.longitude
      }
    )

    this.$refs.map.$mapPromise.then(map => {
      const controlDiv = document.createElement('div')
      controlDiv.style.display = 'flex'
      controlDiv.style.flexDirection = 'column'

      this.createMapControls(
        map,
        controlDiv,
        [
          MarkerButton,
        ],
      )

      map.controls[this.google.maps.ControlPosition.RIGHT_CENTER].push(controlDiv)
    })
  },
  watch: {
    markers(value) {
      if (value.length > 0) this.$emit('enable-navigation', this.$options.name)
    }
  }
}
</script>

<style lang="scss" scoped>
.map {
  height: 60vh;
  width: 100%;
}
</style>
