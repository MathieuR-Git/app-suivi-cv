import Vue from "vue";
import App from "./App.vue";
// import Home from "./views/Home.vue";
import router from "./router";
import store from "./store";
import BootstrapVue from "bootstrap-vue";
import Bootstrap from "bootstrap";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap/dist/css/bootstrap.css";
Vue.use(BootstrapVue, Bootstrap);
//Vue.use(Bootstrap);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  // render: (h) => h(Home),
  render: (h) => h(App),
}).$mount("#app");
