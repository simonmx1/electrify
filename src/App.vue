<template>
    <v-app>
        <v-app-bar
                app
                color=primary
                dark
                clipped-left
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>
                <v-icon>mdi-linux</v-icon>
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
                v-model="drawer"
                app
                clipped
                dark
                class="white--text"
                v-if="station != null"
        >

            name: {{this.station.name}}
            <!--v-ul>
                <v-list v-for="plug in this.plugs" :key="plug.id">
                    {{plug.name}}
                </v-list>
            </v-ul-->

        </v-navigation-drawer>
        <area-app-content :search-term=searchTerm
        @drawer="draw">

        </area-app-content>
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
    import AreaAppContent from './components/AreaAppContent';

    export default {
        name: 'App',

        components: {
            AreaAppContent
        },

        data: () => ({
            searchTerm: null,
            drawer: true,
            station: null,
            plugs: null
        }),
        methods:{
            draw(event){
                this.station = event[0];
                this.plugs = event[1];
            }
        }
    };
</script>
