<template>
    <v-app>
        <v-app-bar
                app
                color=primary
                dark
                clipped-right
                clipped-left
        >
            <v-toolbar-title>
                <v-icon x-large>mdi-battery-charging-100</v-icon>
                ELECTRIFY
            </v-toolbar-title>
            <v-spacer></v-spacer>

            <v-text-field
                    v-model="searchTerm"
                    :append-icon-cb="() => {}"
                    placeholder="Nach Ladestation suchen..."
                    single-line
                    append-icon="search"
                    color="white"
                    hide-details
            />

        </v-app-bar>
        <v-navigation-drawer
                v-model="menu"
                app
                clipped
                dark
                mini-variant
                mini-variant-width="120"
                class="white--text">
            <v-switch
                    style="margin-left: 10px"
                    v-model="publicCheck"
                    :label="'Public'"
            ></v-switch>
        </v-navigation-drawer>
        <v-navigation-drawer
                app
                clipped
                dark
                right
                class="white--text"
                v-if="station != null"
        >
            <v-card class="white--text" dark>
                <v-card-title dark style="padding-left: 10px">
                    <v-icon x-large @click.stop="closeDrawer()">mdi-chevron-double-right</v-icon>
                    <h3>{{this.station.name}}</h3>
                </v-card-title>
                <hr>
                <ul>
                    Ort: {{this.station.city}}
                    <br>
                    Betreiber: {{this.station.origin}}
                    <br>
                    Access Type: <b><i>{{this.station.accessType}}</i></b>
                    <br>
                    Status: <b><i>{{this.station.state}}</i></b>
                    <br>
                    <br>
                    <v-list v-for="plug in this.plugs" :key="plug.id">
                    <hr>
                        <v-icon>mdi-battery-positive</v-icon>
                        {{plug.name}}
                        <div v-for="outlet in plug.outlets" :key="outlet.id">
                            <ul>
                                <li>
                                    Max Current: {{outlet.maxCurrent}}
                                </li>
                                <li>
                                    Max Power: {{outlet.maxPower}}
                                </li>
                                <li>
                                    Min Current: {{outlet.minCurrent}}
                                </li>
                            </ul>
                            <br>
                        </div>
                    </v-list>
                </ul>
            </v-card>

        </v-navigation-drawer>
        <app-content :search-term=searchTerm
                     :public-check=publicCheck
                     @click="click">

        </app-content>
        <v-footer
                app
                color=primary
                dark
        >Electrify
            <v-spacer/>
            © 2020
        </v-footer>
    </v-app>
</template>

<script>
    import AppContent from './components/AppContent';

    export default {
        name: 'App',

        components: {
            AppContent
        },

        data: () => ({
            searchTerm: null,
            publicCheck: true,
            drawer: false,
            menu: null,
            station: null,
            plugs: null
        }),
        methods: {
            click(event, plugs) {
                this.station = event;
                this.plugs = plugs;
                //this.drawer = true;
                console.log(event);
                console.log(plugs);
            },
            closeDrawer() {
                //this.drawer = false;
                this.station = null;
                this.plugs = null;
            }
        }
    };
</script>
