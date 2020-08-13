import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";

/*********************************************
 *              Sub-components               *
 ********************************************/
import Jobs from "@/components/Jobs/Jobs.vue";
import Account from "@/components/Account/Account.vue";
import Application from "@/components/Application/Application.vue";
import Relance from "@/components/Relance/Relance.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    component: Home,
    // component: { home: Home },
    path: "/",
    meta: { requiresAuth: true },
    children: [
      {
        path: "jobs",
        name: "Jobs",
        component: Jobs,
        props: true,
      },
      {
        path: "account",
        name: "Account",
        component: Account,
      },
      {
        path: "application",
        name: "Application",
        component: Application,
      },
      {
        path: "relance",
        name: "Relance",
        component: Relance,
      },
    ],
  },
  {
    component: Register,
    path: "/register",
  },
  {
    component: Login,
    path: "/login",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

export default router;
