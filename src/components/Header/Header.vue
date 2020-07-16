<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="d-flex justify-content-between">
      <a class="navbar-brand">{{ name }}</a>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <router-link to="/account" class="nav-item">Mon Compte</router-link>
          <router-link to="/relance" class="nav-item">Relance</router-link>
          <router-link to="/login" class="nav-item">Me déconnecter</router-link>
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
  }),
};
</script>

<style lang="scss"></style>
