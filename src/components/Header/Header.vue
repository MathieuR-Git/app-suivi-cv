<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="d-flex justify-content-between">
      <a class="navbar-brand" v-if="name">{{ name }}</a>
      <a class="navbar-brand" v-else></a>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <router-link to="/account" class="nav-item"
            ><i class="fas fa-user-circle"></i> Mon Compte</router-link
          >
          <router-link to="/relance" class="nav-item" v-if="relanceLength">
            <span class="fa-layers fa-fw">
              <i class="fas fa-bell"></i>
              <span class="fa-layers-counter" style="background:Tomato">
                {{ relanceLength }}</span
              > </span
            >Relance</router-link
          >
          <a class="disabled" v-else @click="info"
            ><i class="far fa-bell-slash"></i>Aucune relance</a
          >
          <a class="nav-item off" @click="logout"
            ><i class="fas fa-power-off off"></i> Me déconnecter</a
          >
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Header",
  // data: () => ({
  //   name: "John Doe",
  //   // relance: "5",
  // }),
  methods: {
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    },
    info: function() {
      console.log(this.$store.state);
    },
  },
  computed: {
    relanceLength: function() {
      return this.$store.state.relances.length;
    },
    name: function() {
      if (this.$store.state.user) {
        return this.$store.state.user.nom;
      } else return "";
    },
  },
};
</script>

<style>
.d-flex {
  width: 100%;
}

.navbar-brand {
  margin-left: 2vw;
  cursor: default;
  text-transform: capitalize;
}

a.disabled {
  /* pointer-events: none; */
  cursor: default;
}

.nav-item,
a {
  color: black;
  padding-right: 2vw;
  font-size: 1.2em;
}

.nav-item:hover {
  transform: scale(1.1);
  color: black;
  text-decoration: none;
}

.off {
  color: red;
  cursor: pointer;
}

.off:hover {
  color: red;
  text-decoration: none;
}

.disabled:hover {
  transform: scale(1.1);
  text-decoration: none;
}

.fa-layers {
  margin-right: 10px;
}

.fa-layers-counter {
  right: -7px !important;
  font-size: 45px !important;
}
</style>
