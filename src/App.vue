<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src
// import Home from "@/views/Home.vue";
export default {
  name: "App",
  components: {
    // Home,
  },
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
* {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
#app {
  font-family: "Roboto", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
  margin: 0 !important;
  padding: 0 !important;
}

#nav {
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

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
@media (min-width: 1920px) and (max-width: 1920px) {
  section {
    width: 1500px !important;
  }
}
@media (min-width: 1600px) and (max-width: 1919px) {
  section {
    width: 1300px !important;
  }
  article.container.mt-5 {
    min-width: 1000px !important;
    width: 1200px !important;
  }
  article form {
    width: 1250px !important;
  }
  article div.btn-delete {
    width: 1250px !important;
  }
}
</style>
