<template>
  <div class="container">
    <!-- <div class="container-fluid"> -->
    <div class="row">
      <Dashboard />
      <!-- <div class="col"><Dashboard /></div> -->
      <div class="col-10">
        <Header />
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import Dashboard from "@/components/Dashboard/Dashboard.vue";
import Header from "@/components/Header/Header.vue";

export default {
  name: "Home",
  components: {
    Dashboard,
    Header,
  },
};
</script>

<style>
.container {
  margin-left: 0 !important;
  margin-right: 0 !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
  min-width: 100vw !important;
}
div.row {
  margin-left: 0 !important;
  margin-right: 0 !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
}
.col {
  margin: 0 !important;
  padding: 0 !important;
}
.col-10 {
  margin: 0 !important;
  padding: 0 !important;
}
</style>
