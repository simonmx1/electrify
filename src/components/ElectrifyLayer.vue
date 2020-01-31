<template>
    <div>

    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "ElectrifyLayer",
        components: {
            axios
        },
        stations: null,
        async mounted() {
            await this.loadStations();
            await this.loadStationDetails();
        },
        methods: {
            async loadStations() {
                let response = await  axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
                this.stations = response;
            },
            async loadStationDetails() {

            }
        }


    }



</script>

<style scoped>

</style>
