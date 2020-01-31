<template>
    <div>

    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "ElectrifyLayer",
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

            },
            async loadStationDetails() {

            }
        }


    }



</script>

<style scoped>

</style>
