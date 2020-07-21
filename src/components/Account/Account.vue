<template
  ><section>
    <h2>Mon compte</h2>
    <hr class="solid" />
    <article class="container">
      <form>
        <div class="row">
          <div class="col-md-6">
            <div class="card border-left-info shadow h-100 py-2">
              <div class="row">
                <div class="col-12 edit mb-n3">
                  <FaTimesCircle
                    @change-value="edit"
                    :input="{ inputNom: inputNom }"
                    value="nom"
                    v-if="!inputNom"
                  />
                  <FaEdit
                    @change-value="edit"
                    :input="{ inputNom: inputNom }"
                    value="nom"
                    v-else
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
              <div class="row">
                <div class="col-12 text-center" v-if="saveNom">
                  <button class="btn btn-info" @click="save" value="nom">
                    <i class="fas fa-save"></i> Enregistrer la modification
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
                    v-if="!inputEmail"
                  />
                  <FaEdit
                    @change-value="edit"
                    :input="{ inputEmail: inputEmail }"
                    value="email"
                    v-else
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
              <div class="row">
                <div class="col-12 text-center" v-if="saveEmail">
                  <button class="btn btn-info" @click="save" value="email">
                    <i class="fas fa-save"></i> Enregistrer la modification
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </article>
  </section>
</template>

<script>
import FaTimesCircle from "../../svg/FaTimesCircle";
import FaEdit from "../../svg/FaEdit";
export default {
  name: "Account",
  components: {
    FaTimesCircle,
    FaEdit,
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
    };
  },
  methods: {
    setUser: function(user) {
      this.user = user;
      this.nom = user.nom;
      this.email = user.email;
    },
    edit(payload) {
      if (typeof payload.inputEmail === "boolean") {
        this.inputEmail = payload.inputEmail;
        if (this.inputEmail === false) {
          this.$refs.email.focus();
        }
      } else if (typeof payload.inputNom === "boolean") {
        this.inputNom = payload.inputNom;
        if (this.inputNom === false) {
          this.$refs.nom.focus();
        }
      }
    },
    save: function(event) {
      event.preventDefault();
      console.log(event.target.value);
    },
    myChangeFunction: function(value) {
      console.log(value);
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
          "";
      }
    },
  },
  watch: {},

  mounted() {
    // if (!this.$store.state.tokenAlreadyChecked) {
    //   this.$store.dispatch("checkToken");
    //   return this.setUser(this.$store.state.user);
    // }
    //   return this.setUser(this.$store.state.user);
    return this.setUser(this.$store.getters.user);
  },
};
</script>

<style scoped>
section {
  margin-left: 3vw;
  margin-right: 1vw;
  margin-top: 2vh;
}

hr.solid {
  margin-left: 2vw;
  height: 0;
  margin-top: 0.5rem 0;
  overflow: hidden;
  border-top: 1px solid #01212c;
}

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

.email:focus {
  background: red;
}

.info {
  color: #36b9cc;
}
</style>
