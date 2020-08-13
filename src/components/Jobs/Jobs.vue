<template>
  <section>
    <h2>Mes candidatures</h2>
    <hr class="solid" />
    || <a>Query : {{ this.$route.query }}</a> || || ||
    <a>Params : {{ this.$route.params }}</a> || ||
    <a>Query Result: {{ this.$route.query.filter }}</a> ||
    <a>Params.id : {{ filterChoice }}</a>
    <div class="mt-3 text-center">
      <h3>Filtrer :</h3>
      <b-button-group>
        <b-button
          variant="dark"
          value="all"
          v-if="filterChoice !== 'all'"
          @click="changeFilter"
          >Tous</b-button
        >
        <b-button
          variant="success"
          value="success"
          @click="changeFilter"
          v-if="filterChoice !== 'success'"
          >Acceptés</b-button
        >
        <b-button
          variant="info"
          value="waiting"
          @click="changeFilter"
          v-if="filterChoice !== 'waiting'"
          >En attente</b-button
        >
        <!-- <b-button variant="warning" v-if="filterChoice !== 'all'"
          >A relancer</b-button
        > -->
        <b-button
          variant="danger"
          value="rejected"
          @click="changeFilter"
          v-if="filterChoice !== 'rejected'"
          >Refusés</b-button
        >
      </b-button-group>
    </div>
    <article>
      <b-table striped head-variant="light" hover show-empty :items="filtered">
      </b-table>
    </article>
  </section>
</template>

<script>
export default {
  name: "Jobs",
  props: ["filter"],
  data() {
    return {
      filterChoice: "",
      items: [],
      filtered: [],
    };
  },
  methods: {
    setItems(data) {
      this.items = data;
      this.filtered = data;
    },
    changeFilter(event) {
      this.filterChoice = event.target.value;
      this.setFilter();
    },
    setFilter() {
      switch (this.filterChoice) {
        case "all": {
          this.filtered = this.items;

          break;
        }
        case "success": {
          this.filtered = this.items.filter(
            (job) => job.statut === "accepté" || job.statut === "Accepté"
          );

          break;
        }
        case "waiting": {
          this.filtered = this.items.filter(
            (job) => job.statut === "en attente" || job.statut === "En attente"
          );

          break;
        }
        case "rejected": {
          this.filtered = this.items.filter(
            (job) => job.statut === "refusé" || job.statut === "Refusé"
          );

          break;
        }
        default:
          break;
      }
    },
    init() {
      if (this.$route.query.filter) {
        this.filterChoice = this.$route.query.filter;
      } else {
        this.filterChoice = "all";
      }
      this.setItems(this.$store.getters.jobs);
      this.setFilter();
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style scoped>
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
tr:hover {
  cursor: pointer;
}
.table td:hover {
  cursor: pointer !important;
}

.td {
  width: 100%;
}
td:hover {
  cursor: pointer !important;
}
.td:hover {
  cursor: pointer !important;
}

.modal-dialog {
  min-width: 800px;
}
.modal-title {
  width: 100% !important;
  text-align: center;
}
.modal-header .close {
  margin-left: 0 !important;
}
.modal-footer {
  justify-content: space-evenly !important;
}
.modal-footer .btn-secondary {
  background: #dc3545 !important;
}
pre {
  overflow-y: auto;
  overflow-x: hidden;
  overflow-wrap: break-word;
  text-align: center;
}
</style>
