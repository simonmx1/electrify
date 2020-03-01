<template>
    <v-content style="height: 100%">
        <v-container
                fluid
                style="height: 100%; padding: 0"
        >
            <base-map
                    v-if="stations"
                    :zoom="9"
                    :default-center="[46.4, 11.5]"
                    :search-term=searchTerm
                    :public-check="publicCheck"
                    :stations="stations"
                    class="float-none"
                    ref="map"
                    style="z-index: 0"
                    @click="click"
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
        data() {
            return {
                stations: null,
                plugs: null,
            }
        },
        async mounted() {
            await this.loadStations();
            await this.loadPlugs();
        },
        methods: {
            click(event) {
                //console.log(event)
                this.$emit("click", event, this.getPlugsFromStation(event.id));
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
                //console.log(this.plugs);
                for (let i = 0; i < this.plugs.length; i++) {
                    let plug = this.plugs[i];
                    if (plug.parentStation == id) {
                        ret.push(plug);
                    }
                }
                return ret;
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
