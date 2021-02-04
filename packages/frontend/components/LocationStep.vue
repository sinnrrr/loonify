<template>
  <gmap-map
    ref="map"
    class="map"
    :zoom="mapZoom"
    :center="this.currentLocation"
  >
    <gmap-marker
      v-for="(marker, index) in markers"
      :key="`marker-${index}`"
      :position="marker"
      :draggable="true"
      @drag="setMarker({
        index,
        lat: $event.latLng.lat(),
        lng: $event.latLng.lng(),
      })"
    />
    <gmap-circle
      v-for="(circle, index) in circles"
      :key="`circle-${index}`"
      :center="circle.center"
      :radius="circle.radius"
      :draggable="true"
      :editable="true"
      :options="{fillColor:'red',fillOpacity:1.0}"
    />
  </gmap-map>
</template>

<script>
import Vue from "vue";
import {gmapApi} from 'vue2-google-maps'
import {mapGetters, mapMutations} from "vuex";
import MapMarkerControl from "@/components/MapMarkerControl";
import MapCircleControl from "@/components/MapCircleControl";

export default {
  name: "Location",
  data() {
    return {
      map: null,
      mapZoom: 12,
      markerCircleRadius: 200,
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
      'circles'
    ])
  },
  methods: {
    ...mapMutations('posts', [
      'setMarker',
    ]),

    enableNavigation(value) {
      if (value.length > 0) this.$emit('enable-navigation', this.$options.name)
    },
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
          MapMarkerControl,
          MapCircleControl
        ],
      )

      map.controls[this.google.maps.ControlPosition.RIGHT_CENTER].push(controlDiv)
    })

  },
  watch: {
    markers(value) {
      this.enableNavigation(value)
    },
    circles(value) {
      this.enableNavigation(value)
    }
  }
}
</script>

<style lang="scss" scoped>
.map {
  min-height: 60vh;
  width: 100%;
}
</style>
