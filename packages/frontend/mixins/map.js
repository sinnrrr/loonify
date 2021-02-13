import Vue from 'vue';
import { gmapApi } from 'vue2-google-maps';

export default {
  data() {
    return {
      map: null,
      mapZoom: 12,

      currentLocation: {
        lat: 50.4452,
        lng: 25.1928,
      },
    };
  },
  computed: {
    google: gmapApi
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
  methods: {
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
  }
};
