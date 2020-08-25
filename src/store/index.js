import Vue from "vue";
import Vuex from "vuex";
import Cookies from "js-cookie";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tokenAlreadyChecked: false,
    user: null,
    token: Cookies.get("token"),
    status: "",
    lastTimeLogged: "",
    candidatures: [],
    relances: [],
    error: {},
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, token) {
      state.status = "success";
      state.token = token;
      state.tokenAlreadyChecked = true;
    },
    user_values(state, user) {
      state.user = user;
      state.candidatures = user.candidatures;
      state.relances = user.relances;
    },
    auth_error(state, error) {
      state.status = "error";
      state.error = error;
    },
    logout(state) {
      state.status = "";
      state.token = "";
    },
    user_values_change_request(state) {
      state.status = "loading";
    },
    user_values_change_error(state) {
      state.status = "error";
    },
    user_values_change_success(state) {
      state.status = "success";
    },
    user_values_change_name(state, nom) {
      state.user.nom = nom;
    },
    user_values_change_email(state, email) {
      state.user.email = email;
    },
    add_job(state, job) {
      state.candidatures.push(job);
    },
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios
          .post(process.env.VUE_APP_LOGIN_URL, user)
          .then((res) => {
            const token = res.data.token;
            const user = res.data.user;
            let nom = user.nom;
            delete user.nom;
            nom.replace(/%20/g, " ");
            user.nom = nom;
            Cookies.set("token", token);

            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            commit("auth_success", token);
            commit("user_values", user);

            resolve(res);
          })
          .catch((err) => {
            commit("auth_error");
            Cookies.remove("token");
            reject(err);
          });
      });
    },
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios
          .post(process.env.VUE_APP_REGISTER_URL, user)
          .then((resp) => {
            const token = resp.data.token;
            const user = resp.data.user;
            Cookies.set("token", token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            commit("auth_success", token);
            commit("user_values", user);

            resolve(resp);
          })
          .catch((err) => {
            commit("auth_error", err);
            Cookies.remove("token");
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit("logout");
        Cookies.remove("token");
        delete axios.defaults.headers.common["Authorization"];
        resolve();
      });
    },
    addJob({ commit }, job) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        const token = Cookies.get("token");
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        axios
          .post(process.env.VUE_APP_CREATE_JOB, job)
          .then((resp) => {
            commit("auth_success", token);
            commit("add_job", resp.data);
            resolve(resp);
          })
          .catch((err) => {
            commit("auth_error", err);
            Cookies.remove("token");
            reject(err);
          });
      });
    },
    checkToken({ commit }) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        let token = Cookies.get("token");
        axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
        axios
          .post(process.env.VUE_APP_CHECK_TOKEN)
          .then((user) => {
            commit("auth_success", token);
            commit("user_values", user.data.user);
            resolve(user);
          })
          .catch((err) => {
            commit("auth_error", err);
            Cookies.remove("token");
            commit("logout");
            reject(err);
          });
      });
    },
    deleteAccount({ commit }, id) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        let token = Cookies.get("token");
        axios.defaults.headers.common = {
          Authorization: `Bearer ${token}`,
        };
        axios
          .delete(process.env.VUE_APP_DELETE_ACCOUNT`${id}`)
          .then(() => {
            commit("logout");
            Cookies.remove("token");
            delete axios.defaults.headers.common["Authorization"];
            resolve();
          })
          .catch((err) => {
            commit("auth_error", err);
            Cookies.remove("token");
            reject(err);
          });
      });
    },
    editUser({ commit }, dataChanged) {
      return new Promise((resolve, reject) => {
        commit("user_values_change_request");
        /*
        DEFINE HEADER
         */
        let token = Cookies.get("token");
        axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

        if (dataChanged.nom) {
          commit("user_values_change_name", dataChanged.nom);
          axios
            .post(process.env.VUE_APP_EDIT_USER + dataChanged.id, dataChanged, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              commit("user_values_change_success", res);
              resolve(res);
            })
            .catch((err) => {
              commit("user_values_change_error", err);
              reject(err);
            });
        } else if (dataChanged.email) {
          commit("user_values_change_email", dataChanged.email);
          axios
            .post(process.env.VUE_APP_EDIT_USER + dataChanged.id, dataChanged, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              commit("user_values_change_success", res);
              resolve(res);
            })
            .catch((err) => {
              commit("user_values_change_error", err);
              reject(err);
            });
        }
      });
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
    user: (state) => {
      delete state.user.motdepasse;
      return state.user;
    },
    error: (state) => state.error,
    success: (state) =>
      state.candidatures.reduce(
        (total, job) =>
          job.statut === "accepté" || job.statut === "Accepté"
            ? total + 1
            : total,
        0
      ),
    waiting: (state) =>
      state.candidatures.reduce(
        (total, job) =>
          job.statut === "en attente" || job.statut === "En attente"
            ? total + 1
            : total,
        0
      ),
    rejected: (state) =>
      state.candidatures.reduce(
        (total, job) =>
          job.statut === "refusé" || job.statut === "Refusé"
            ? total + 1
            : total,
        0
      ),
    jobs: (state) => state.candidatures,
    relances: (state) => state.relances,
    tokenChecked: (state) => state.tokenAlreadyChecked,
  },
  modules: {},
});
