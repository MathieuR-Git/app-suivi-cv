<template>
  <aside class="col-2">
    <h2>Tableau de bord</h2>
    <div class="nav">
      <router-link to="/account" class="item-link"
        ><i class="fas fa-user-circle"></i> Mon Compte</router-link
      >
      <router-link to="/jobs" class="item-link"
        ><i class="far fa-envelope-open"></i> Les candidatures</router-link
      >
      <router-link to="/new" class="item-link">
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
    </div>
  </aside>
</template>

<script>
import PlusCircle from "../../Icons/PlusCircle";

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
@media (min-width: 1026px) {
  .item-link {
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    height: 4em;
    font-size: 1.4em;
  }
}
@media (min-width: 768px) and (max-width: 1025px) {
  h2 {
    font-size: 24px;
  }
  .item-link {
    display: flex;
    align-items: center;
    color: white;
    height: 3em;
    font-size: 1em;
    margin-left: -10px;
  }
}

@media (max-width: 767px) {
  aside {
    display: none;
  }
}
</style>
