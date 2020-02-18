<template>
  <l-map
    :style="{
      height: '100%'
    }"
    :zoom="zoom"
    :center="center"
    @update:zoom="onZoom"
    @move="onMove"
    ref="map"
  >
    <l-tile-layer
      :url="'http://{s}.tile.osm.org/{z}/{x}/{y}.png'"
      :attribution="attribution"
    />
    <l-marker v-for="l in stations" :key="l.name" :lat-lng="convertLatLng(l)" :icon="icon"/>
  </l-map>
</template>

<script>
  import {LMap, LTileLayer, LMarker } from 'vue2-leaflet';
  import { latLng, icon, Icon } from 'leaflet';
  import iconUrl from 'leaflet/dist/images/marker-icon.png';
  import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

  export default {
    name: "GStatBaseMap",
    components: {
      LMap,
      LTileLayer,
      LMarker
    },
    props: {
      height: {type: String, required: false, default: "900px"},
      zoom: {type: Number, required: false, default: 6},
      defaultCenter: {type: Array, required: false},
      searchTerm: {type: String, required: false, default: null},
      stations: {type: Array, required: true}
    },
    methods: {
      convertLatLng(l) {
        return latLng(l.latitude, l.longitude);
      },
      onZoom(event) {
        this.$emit('zoom', event)
      },
      onMove(event) {
        this.$emit('move', event)
      },
      onMouseClick(event) {
        this.$emit('mouseClick', event)
      }

    },
    data() {
      let customicon = icon(Object.assign({},
        Icon.Default.prototype.options,
        {iconUrl, shadowUrl}
      ));
      return {
        icon: customicon,
        attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        center: this.defaultCenter,
      }
    }
  }
</script>

<style scoped>
  @import "../../node_modules/leaflet/dist/leaflet.css";
</style>
