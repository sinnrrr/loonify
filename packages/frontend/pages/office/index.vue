<template>
  <main>
    <sidebar />
    <gmap-map
      ref='map'
      class='map'
      :class="{ 'is-hidden': !showMap && $breakpoints.sSm }"
      :zoom='mapZoom'
      @dragend='getData'
      @zoom_changed='getData'
      @bounds_changed.once='getData'
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
import MapSidebarControl from '~/components/MapSidebarControl'

export default {
  name: 'Location',
  mixins: [mapMixin],
  data() {
    return {
      posts: [],
      allowedCategories: [],
      showMap: true,
    };
  },
  mounted() {
    this.$refs.map.$mapPromise.then(map => {
      const controlDiv = document.createElement('div');
      controlDiv.style.display = 'flex'
      controlDiv.style.flexDirection = 'column'

      this.createMapControls(map, controlDiv, [MapSidebarControl]);

      map.controls[this.google.maps.ControlPosition.TOP_LEFT].push(controlDiv);
    });

    this.$nuxt.$on('filter-posts', (event) => this.allowedCategories = event);
    this.$nuxt.$on('toggle-sidebar', () => this.showMap = !this.showMap);
  },
  computed: {
    filteredPosts() {
      return this.posts.filter(post => {
        if (this.allowedCategories.length > 0) return this.allowedCategories.includes(post.category.id);
        else return true;
      });
    },
    markers() {
      return this.filteredPosts.map(post => {
        if (!post.location.hasOwnProperty('radius')) return post.location;
      });
    },
    circles() {
      return this.filteredPosts.forEach(post => {
        if (post.location.hasOwnProperty('radius')) return post.location;
      });
    },
  },
  methods: {
    getData() {
      this.$axios
        .$get('posts/bounded', {
          params: {
            east: this.map.getBounds().getNorthEast().lat(),
            north: this.map.getBounds().getNorthEast().lng(),
            west: this.map.getBounds().getSouthWest().lat(),
            south: this.map.getBounds().getSouthWest().lng(),
          },
        })
        .then(({ data }) => this.posts = data)
      ;
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
