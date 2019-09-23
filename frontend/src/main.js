import Axios from "axios";
import Vue from "vue";
import App from "./App.vue";
import { server } from "./helper";
import router from "./router";

Vue.config.productionTip = false;

const axios = new Axios.create({
  baseURL: server.baseURL
});

axios.interceptors.response.use(v => v, err => err);

Vue.prototype.$axios = axios;

new Vue({
  el: "#app",
  router,
  render: h => h(App)
}).$mount("#app");
