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
      :draggable="true"/>
  </gmap-map>
</template>

<script>
import Vue from "vue";
import { gmapApi } from 'vue2-google-maps'
import { mapGetters, mapMutations } from 'vuex';

import Control from "~/components/layout/maps/Control";

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
      'addMarker'
    ]),
    randomNumber(min, max) {
      return Math.random() * (max - min) + min;
    },
    createMarker(map) {
      const markersLimit = 5
      const markersCount = this.markers.length

      if (markersCount !== markersLimit) {
        let marker = { lat: map.getCenter().lat(), lng: map.getCenter().lng() }

        this.markers.map(storedMarker => {
          if (storedMarker.lat === marker.lat && storedMarker.lng === marker.lng) {
            marker.lat += this.randomNumber(0.01, 0.05)
            marker.lng += this.randomNumber(0.01, 0.05);
          }
        })

        this.addMarker(marker)
        map.panTo(marker)


        if (marker.lat === map.getCenter().lat() || marker.lng === map.getCenter().lng()) {
          this.$nuxt.$emit('message', 'Marker created successfully')
        } else {
          this.$nuxt.$emit('message', 'Marker created, but was placed near the same one')
        }
      } else {
        this.$nuxt.$emit('message', 'You can create only 5 markers')
      }
    },
    createMapControls(controlDiv, controls) {
      controls.map(({ icon, callback }) => {
        const button = new Vue({
          ...Control,
          parent: this,
          propsData: { icon }
        }).$mount()

        button.$on('click', callback)

        controlDiv.appendChild(button.$el);
      })
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

      this.createMapControls(controlDiv, [
        { icon: 'map-marker', callback: () => this.createMarker(map) },
      ])

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
