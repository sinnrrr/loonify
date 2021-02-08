<template>
  <main>
    <gmap-map
      ref='map'
      class='map'
      :zoom='mapZoom'
      @zoom_changed='handleBoundChanges'
      @dragend='handleBoundChanges'
      @bounds_changed.once='handleBoundChanges'
      :center='this.currentLocation'
    >
            <gmap-marker
              v-for="(marker, index) in markers"
              :key="`marker-${index}`"
              :position="marker"
            />
<!--            <gmap-circle-->
<!--              v-for="(circle, index) in circles"-->
<!--              :key="`circle-${index}`"-->
<!--              :center="circle.center"-->
<!--              :radius="circle.radius"-->
<!--              :options="{fillColor:'red',fillOpacity:1.0}"-->
<!--            />-->
    </gmap-map>
  </main>
</template>

<script>
import { gmapApi } from 'vue2-google-maps';

export default {
  name: 'Location',
  // middleware: 'auth',
  data() {
    return {
      map: null,
      mapZoom: 12,
      currentLocation: {
        lat: 50.4452,
        lng: 25.1928,
      },

      markers: [],
      circles: []
    };
  },
  computed: {
    google: gmapApi,
  },
  methods: {
    enableNavigation(value) {
      if (value.length > 0) this.$emit('enable-navigation', this.$options.name);
    },
    handleBoundChanges() {
      this.$axios
        .$get('posts/bounded', {
          params: {
            east: this.map.getBounds().getNorthEast().lat(),
            north: this.map.getBounds().getNorthEast().lng(),
            west: this.map.getBounds().getSouthWest().lat(),
            south: this.map.getBounds().getSouthWest().lng(),
          },
        })
        .then(data => {
          data.data.map(({ location }) => {
            location.hasOwnProperty('radius')
              ? this.circles.push(location)
              : this.markers.push(location)
          })
        });
    },
  },
  mounted() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.currentLocation.lat = position.coords.latitude;
        this.currentLocation.lng = position.coords.longitude;
      },
    );

    this.$refs.map.$mapPromise.then(map => this.map = map);
  },
};
</script>

<style lang='scss' scoped>
main {
  display: flex;
  flex: 1;

  .map {
    width: 100%;
    min-height: 100% !important;
  }
}
</style>
