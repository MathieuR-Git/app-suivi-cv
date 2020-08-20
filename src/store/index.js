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
    candidatures: [
      // {
      //   id: "97eb48793051342b86ef121e022c037e",
      //   poste: "Chef des ventes",
      //   nomEntreprise: "Lejeune",
      //   IDOffre: "1a71489e9da93bb69fe1d0a84d471627",
      //   url: "http://www.rolland.fr/",
      //   statut: "Refusé",
      // },
      // {
      //   id: "170730306317311d81b9d16c7aa2b1fe",
      //   poste: "Plasticien",
      //   nomEntreprise: "Lefebvre SA",
      //   url: "https://www.marin.com/commodilaboriosamautetutetmollitiaautnulla",
      //   IDOffre: "1a71489e9da93bb69fe1d0a84d471628",
      //   statut: "Refusé",
      // },
      // {
      //   id: "742fef19d5d431c2b79475b1289444ce",
      //   poste: "Testeur informatique",
      //   nomEntreprise: "Fleury Gilbert SARL",
      //   url: "http://www.michaud.fr/optiominusetautincidunt",
      //   IDOffre: "1a71489e9da93bb69fe1d0a84d471629",
      //   statut: "En attente",
      // },
      // {
      //   id: "c6510dff479433b5a38ed0c8b6726466",
      //   poste: "Jointeur de placage",
      //   nomEntreprise: "Lefort",
      //   url: "http://mendes.fr/utilloofficiisutdolorin",
      //   IDOffre: "1a71489e9da93bb69fe1d0a84d471621",
      //   statut: "Accepté",
      // },
      // {
      //   id: "76cbd453440a35ce897c7d1b5c75a758",
      //   poste: "Conseiller relooking",
      //   nomEntreprise: "Lecoq S.A.",
      //   url: "http://www.leblanc.org/inexpeditaquidemsuscipitquisquamvoluptas",
      //   IDOffre: "1a71489e9da93bb69fe1d0a84d471111",
      //   statut: "Refusé",
      // },
      // {
      //   id: "e8c25b092da530769aecd00dadbf0a5b",
      //   poste: "Médiateur judiciaire",
      //   nomEntreprise: "Couturier",
      //   url:
      //     "http://blondel.fr/consecteturexcepturiutaperiamodiomaximerecusandae.html",
      //   IDOffre: "1a71489e9da93bb69fe1d0a84d471",
      //   statut: "En attente",
      // },
      // {
      //   id: "d6e28e24f24437f2a05460a92cf34171",
      //   poste: "Vendeur en épicerie",
      //   nomEntreprise: "Coste",
      //   url: "https://guyot.com/quiasequiconsequaturrerumasperioresab.html",
      //   IDOffre: "4c71489e9da93bb69fe1d0a84d471627",
      //   statut: "Accepté",
      // },
    ],
    relances: [
      // {
      //   id: "97eb48793051342b86ef121e022c037e",
      //   poste: "Chef des ventes",
      //   nomEntreprise: "Lejeune",
      //   IDOffre: "1a71489e9da93bb69fe1d0a84d471627",
      //   url: "http://www.rolland.fr/",
      //   statut: "refusé",
      // },
    ],
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
      return new Promise((resolve) => {
        commit("add_job", job);
        resolve();
      });
    },
    checkToken({ commit }) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        let token = Cookies.get("token");
        axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
        axios
          .post(process.env.VUE_APP_CHECK_TOKEN)
          .then((res) => {
            const user = res.data.user;

            commit("auth_success", token);
            commit("user_values", user);

            resolve(user);
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
      delete state.user.id;
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
