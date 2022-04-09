<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      v-if="isAuthenticated"
      class="d-flex justify-end"
    >
      <v-btn @click="logoutUser">Logout</v-btn>
    </v-app-bar>

    <v-main>
      <v-overlay :value="progressShowFlag">
        <v-progress-circular
          indeterminate
          size="64"
          color="primary"
          z-index="5"
        ></v-progress-circular>
      </v-overlay>
      <v-snackbar
        :value="showSnackBarFlag"
        @input="changeSnackbar"
        absolute
        top
        right
        class="ma-0 pa-0"
        :color="snackbar.color"
        outlined
        :timeout="2000"
      >
        {{ snackbar.text }}
        <template v-slot:action="{ attrs }">
          <v-btn
            text
            v-bind="attrs"
            dense
            @click="setSnackbar({ showSnackBarFlag: false })"
            ><v-icon dark>mdi-close</v-icon></v-btn
          >
        </template>
      </v-snackbar>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";

export default {
  name: "App",
  created() {
    this.setupTimers();
  },
  computed: {
    ...mapState(["isAuthenticated", "progressShowFlag", "snackbar"]),
    ...mapGetters(["showSnackBarFlag"]),
  },
  data() {
    return {
      timeoutInMS: 120000,
      timer: null,
      snackBarFlag: false,
    };
  },
  methods: {
    ...mapMutations(["setSnackbar"]),
    ...mapActions(["logout", "getMembers"]),
    changeSnackbar(value) {
      this.setSnackbar({ showSnackBarFlag: value });
    },
    logoutUser() {
      this.logout();
      this.$router.push("/login");
    },
    setupTimers() {
      document.addEventListener("keypress", this.resetTimer, false);
      document.addEventListener("mousemove", this.resetTimer, false);
      document.addEventListener("mousedown", this.resetTimer, false);
      document.addEventListener("touchmove", this.resetTimer, false);

      this.startTimer();
    },
    startTimer() {
      this.timer = setTimeout(this.handleInactive, this.timeoutInMS);
    },
    resetTimer() {
      clearTimeout(this.timer);
      this.startTimer();
    },
    async handleInactive() {
      await this.getMembers();
      this.startTimer();
    },
  },
};
</script>

<style lang="css">
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  transition: background-color 5000s ease-in-out 0s;
}
</style>
