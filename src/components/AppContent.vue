<template>
  <v-content style="height: 100%">
    <v-container
            fluid
            style="height: 100%; padding: 0"
    >
      <base-map
              v-if=this.filteredStations
              :zoom="9"
              :default-center="[46.4, 11.5]"
              :search-term=this.searchTerm
              :stations=this.filteredStations
              class="float-none"
              ref="map"
              style="z-index: 0"
              @drawer="drawer()"
      />
    </v-container>
  </v-content>
</template>

<script>
  import BaseMap from "./BaseMap";
  import axios from "axios";

  export default {
    name: "AppContent",
    components: {
      BaseMap
    },
    props: {
      searchTerm: {type: String, required: false, default: null},
      publicCheck: {type: Boolean, required: false, default: true}
    },
    watch: {
      searchTerm: function () {
        this.filterStations();
      },
      publicCheck: function () {
        console.log("public change");
        this.filterStations();
      }
    },
    data() {
      return {
        stations: null,
        plugs: null,
        filteredStations: null,
      }
    },
    created() {
    },
    async mounted() {
      await this.loadStations();
      await this.loadPlugs();
      this.filterStations();
    },
    methods: {
      drawer(e) {
        let event = [e, this.getPlugsFromStation(e)];

        this.$emit("drawer", event);
      },
      async loadStations() {
        let response = await axios.get('https://ipchannels.integreen-life.bz.it/emobility/rest/get-station-details/');
        this.stations = response.data;
      },
      async loadPlugs() {
        let response = await axios.get('https://ipchannels.integreen-life.bz.it/emobility/rest/plugs/get-station-details/');
        this.plugs = response.data;
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
      },
      async filterStations() {
        this.filteredStations = [];
        for (let i = 0; i < this.stations.length; i++) {
          if (!this.publicCheck || this.stations[i].accessType == "PUBLIC") {
            console.log("public");
            if (this.searchTerm == null) {
              this.filteredStations.push(this.stations[i]);
            } else {
              if (this.stations[i].name.toLowerCase().includes(this.searchTerm.toLowerCase())) {
                this.filteredStations.push(this.stations[i]);
              }
            }
          }
        }
        console.log("finished");
      }
    }
  }
</script>

<style>
  table {
    width: 100%;
  }

  tr {
    width: 100%;
  }

  .zindexmax {
    z-index: 1000;
  }
</style>
