<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="d-flex justify-content-between">
      <a class="navbar-brand">{{ name }}</a>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <router-link to="/account" class="nav-item"
            ><i class="fas fa-user-circle"></i> Mon Compte</router-link
          >
          <router-link to="/relance" class="nav-item" v-if="relance">
            <span class="fa-layers fa-fw">
              <i class="fas fa-bell"></i>
              <span class="fa-layers-counter" style="background:Tomato">
                {{ relance }}</span
              > </span
            >Relance</router-link
          >
          <a class="disabled" v-else
            ><i class="far fa-bell-slash"></i>Aucune relance</a
          >
          <router-link to="/login" class="nav-item off"
            ><i class="fas fa-power-off"></i> Me déconnecter</router-link
          >
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Header",
  data: () => ({
    name: "John Doe",
    relance: "5",
  }),
};
</script>

<style>
.d-flex {
  width: 100%;
}

.navbar-brand {
  margin-left: 2vw;
  cursor: default;
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
