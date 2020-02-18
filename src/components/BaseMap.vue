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
  </l-map>
</template>

<script>
  import {LMap, LTileLayer} from 'vue2-leaflet';
  import axios from 'axios';

  export default {
    name: "GStatBaseMap",
    components: {
      LMap,
      LTileLayer
    },
    props: {
      height: {type: String, required: false, default: "900px"},
      zoom: {type: Number, required: false, default: 6},
      defaultCenter: {type: Array, required: false},
      searchTerm: {type: String, required: false, default: null}
    },
    async mounted() {
      await this.loadStations();
      await this.loadPlugs();

      let stationPlugs = this.getPlugsFromStation(this.stations[0].id);

      if (stationPlugs != null)
        stationPlugs.forEach(function (plug) {
          alert("plug: " + plug.name);
        });
      else
        alert("plugs = null")
    },
    methods: {
      onZoom(event) {
        this.$emit('zoom', event)
      },
      onMove(event) {
        this.$emit('move', event)
      },
      onMouseEnter(event) {
        this.$emit('mouseEnter', event)
      },
      onMouseLeave(event) {
        this.$emit('mouseLeave', event)
      },
      onMouseClick(event) {
        this.$emit('mouseClick', event)
      },
      async loadStations() {
        let response = await axios.get('https://ipchannels.integreen-life.bz.it/emobility/rest/get-station-details/');
        this.stations = response.data;
        //alert(this.stations);
      },
      async loadPlugs() {
        let response = await axios.get('https://ipchannels.integreen-life.bz.it/emobility/rest/plugs/get-station-details/');
        this.plugs = response.data;
        //alert(this.plugs[0].latitude);
      },
      getPlugsFromStation(id) {
        let ret = [];
        for (let i = 0; i < this.plugs.length; i++) {
          let plug = this.plugs[i];
          if (plug.parentStation == id) {
            ret.push(plug);
          }
        }
        return ret;
      }

    },
    data() {
      return {
        attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        center: this.defaultCenter
      }
    }
  }
</script>

<style scoped>
  @import "../../node_modules/leaflet/dist/leaflet.css";
</style>
