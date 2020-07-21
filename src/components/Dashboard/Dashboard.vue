<template>
  <aside class="col">
    <h2>Tableau de bord</h2>
    <div class="nav">
      <router-link to="/account" class="item-link"
        ><i class="fas fa-user-circle"></i> Mon Compte</router-link
      >
      <router-link to="/jobs" class="item-link"
        ><i class="far fa-envelope-open"></i> Les candidatures</router-link
      >
      <router-link to="/application" class="item-link">
        <PlusCircle />
        J'ai postulé</router-link
      >
      <router-link to="/relance" class="item-link" v-if="relanceLength">
        <span class="fa-layers fa-fw">
          <i class="fas fa-bell"></i>
          <span class="fa-layers-counter" style="background:Tomato">
            {{ relanceLength }}</span
          >
        </span>
        Mes relances
      </router-link>
      <router-link v-else></router-link>
    </div>
  </aside>
</template>

<script>
import PlusCircle from "../../svg/PlusCircle";
export default {
  name: "Dashboard",
  components: {
    PlusCircle,
  },
  computed: {
    relanceLength: function() {
      return this.$store.state.relances.length;
    },
  },
};
</script>

<style scoped>
aside {
  background: #01212c;
  height: 100vh;
}
h2 {
  text-align: center;
  margin-top: 2vh;
  color: white;
}
.nav {
  display: grid;
  margin-top: 20vh;
}
.item-link {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  height: 4em;
  font-size: 1.4em;
}
.item-link:hover {
  background: rgb(24, 30, 56);
}

svg {
  margin-right: 5px;
}
.item-link span {
  margin-right: 5px;
}
.fa-layers-counter {
  right: -7px !important;
  font-size: 45px !important;
}
/* .fa-layers-counter {
  right: -8px !important;
  font-size: 45px !important;
  padding-left: 25px;
  padding-right: 25px;
} */
</style>
