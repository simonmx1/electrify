<template>
  <v-content style="height: 100%">
    <v-container
      fluid
      style="height: 100%; padding: 0"
    >
      <g-stat-base-map
        :zoom="9"
        :default-center="[46.4, 11.5]"
        :search-term="searchTerm"
        @mouseClick="onMouseClick"
        class="float-none"
        ref="map"
        style="z-index: 0"
      />
      <v-dialog
        v-model="detailDialog"
        app
        right
        clipped
        dark
        hide-overlay
        max-width="800px"
      >
      </v-dialog>
    </v-container>
  </v-content>
</template>

<script>
  import GStatBaseMap from "./GStatBaseMap";
  //import ResultDiagram from "./ResultDiagram";

  export default {
    name: "AreaAppContent",
    components: {
      //ResultDiagram,
      GStatBaseMap
    },
    props: {
      searchTerm: {type: String, required: false, default: null}
    },
    data() {
      return {
        detailDialog: false,
        currentArea: null,
        spinning: false,

        geoJson: null,
        geoData: null,
        scales: null
      }
    },
    created() {
    },
    async mounted() {
      //this.spinning = true;
    },
    methods: {
      onMouseClick(event) {
        this.detailDialog = true;
        this.currentArea = event.target.feature;
        //this.$refs.map.centerOn(event.target);
      },
      legendArray() {
        let ret = [];
        let data = this.geoData[this.currentArea.id];
        for (let scale of Object.keys(data)) {
          if (this.scales[scale]) {
            ret.push({
              scale: this.scales[scale],
              value: data[scale],
              percentage: data[scale] * 100 / data['totalValue']
            })
          }
        }
        ret.sort((s1, s2) => s2.value - s1.value);
        return ret;
      },
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
