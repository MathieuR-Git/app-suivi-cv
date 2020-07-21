<template>
  <div id="login">
    <h1 class="text-center">FindJob</h1>
    <div class="wrapper wrapper--w960">
      <div class="card card-2">
        <div class="card-heading"></div>
        <div class="card-body">
          <h2 class="title">Se connecter</h2>
          <form @submit="login">
            <div class="input-group">
              <input
                class="input--style-2"
                type="email"
                placeholder="Votre adresse email"
                v-model="email"
                autocomplete=""
              />
            </div>
            <div class="input-group">
              <input
                class="input--style-2"
                type="password"
                placeholder="Votre mot de passe"
                v-model="password"
                autocomplete=""
              />
            </div>

            <div class="p-t-30">
              <button
                class="btn btn-valid"
                v-if="email.length > 1 && password.length > 1"
              >
                Valider
              </button>
              <button class="btn btn-valid" disabled v-else>
                Valider
              </button>
            </div>
            <span
              >Créer un compte
              <router-link to="/register">ici</router-link></span
            >
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    email: "",
    password: "",
  }),
  methods: {
    login: function(e) {
      e.preventDefault();
      let email = this.email;
      let password = this.password;
      this.$store
        .dispatch("login", { email, password })
        .then(() => this.$router.push("/jobs"))
        .catch((err) => console.error(err));
    },
  },
};
</script>

<style scoped>
h1,
h2 {
  font-weight: 400;
}

h1 {
  font-size: 36px;
}

h2 {
  font-size: 30px;
}

/* ==========================================================================
   #SPACING
   ========================================================================== */

.p-t-30 {
  padding-top: 30px;
}

/* ==========================================================================
   #WRAPPER
   ========================================================================== */
.wrapper {
  margin: 0 auto;
}

.wrapper--w960 {
  min-height: 635px !important;
  max-width: 960px;
}

.wrapper--w680 {
  max-width: 680px;
}

/* ==========================================================================
   #BUTTON
   ========================================================================== */
.btn {
  line-height: 40px;
  display: inline-block;
  padding: 0 25px;
  cursor: pointer;
  color: #fff;
  font-family: "Roboto", "Arial", "Helvetica Neue", sans-serif;
  -webkit-transition: all 0.4s ease;
  -o-transition: all 0.4s ease;
  -moz-transition: all 0.4s ease;
  transition: all 0.4s ease;
  font-size: 14px;
  font-weight: 700;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
}

.btn-valid {
  background: #01212c;
  color: white;
}
.btn-valid[disabled] {
  cursor: not-allowed !important;
}
.btn-valid:hover {
  background: #01212c;
  color: white;
}

/* ==========================================================================
   #FORM
   ========================================================================== */
input {
  outline: none;
  margin: 0;
  border: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  width: 100%;
  font-size: 14px;
  font-family: inherit;
}

/* input group 1 */
/* end input group 1 */
.input-group {
  position: relative;
  margin-bottom: 32px;
  border-bottom: 1px solid #e5e5e5;
}

.input--style-2 {
  padding: 9px 0;
  color: #666;
  font-size: 16px;
  font-weight: 500;
}

.input--style-2::-webkit-input-placeholder {
  /* WebKit, Blink, Edge */
  color: #808080;
}

.input--style-2:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #808080;
  opacity: 1;
}

.input--style-2::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #808080;
  opacity: 1;
}

.input--style-2:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #808080;
}

.input--style-2:-ms-input-placeholder {
  /* Microsoft Edge */
  color: #808080;
}

/* ==========================================================================
   #TITLE
   ========================================================================== */

.title {
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 37px;
}

/* ==========================================================================
   #CARD
   ========================================================================== */
.card {
  overflow: hidden;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  background: #fff;
  border: none !important;
}

.card-2 {
  -webkit-box-shadow: 0px 8px 20px 0px rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 0px 8px 20px 0px rgba(0, 0, 0, 0.15);
  box-shadow: 0px 8px 20px 0px rgba(0, 0, 0, 0.15);
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  width: 100%;
  display: table;
}

.card-2 .card-heading {
  background: url("../assets/bg-heading-03.jpg") top left/cover no-repeat;
  width: 29.1%;
  display: table-cell;
}

.card-2 .card-body {
  display: table-cell;
  padding: 80px 90px;
  padding-bottom: 88px;
}

@media (max-width: 767px) {
  .wrapper {
    border-radius: none !important;
    height: 100vh !important;
  }
  .wrapper--w960 {
    border-radius: none !important;
  }
  .card {
    border-radius: none;
  }
  .card-2 {
    display: block;
    height: 100vh;
  }
  .card-2 .card-heading {
    display: none;
  }
  .card-2 .card-body {
    display: block;
    padding: 60px 50px;
    border-radius: none;
  }
  #login {
    padding-top: 0 !important;
    background: #01212c;
  }
  #login h1 {
    display: none;
  }
}

#login {
  padding-top: 4vh;
  background: #01212c;
  height: 100vh;
}
#login h1 {
  margin-bottom: 9vh;
  color: white;
  font-style: italic;
}
span {
  font-size: 12px;
}
</style>
