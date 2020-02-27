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
        <v-toolbar-title>
          <v-icon x-large>mdi-battery-charging-100</v-icon>
          ELECTRIFY
        </v-toolbar-title>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-switch
              v-model="publiccheck"
              :label="`Public`"
      ></v-switch>

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
            class="white--text">
    </v-navigation-drawer>
    <v-navigation-drawer
            v-model="drawer"
            app
            clipped
            dark
            right
            class="white--text"
            v-if="station != null"
    >

      <v-icon x-large @click.stop="station = null">mdi-chevron-double-right</v-icon>
      <br>
      name: {{this.station.name}}
      <v-ul>
        <v-list v-for="plug in this.plugs" :key="plug.id">
          <li>
            {{plug.name}}
            <v-spacer></v-spacer>
          </li>
        </v-list>
      </v-ul>

    </v-navigation-drawer>
    <area-app-content :search-term=searchTerm
                      :publiccheck=publiccheck
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
      publiccheck: true,
      drawer: true,
      menu: null,
      station: null,
      plugs: null
    }),
    methods: {
      draw(event) {
        this.station = event[0];
        this.plugs = event[1];
        //console.log(this.station);
        //console.log(this.plugs);
      }
    }
  };
</script>
