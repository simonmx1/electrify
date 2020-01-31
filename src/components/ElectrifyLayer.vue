<template>
    <div>

    </div>
</template>

<script>
    import axios from "axios";
    import L from "leaflet";

    export default {
        name: "ElectrifyLayer",
        components: {
            L
        },
        stations: null,
        async mounted() {
            await this.loadStations();
            await this.loadStationDetails();
        },
        methods: {
            async loadStations() {
                let response = await axios.get('https://ipchannels.integreen-life.bz.it/emobility/rest/get-station-details/');
                this.stations = response.data;
                //alert(this.stations);
                this.L.marker([this.stations.data[1].longitude, this.stations.data[1].latitude]).addTo(this.L.map('el'))

            },
            async loadStationDetails() {

            }
        }


    }



</script>

<style scoped>

</style>
