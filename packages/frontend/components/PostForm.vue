<template>
  <article>
    <section>
      <div>
        <upload-image />
      </div>
      <div :class="{ 'is-hidden': $breakpoints.sMd }">
        <gmap-map
          ref='map'
          class='map'
          :zoom='mapZoom'
          :center='this.currentLocation'
        ></gmap-map>
      </div>

    </section>
    <section>
      <div>
        <component
          class='title'
          :is="isEdit || isNew ? 'b-input' : 'h1'"
          :placeholder="isEdit || isNew ? 'Enter the title of post' : false"
        ></component>
        <component
          :is="isEdit || isNew ? 'b-input' : 'p'"
          :type="isEdit || isNew ? 'textarea' : false"
          :placeholder="isEdit || isNew ? 'Full description of the thing' : false"
        ></component>
      </div>
      <div>
        <section class='account'>
          <figure class='image is-48x48' v-if='isView'>
            <img
              class='is-rounded'
              src='https://bulma.io/images/placeholders/48x48.png'
              alt='Avatar image'
            >
          </figure>
          <div class='ml-2' v-if='isView'>
            <nuxt-link :to="{ name: 'account', params: { id: 1 } }"><b>Dmytro Soltusyuk</b></nuxt-link>
            <nuxt-link :to="{ name: 'account', params: { id: 1 } }"><small>On service since 12.02.2021</small>
            </nuxt-link>
          </div>
          <b-button type='is-warning' v-if='isView'>Make offline</b-button>
          <b-button type='is-primary' v-if='isView'>Contact</b-button>
          <categories />
          <b-button type='is-primary' v-if='isEdit || isNew'>Save</b-button>
        </section>
      </div>
    </section>
  </article>
</template>

<script>
import mapMixin from '~/mixins/map';
import MapMarkerControl from '@/components/MapMarkerControl';
import MapCircleControl from '@/components/MapCircleControl';

export default {
  name: 'PostForm',
  mixins: [mapMixin],
  props: {
    viewMode: {
      type: String,
      required: true,
    },
  },
  computed: {
    isNew() {
      return this.viewMode === 'new';
    },
    isEdit() {
      return this.viewMode === 'edit';
    },
    isView() {
      return this.viewMode === 'view';
    },
  },
  mounted() {
    this.$refs.map.$mapPromise.then(map => {
      const controlDiv = document.createElement('div');
      controlDiv.style.display = 'flex';
      controlDiv.style.flexDirection = 'column';

      this.createMapControls(map, controlDiv, [
        MapMarkerControl,
        MapCircleControl,
      ]);

      map.controls[this.google.maps.ControlPosition.TOP_RIGHT].push(controlDiv);
    });
  },
};
</script>

<style lang='scss' scoped>
$globalBreakpoint: $desktop;

article {
  display: flex;
  flex: 1;
  flex-direction: column;

  section {
    display: flex;
    flex: 10;

    &:nth-child(2n) {
      margin-top: 2rem;
    }

    &:last-child {
      flex: 4;
    }

    @include until($globalBreakpoint) {
      flex-direction: column;
    }

    div {
      display: flex;
      flex-direction: column;
      flex: 1;

      &:nth-child(2n) {
        @include from($globalBreakpoint) {
          margin-left: 1rem;
        }
      }

      button:nth-child(2n) {
        margin-top: 0.25rem;

        @include from($globalBreakpoint) {
          margin-top: 0;
          margin-left: 1rem;
        }
      }
    }
  }
}

div.is-clearfix {
  margin-left: 0 !important;
  margin-bottom: 1rem !important;
}

section.categories {
  flex: 1;
  height: 100%;
}

.account {
  display: flex;
  justify-content: space-between;
}
</style>
