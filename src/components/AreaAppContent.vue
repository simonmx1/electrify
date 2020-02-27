<template>
  <v-content style="height: 100%">
    <v-container
            fluid
            style="height: 100%; padding: 0"
    >
      <g-stat-base-map
              v-if=this.filteredStations
              :zoom="9"
              :default-center="[46.4, 11.5]"
              :search-term=this.searchTerm
              :stations=this.filteredStations
              @mouseClick="onMouseClick"
              class="float-none"
              ref="map"
              style="z-index: 0"
              @drawer="drawer"
      />
      <!--v-dialog
              v-model="detailDialog"
              app
              right
              clipped
              dark
              hide-overlay
              max-width="800px"
      >
      </v-dialog-->
    </v-container>
  </v-content>
</template>

<script>
  import GStatBaseMap from "./BaseMap";
  import axios from "axios";


  export default {
    name: "AreaAppContent",
    components: {
      GStatBaseMap
    },
    props: {
      searchTerm: {type: String, required: false, default: null},
      publiccheck: {type: Boolean, required: false, default: false}
    },
    watch: {
      searchTerm: function () {
        this.filterStations();
      },
      publiccheck: function () {
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
        //console.log(this.plugs);
        let event = [e, this.getPlugsFromStation(e)];

        this.$emit("drawer", event);
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
      },
      async filterStations() {
        this.filteredStations = [];
        console.log("filter" + this.publiccheck);
        for (let i = 0; i < this.stations.length; i++) {
          if (!this.publiccheck || this.stations[i].accessType == "PUBLIC") {
            //console.log("public");
            if (this.searchTerm == null) {
              this.filteredStations.push(this.stations[i]);
            } else {
              if (this.stations[i].name.contains(this.searchTerm)) {
                this.filteredStations.push(this.stations[i]);
              }
            }
          }
        }
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
