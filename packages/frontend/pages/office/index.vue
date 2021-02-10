<template>
  <main>
    <sidebar />
    <gmap-map
      ref='map'
      class='map'
      :class="{ 'is-hidden': !showMap && $breakpoints.sSm }"
      :zoom='mapZoom'
      @dragend='handleBoundChanges'
      @zoom_changed='handleBoundChanges'
      @bounds_changed.once='handleBoundChanges'
      :center='this.currentLocation'
    >
      <gmap-marker
        v-for='(marker, index) in markers'
        :key='`marker-${index}`'
        :position='marker'
      />
      <gmap-circle
        v-for='(circle, index) in circles'
        :key='`circle-${index}`'
        :center='circle.center'
        :radius='circle.radius'
        :options="{fillColor:'red',fillOpacity:1.0}"
      />
    </gmap-map>
  </main>
</template>

<script>
import mapMixin from '~/mixins/map';
import { gmapApi } from 'vue2-google-maps';
import MapSidebarButton from '@/components/MapSidebarButton';

export default {
  name: 'Location',
  mixins: [mapMixin],
  data() {
    return {
      showMap: true
    }
  },
  mounted() {
    this.$nuxt.$on('toggle-sidebar', () => this.showMap = !this.showMap);

    this.$refs.map.$mapPromise.then(map => {
      const controlDiv = document.createElement('div');

      this.createMapControls(map, controlDiv, [MapSidebarButton]);

      map.controls[this.google.maps.ControlPosition.LEFT_TOP].push(controlDiv);
    });
  },
  computed: {
    google: gmapApi,
  },
  methods: {
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
              : this.markers.push(location);
          });
        });
    },
  },
};
</script>

<style lang='scss' scoped>
main {
  display: flex;
  flex: 1;

  .map {
    width: 100%;
    min-width: 70%;
    min-height: 100%;
  }
}
</style>
