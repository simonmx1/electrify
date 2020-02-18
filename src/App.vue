<template>
  <v-app>
    <v-app-bar
            app
            color=primary
            dark
    >
      <div class="d-flex align-center">
        <h1>ELECTRIFY</h1>
      </div>
    </v-app-bar>
    <v-navigation-drawer
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
