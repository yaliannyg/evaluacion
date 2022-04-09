import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
const apiBaseUrl = "http://localhost:8081";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    members: [],
    progressShowFlag: false,
    snackbar: {
      showSnackBarFlag: false,

      text: "",
      color: "",
    },
  },
  getters: {
    showSnackBarFlag(state) {
      return state.snackbar.showSnackBarFlag;
    },
  },
  mutations: {
    setIsAuthenticated(state, newState) {
      state.isAuthenticated = newState;
    },
    setMembers(state, newState) {
      state.members = newState;
    },
    setProgressShowFlag(state, newState) {
      state.progressShowFlag = newState;
    },
    setSnackbar(state, newState) {
      this.state.snackbar.showSnackBarFlag = newState.showSnackBarFlag;
      if (newState.showSnackBarFlag) {
        let colors = {
          danger: "red darken-2",
          success: "green darken-2",
        };

        (state.snackbar.text = newState.text),
          (state.snackbar.color = colors[newState.status]);
      } else {
        state.snackbar.text = "";
        state.snackbar.color = "";
      }
    },
  },
  actions: {
    logout({ commit }) {
      commit("setIsAuthenticated", false);
      localStorage.removeItem("token");
    },
    async getAuth({ commit }, { username, password }) {
      commit("setProgressShowFlag", true);
      let res;
      try {
        res = axios({
          method: "POST",
          url: `${apiBaseUrl}/auth`,

          data: {
            username,
            password,
          },
        });
      } catch (error) {
        commit("setSnackbar", {
          showSnackBarFlag: true,
          text: `Something went wrong. Server problem`,
          status: "danger",
        });
      }
      commit("setProgressShowFlag", false);

      return res;
    },
    async saveMember({ commit }, { firstName, lastName, address, ssn }) {
      let res;
      try {
        res = await axios({
          method: "POST",
          url: `${apiBaseUrl}/api/members`,

          data: { firstName, lastName, address, ssn },
        });

        const members = await axios({
          method: "GET",
          url: `${apiBaseUrl}/api/members`,
        });
        commit("setSnackbar", {
          showSnackBarFlag: true,
          text: "Member Saved",
          status: "success",
        });
        commit("setMembers", members.data);
      } catch (error) {
        console.log(error.response.data.message);
        commit("setSnackbar", {
          showSnackBarFlag: true,
          text: error.response.data.message,
          status: "danger",
        });
      }
      return res;
    },
    async getMembers({ commit }) {
      commit("setProgressShowFlag", true);
      try {
        const res = await axios({
          method: "GET",
          url: `${apiBaseUrl}/api/members`,
        });
        commit("setSnackbar", {
          showSnackBarFlag: true,
          text: "Members Fetched",
          status: "success",
        });
        commit("setMembers", res.data);
      } catch (error) {}
      commit("setProgressShowFlag", false);
    },
  },
  modules: {},
});
