<template>
  <section>
    <h2>Mes candidatures</h2>
    <hr class="solid" />

    <div class="mt-3 text-center">
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
        <b-button
          variant="danger"
          value="rejected"
          @click="changeFilter"
          v-if="filterChoice !== 'rejected'"
          >Refusés</b-button
        >
      </b-button-group>
    </div>

    <article class="mt-3" v-if="!loading">
      <router-link to="new">
        <i
          class="fas fa-plus-circle fa-2x"
          title="Créer une nouvelle candidature"
        />
      </router-link>
      <b-table
        striped
        head-variant="light"
        hover
        responsive
        show-empty
        v-bind:on="click"
        :fields="fields"
        :per-page="perPage"
        :current-page="currentPage"
        :items="filtered"
        :id="items.id"
        empty-text="Il n'y a aucune valeur à afficher..."
        @row-clicked="info"
      >
        <template v-slot:cell(dateCandidature)="row">
          {{ dateFormat(row.value) }}
        </template>
      </b-table>
      

      <div class="d-flex justify-content-center">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
        ></b-pagination>
      </div>
    </article>
    <Loader v-else />
    <FaBack />
  </section>
</template>

<script>
import Loader from "../Loader/Loader";
import FaBack from "../../Icons/FaBack";
export default {
  name: "Jobs",
  components: { FaBack, Loader},
  props: ["filter"],
  data() {
    return {
      filterChoice: "",
      items: [],
      filtered: [],
      currentPage: 1,
      totalRow: 1,
      perPage: 10,
      totalRows: 1,
      loading: false,
      fields: [
        {
          key: "Offre.poste",
          label: "Nom du poste",
          sortable: true,
        },
        {
          key: "Offre.nomEntreprise",
          label: "Nom de l'entreprise",
          sortable: true,
        },
        {
          key: "idOffre",
          label: "Identifiant de l'offre",
          sortable: true,
        },
        {
          key: "dateCandidature",
          label: "Date de la candidature",
          sortable: true,
        },
        {
          key: "statut",
          label: "Statut",
          sortable: true,
        },
      ],
    };
  },
  methods: {
    setItems(data) {
      this.items = data;
      this.filtered = data;
      this.totalRows = data.length;
      this.loading = false;
    },
    changeFilter(event) {
      this.filterChoice = event.target.value;
      this.setFilter();
    },
    click(event){
      console.log(event)
    },
    setFilter() {
      switch (this.filterChoice) {
        case "all": {
          this.filtered = this.items;
          this.totalRows = this.filtered.length;
          break;
        }
        case "success": {
          this.filtered = this.items.filter(
            (job) => job.statut === "accepté" || job.statut === "Accepté"
          );
          this.totalRows = this.filtered.length;
          break;
        }
        case "waiting": {
          this.filtered = this.items.filter(
            (job) => job.statut === "en attente" || job.statut === "En attente"
          );
          this.totalRows = this.filtered.length;
          break;
        }
        case "rejected": {
          this.filtered = this.items.filter(
            (job) => job.statut === "refusé" || job.statut === "Refusé"
          );
          this.totalRows = this.filtered.length;
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
      this.setFilter();
    },
    info(event) {
      console.log("sur le @row-clicked, on récupère : ", event);
      this.$router.push({name:'JobInfo',params:{job:event}})
    },
    dateFormat(value) {
      let dateFormat = value.split("-").reverse();
      dateFormat[1] = this.getMonth(dateFormat[1]);
      return dateFormat.join(" ");
    },
    getMonth(month) {
      const monthNames = [
        "Janvier",
        "Février",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Août",
        "Septembre",
        "Octobre",
        "Novembre",
        "Décembre",
      ];
      return monthNames[parseInt(month)];
    },
  },

  mounted() {
    if (!this.$store.getters.tokenChecked) {
      this.loading = true;
      this.$store.dispatch("checkToken");
      setTimeout(() => {
        this.setItems(this.$store.getters.jobs);
      }, 100);
    } else {
      this.loading = false;
      this.setItems(this.$store.getters.jobs);
    }
  },
  computed: {
    jobs() {
      return this.$store.getters.jobs;
    },
  },
  watch: {
    jobs(newValue, oldValue) {
      if (newValue.length !== oldValue.length) {
        this.items = newValue;
      }
    },
  },
};
</script>

<style scoped>
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

.fa-plus-circle {
  color: red;
  position: absolute;
  left: -4vw;
  top: 4vh;
  cursor: pointer;
}
.fa-plus-circle:hover {
  transform: scale(1.1);
}
article {
  margin-left: 2vw;
  position: relative;
}

.pagination > li.active > .page-link {
  color: white !important;
  background-color: purple !important;
  border: solid 1px purple !important;
}
/* .loading {
  margin-top: 10%;
}
.loading > .circles-to-rhombuses-spinner {
  margin: 0 auto;
}
.loading > p {
  text-align: center;
  font-size: 30px;
} */
</style>
