import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import colors from "vuetify/lib/util/colors";
Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: "#AAA1C8",
        secondary: "#967AA1",
        accent: "#fff",
        error: "#FF5252",
        info: "#fff",
        success: "#4CAF50",
        warning: "#FFC107",
        background: "#192A51",
        light: "#F5E6E8",
        transparent: colors.transparent,
      },
    },
  },
});
