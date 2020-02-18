<template>
  <v-app>
    <v-app-bar
            app
            color=primary
            dark
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
              placeholder="Nach Gebiet suchen..."
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
    >

      hello
    </v-navigation-drawer>
    <area-app-content>

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
      //
    }),
  };
</script>
