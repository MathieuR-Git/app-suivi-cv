<template>
  <div>
    <h2>Mes candidatures</h2>
    || <a>Query : {{ this.$route.query }}</a> || || ||
    <a>Params : {{ this.$route.params }}</a> || ||
    <a>Query Result: {{ this.$route.query.filter }}</a> ||
    <a>Params.id : {{ filterChoice }}</a>
  </div>
</template>

<script>
export default {
  name: "Jobs",
  props: ["filter"],
  data() {
    return {
      filterChoice: "all",
    };
  },
  mounted() {
    if (this.filter) {
      this.filterChoice = this.filter;
      console.log(this.$route);
    }
  },
};
</script>

<style></style>
