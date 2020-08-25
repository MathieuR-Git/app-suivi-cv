<template
  ><section>
    <h2>Mon compte</h2>
    <hr class="solid" />
    <article class="container mt-5" v-if="!loading">
      <form>
        <div class="row ">
          <div class="col-md-6">
            <div class="card border-left-info shadow h-100 py-2">
              <div class="row">
                <div class="col-12 edit mb-n3">
                  <FaTimesCircle
                    @change-value="edit"
                    :input="{ inputNom: inputNom }"
                    value="nom"
                    v-if="!inputNom && !saveNom"
                  />
                  <FaEdit
                    @change-value="edit"
                    :input="{ inputNom: inputNom }"
                    value="nom"
                    v-else-if="inputNom"
                  />
                </div>
              </div>
              <div class="card-body">
                <div class="row no-gutters align-items-center">
                  <div class="col-11 mr-2">
                    <div
                      class="text-xd font-weight-bold text-info text-uppercase mb-1"
                    >
                      Nom
                    </div>
                    <input
                      type="text"
                      class="h5 mb-0 ml-5 font-weight-bold text-gray-800 input"
                      v-model="nom"
                      :disabled="inputNom"
                      @input="myChangeFunction"
                      ref="nom"
                      id="nom"
                    />
                  </div>
                  <div class="col-auto">
                    <i class="fas fa-user fa-2x info"></i>
                  </div>
                </div>
              </div>
              <div class="row" v-if="saveNom">
                <div class="col-6 text-center">
                  <button class="btn btn-info" @click="save" value="nom">
                    <i class="fas fa-save"></i> Enregistrer la modification
                  </button>
                </div>
                <div class="col-6 text-center">
                  <button class="btn btn-danger" @click="cancel" value="nom">
                    <i class="fas fa-ban"></i> Annuler la modification
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card border-left-info shadow h-100 py-2">
              <div class="row">
                <div class="col-12 edit mb-n3">
                  <FaTimesCircle
                    @change-value="edit"
                    :input="{ inputEmail: inputEmail }"
                    value="email"
                    v-if="!inputEmail && !saveEmail"
                  />
                  <FaEdit
                    @change-value="edit"
                    :input="{ inputEmail: inputEmail }"
                    value="email"
                    v-else-if="inputEmail"
                  />
                </div>
              </div>
              <div class="card-body">
                <div class="row no-gutters align-items-center">
                  <div class="col-11 mr-2">
                    <div
                      class="text-xd font-weight-bold text-info text-uppercase mb-1"
                    >
                      Email
                    </div>
                    <input
                      type="text"
                      class="h5 mb-0 ml-5 font-weight-bold text-gray-800 input email"
                      v-model="email"
                      :disabled="inputEmail"
                      @input="myChangeFunction"
                      id="email"
                      ref="email"
                    />
                  </div>
                  <div class="col-auto">
                    <i class="fas fa-at fa-2x info"></i>
                  </div>
                </div>
              </div>
              <div class="row" v-if="saveEmail">
                <div class="col-6 text-center">
                  <button class="btn btn-info" @click="save" value="email">
                    <i class="fas fa-save"></i> Enregistrer la modification
                  </button>
                </div>
                <div class="col-6 text-center">
                  <button class="btn btn-danger" @click="cancel" value="email">
                    <i class="fas fa-ban"></i> Annuler la modification
                  </button>
                </div>
              </div>
            </div>
          </div>
          <OffersAccount />
        </div>
      </form>
      <div class="row  btn-delete">
        <div class="col-12 text-md-right ">
          <!-- <button class="btn btn-danger btn-lg" @click="showModalWindow"> -->
          <b-button
            v-b-modal.modal-1
            class="btn btn-danger btn-lg"
            @click="showModal = true"
          >
            Supprimer mon compte
          </b-button>
        </div>
      </div>
      <FaBack />
    </article>
    <Loader v-else />
    <b-modal size="lg" id="modal-1" centered hide-footer v-if="showModal">
      <!-- <template v-slot:modal-header> -->
      <template v-slot:modal-header style="text-align:center;">
        <h5>Suppression du compte</h5>
        <a @click="close"><i class="fas fa-times fa-lg"></i></a>
        <!-- <b-icon icon="X" font-scale="2" variant="danger"> </b-icon> -->
      </template>
      <div style="text-align:center; height:20vh; padding-top: 5vh;">
        <b class="my-4">Souhaitez-vous vraiment supprimer votre compte ?</b>
        <p><i class="my-4">Aucun retour en arrière ne sera possible.</i></p>
      </div>
      <footer class="footer">
        <b-button variant="success" @click="deleteAccount">
          Confirmer
        </b-button>
        <b-button variant="danger" @click="close">
          Annuler
        </b-button>
        <!-- <b-button variant="danger" @click="showModal = false">
          Annuler
        </b-button> -->
      </footer>
    </b-modal>
  </section>
</template>

<script>
import Loader from "../Loader/Loader";
import FaTimesCircle from "../../Icons/FaTimesCircle";
import FaEdit from "../../Icons/FaEdit";
import FaBack from "../../Icons/FaBack";
import OffersAccount from "./Offers";

export default {
  name: "Account",
  components: {
    FaTimesCircle,
    FaEdit,
    FaBack,
    OffersAccount,
    Loader,
  },
  data() {
    return {
      user: "",
      nom: "",
      email: "",
      inputNom: true,
      inputEmail: true,
      saveNom: false,
      saveEmail: false,
      loading: false,
      showModal: false,
    };
  },
  methods: {
    setUser: function(user) {
      if (user) {
        this.user = user;
        this.nom = user.nom;
        this.email = user.email;
        this.loading = false;
      }
    },

    close: function(e) {
      e.preventDefault();
      this.showModal = false;
    },
    deleteAccount: function() {
      this.$store.dispatch("deleteAccount").then(() => {
        this.$router.push("/register");
      });
    },
    edit(payload) {
      if (typeof payload.inputEmail === "boolean") {
        this.inputEmail = payload.inputEmail;
        if (this.inputEmail === false) {
          let length = this.$refs.email.value.length;
          this.$nextTick(
            () => this.$refs.email.focus(),
            this.$refs.email.setSelectionRange(length, length)
          );
        } else {
          if (this.user.email === this.email) {
            this.saveEmail = false;
          }
        }
      } else if (typeof payload.inputNom === "boolean") {
        this.inputNom = payload.inputNom;
        if (this.inputNom === false) {
          let length = this.$refs.nom.value.length;
          this.$nextTick(
            () => this.$refs.nom.focus(),
            this.$refs.nom.setSelectionRange(length, length)
          );
        } else {
          if (this.user.nom === this.nom) {
            this.saveNom = false;
          }
        }
      }
    },
    save: function(event) {
      event.preventDefault();
      switch (event.target.value) {
        case "nom": {
          let data = (data = { id: this.user.id, nom: this.nom });
          this.$store.dispatch("editUser", data);
          this.inputNom = true;
          this.saveNom = false;
          this.nom = this.user.nom;
          break;
        }
        case "email": {
          let data = (data = { id: this.user.id, email: this.email });
          this.$store.dispatch("editUser", data);
          this.email = this.user.email;
          this.inputEmail = true;
          this.saveEmail = false;
          break;
        }
        default:
          break;
      }
    },
    cancel: function(event) {
      event.preventDefault();
      switch (event.target.value) {
        case "nom": {
          this.inputNom = true;
          this.saveNom = false;
          this.nom = this.user.nom;
          break;
        }
        case "email": {
          this.email = this.user.email;
          this.inputEmail = true;
          this.saveEmail = false;
          break;
        }
        default:
          break;
      }
    },
    myChangeFunction: function(value) {
      switch (value.target.id) {
        case "nom": {
          if (this.user.nom !== this.nom) {
            this.saveNom = true;
          } else {
            this.saveNom = false;
          }
          break;
        }
        case "email": {
          if (this.user.email !== this.email) {
            this.saveEmail = true;
          } else {
            this.saveEmail = false;
          }
          break;
        }
        default:
          break;
      }
    },
  },
  computed: {
    getUser() {
      return this.$store.getters.user;
    },
  },
  watch: {
    getUser: {
      deep: true,
      handler: function(userStore) {
        this.user = userStore;
        this.nom = userStore.nom;
        this.email = userStore.email;
      },
    },
  },
  // mounted() {
  //   return this.setUser(this.$store.getters.user);
  // },
  mounted() {
    if (!this.$store.getters.tokenChecked) {
      this.loading = true;
      this.$store.dispatch("checkToken");
      setTimeout(() => {
        this.setUser(this.$store.getters.user);
      }, 100);
    } else {
      this.loading = false;
      this.setUser(this.$store.getters.user);
    }
  },
};
</script>

<style scoped>
tr:hover {
  cursor: pointer;
}

.container {
  min-width: 1500px !important;
}

.edit {
  text-align: right;
}

.card {
  border-radius: 5px;
}

.border-left-info {
  border-left: 0.25rem solid #36b9cc !important;
}

.fa-edit {
  cursor: pointer;
  color: #2a737e;
}

.fa-times-circle {
  cursor: pointer;
  color: red;
}

.input {
  width: 25vw;
  border: none;
  text-align: center;
  text-transform: capitalize;
}

/* .input[disabled] {
  background: #e6e6e6;
} */

.email {
  text-transform: none;
}

.info {
  color: #36b9cc;
}

.btn-delete {
  margin-top: 8em;
}
.btn-delete > div > a {
  /* padding-top: 50px; */
  font-size: 30px;
  color: black;
}

.modal-header h5 {
  width: 100%;
  text-align: center;
}
.modal-header a {
  padding-right: 0;
}
.fa-times {
  cursor: pointer;
  color: red;
}
.footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  border-top: 1px solid #dee2e6;
  border-bottom-right-radius: calc(0.3rem - 1px);
  border-bottom-left-radius: calc(0.3rem - 1px);
}
</style>
