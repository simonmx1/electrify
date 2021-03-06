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
        <marker-cluster
                v-if="filteredStations"
        >
            <l-marker
                    v-for="l in filteredStations"
                    :key="l.id"
                    :lat-lng="convertLatLng(l)"
                    :icon="getMarkerIcon(l)"
                    @mouseup="click(l)"
            ></l-marker>
        </marker-cluster>
    </l-map>
</template>

<script>
    import {LMap, LTileLayer, LMarker} from 'vue2-leaflet';
    import L, {latLng} from 'leaflet';
    import Vue2LeafletMarkercluster from 'vue2-leaflet-markercluster';

    export default {
        name: "BaseMap",
        components: {
            LMap,
            LTileLayer,
            LMarker,
            'marker-cluster': Vue2LeafletMarkercluster,
        },
        props: {
            height: {type: String, required: false, default: "900px"},
            zoom: {type: Number, required: false, default: 6},
            defaultCenter: {type: Array, required: false},
            searchTerm: {type: String, required: false, default: null},
            publicCheck: {type: Boolean, required: false, default: true},
            stations: {type: Array, required: true},
            //Styling Marker
            iconFunc: {type: Function, required: false, default: defaultIconFunc},
            iconColorFunc: {type: Function, required: false, default: defaultIconColorFunc},
            markerColorFunc: {type: Function, required: false, default: defaultMarkerColorFunc},
        },
        watch: {
            searchTerm: function () {
                this.filterStations();
            },
            publicCheck: function () {
                this.filterStations();
            }
        },
        mounted() {
            this.filterStations();
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
            click(event) {
                this.$emit('click', event);
            },
            getMarkerIcon: function (item) {
                return new this.IconMaterial({
                    icon: this.iconFunc(item),
                    iconColor: this.iconColorFunc(item),
                    markerColor: this.markerColorFunc(item)
                })
            },
            async filterStations() {
                this.filteredStations = null;
                let filteredStations = [];
                for (let i = 0; i < this.stations.length; i++) {
                    if (this.stations[i] && !this.publicCheck || this.stations[i].accessType == "PUBLIC") {
                        if (this.searchTerm == null) {
                            filteredStations.push(this.stations[i]);
                        } else {
                            if (this.stations[i].city.toLowerCase().includes(this.searchTerm.toLowerCase())) {
                                filteredStations.push(this.stations[i]);
                            }
                        }
                    }
                }
                this.filteredStations = filteredStations;
            }
        },
        data() {
            return {
                filteredStations: null,
                attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                center: this.defaultCenter,
                IconMaterial: L.Icon.extend({
                    options: {
                        className: 'l-icon-material',
                        icon: null,
                        markerColor: '#FFFFFF',
                        iconColor: '#000000',
                        outlineColor: '#000000',
                        outlineWidth: '1'
                    },
                    initialize: function (options) {
                        this.options = L.Util.setOptions(this, options);
                    },
                    createIcon: function () {
                        let options = L.Util.setOptions(this, this.options);
                        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                        let path = document.createElementNS('http://www.w3.org/2000/svg', "path");
                        let icon = document.createElementNS('http://www.w3.org/2000/svg', "foreignObject");

                        svg.setAttribute('width', '31');
                        svg.setAttribute('height', '42');
                        svg.setAttribute('class', 'l-icon-material');
                        svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");

                        path.setAttributeNS(null, "d", "M15.6,1c-7.7,0-14,6.3-14,14c0,10.5,14,26,14,26s14-15.5,14-26C29.6,7.3,23.3,1,15.6,1z");
                        path.setAttribute('fill', options.markerColor);
                        path.setAttribute('stroke', options.outlineColor);
                        path.setAttribute('stroke-width', options.outlineWidth);
                        svg.append(path);

                        icon.setAttribute('width', '31');
                        icon.setAttribute('height', '42');
                        icon.setAttribute('class', `node mdi ${options.icon}`);
                        icon.setAttribute('fill', options.iconColor);
                        svg.appendChild(icon);

                        return svg;
                    }
                })
            }
        }
    }

    function defaultIconFunc() {
        return "mdi-battery-charging-100";
    }

    function defaultMarkerColorFunc() {
        return "#FFFFFF"
    }

    function defaultIconColorFunc() {
        return "#000000"
    }
</script>

<style>
    @import "~leaflet.markercluster/dist/MarkerCluster.css";
    @import "~leaflet.markercluster/dist/MarkerCluster.Default.css";
    @import "../../node_modules/leaflet/dist/leaflet.css";

    .l-icon-material {
        margin-top: -42px;
        margin-left: -17px;
        position: absolute;
        left: 0;
        top: 0;
        display: block;
        text-align: center;
        font-size: 20px;
    }
</style>
