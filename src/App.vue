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
    >

      hello
    </v-navigation-drawer>
    <area-app-content :search-term=searchTerm>

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
      searchTerm: null
    }),
  };
</script>
