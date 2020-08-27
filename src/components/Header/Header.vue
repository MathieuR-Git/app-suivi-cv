<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="d-flex justify-content-between">
      <a class="navbar-brand" v-if="name">{{ name }}</a>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul
          class="navbar-nav d-flex justify-content-end"
          v-if="window.width <= 767"
        >
          <router-link to="/account" class="nav-item responsive-item"
            ><i class="fas fa-user-circle"></i> Mon Compte</router-link
          >
          <router-link to="/jobs" class="nav-item responsive-item"
            ><i class="far fa-envelope-open"></i> Les candidatures</router-link
          >
          <router-link to="/new" class="nav-item responsive-item">
            <PlusCircle :color="{ color: 'black' }" />
            J'ai postulé</router-link
          >
          <router-link
            to="/relance"
            class="nav-item responsive-item"
            v-if="relanceLength"
          >
            <span class="fa-layers fa-fw">
              <i class="fas fa-bell"></i>
              <span class="fa-layers-counter" style="background:Tomato">
                {{ relanceLength }}</span
              > </span
            >Relance</router-link
          >
          <a class="disabled" v-else
            ><i class="far fa-bell-slash responsive-item"></i>Aucune relance</a
          >
          <a class="nav-item off responsive-item" @click="logout"
            ><i class="fas fa-power-off off"></i> Me déconnecter</a
          >
        </ul>
        <ul
          class="navbar-nav d-flex justify-content-end"
          v-if="window.width >= 768"
        >
          <router-link to="/account" class="nav-item "
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
          <a class="disabled" v-else
            ><i class="far fa-bell-slash"></i>Aucune relance</a
          >
          <a class="nav-item off" @click="logout"
            ><i class="fas fa-power-off off"></i> Me déconnecter</a
          >
        </ul>
      </div>

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
  </nav>
</template>

<script>
import PlusCircle from "../../Icons/PlusCircleBlack";
export default {
  name: "Header",
  components: {
    PlusCircle,
  },
  data: () => ({
    window: {
      width: 0,
      height: 0,
    },
  }),
  methods: {
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    },
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
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
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
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
ul.justify-content-end {
  justify-content: flex-end !important;
  padding-left: 9vw !important;
}

.responsive-item {
  transition: 0.2s;
}

.responsive-item:hover {
  border-radius: 5px;
  background: #01212c;
  color: white;
}

a.router-link-active svg g path.a {
  stroke: white;
}

@media (min-width: 768px) {
  .navbar-toggler {
    display: none;
  }
  .navbar-nav {
    flex-direction: row !important;
  }

  .collapse:not(.show) {
    display: flex !important;
  }
  .nav-item {
    width: auto !important;
  }
}
</style>
