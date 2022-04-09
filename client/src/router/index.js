import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";

import store from "@/store/index";
import axios from "axios";
Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "home",
    component: Home,
  },

  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { isPublic: true },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response.status === 401) {
        localStorage.removeItem("token");

        await store.commit("setIsAuthenticated", false);
        store.commit("setProgressShowFlag", false);
        return next("/login");
      }
      return Promise.reject(error);
    }
  );
  let isAuthenticaded = localStorage.getItem("token");

  if (!to.meta.isPublic && !isAuthenticaded) {
    return next("/login");
  }

  if (isAuthenticaded) {
    axios.interceptors.request.use(
      (config) => {
        config.headers["Authorization"] = `Bearer ${isAuthenticaded}`;
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );
    store.commit("setIsAuthenticated", true);
  } else {
  }

  if (to.name === "Login" && isAuthenticaded) {
    return next("/home");
  }

  return next();
});
export default router;
