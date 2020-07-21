import Vue from "vue";
import App from "./App.vue";
// import Home from "./views/Home.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
// import Cookies from "js-cookie";
import BootstrapVue from "bootstrap-vue";
import Bootstrap from "bootstrap";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap/dist/css/bootstrap.css";
Vue.use(BootstrapVue, Bootstrap, VueAxios, axios);
// Vue.use(BootstrapVue, Bootstrap);
//Vue.use(Bootstrap);
Vue.config.productionTip = true;
// Vue.prototype.$http = Axios;
// const token = Cookies.get("token");
// if (token) {
//   Vue.prototype.$http.defaults.headers.common["Authorization"] = token;
// }
new Vue({
  router,
  store,
  // render: (h) => h(Home),
  render: (h) => h(App),
}).$mount("#app");
