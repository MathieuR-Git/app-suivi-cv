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
import Relance from "@/components/Relance/Relance.vue";
import NewJob from "@/components/newJob/newJob.vue";
import JobInfo from "@/components/JobInfo/JobInfo.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    component: Home,
    // component: { home: Home },
    path: "/",
    redirect: "/jobs",
    meta: { requiresAuth: true },
    props: true,
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
        props: true,
      },

      {
        path: "relance",
        name: "Relance",
        component: Relance,
        props: true,
      },
      {
        path: "new",
        name: "NewJob",
        component: NewJob,
      },
      {
        path: "jobInfo",
        name: "JobInfo",
        component: JobInfo,
        props: true,
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
  {
    path: "*",
    component: Home,
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
