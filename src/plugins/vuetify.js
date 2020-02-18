import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import "material-design-icons-iconfont/dist/material-design-icons.css"


Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'md'
  },
  theme: {
    themes: {
      light: {
        primary: '#005AA7',
        secondary: '#FFFDE4'
      },
      dark: {
        primary: '#89253e',
        secondary: '#363636',
      }
    }
  }

});
