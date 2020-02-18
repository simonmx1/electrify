<template>
    <v-content style="height: 100%">
        <v-container
                fluid
                style="height: 100%; padding: 0"
        >
            <g-stat-base-map
                    :zoom="9"
                    :default-center="[46.4, 11.5]"
                    :search-term=this.searchTerm
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
    import GStatBaseMap from "./BaseMap";
    import axios from "axios";

    export default {
        name: "AreaAppContent",
        components: {
            GStatBaseMap
        },
        props: {
            searchTerm: {type: String, required: false, default: null}
        },
        data() {
            return {
                detailDialog: false,
                currentArea: null,
            }
        },
        created() {
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
                alert("plugs = null");
            this.filterStations();
        },
        methods: {
            onMouseClick(event) {
                this.detailDialog = true;
                this.currentArea = event;
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
            filterStations() {
                if(this.searchTerm != null)
                    alert(this.searchTerm);
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
