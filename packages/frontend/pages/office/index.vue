<template>
  <main>
    <gmap-map
      ref='map'
      class='map'
      :zoom='mapZoom'
      :center='this.currentLocation'
    ></gmap-map>
  </main>
</template>

<script>
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
  // async asyncData({ $axios }) {
  //   const mapData = await $axios.$get('posts/bounded').data
  //
  //   return { mapData }
  // },
  mounted() {
    console.log(this.mapData)

    this.$refs.map.$mapPromise.then(map => {
      map.data.addGeoJson(this.mapData)
    });
  },
};
</script>

<style lang='scss' scoped>
main {
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>
