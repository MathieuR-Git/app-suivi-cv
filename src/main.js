import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import BootstrapVue from "bootstrap-vue";
import Bootstrap from "bootstrap";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap/dist/css/bootstrap.css";

Vue.use(BootstrapVue, Bootstrap, VueAxios, axios);
Vue.config.productionTip = true;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
