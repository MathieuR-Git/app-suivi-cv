<template>
  <section>
    <h2>Mes relances à effectuer</h2>
    <hr class="solid" />
    <article class="container mt-5" v-if="!loading">
      <b-table
        hover
        head-variant="light"
        :items="items"
        :fields="fields"
        v-bind:on="click"
        :id="items.id"
        :primary-key="items.id"
        @row-clicked="info"
        empty-text="Il n'y a aucune valeur à afficher..."
      >
        <template v-slot:cell(poste)="row" class="mr-1">
          <p v-on:click="info(row.item, $event.target)" class="td">
            {{ row.value }}
          </p>
        </template>
        <template v-slot:cell(url)="row" class="mr-1">
          <p v-on:click="redirect(row.item, $event.target)" class="td">
            {{ row.value }}
          </p>
        </template>
      </b-table>
      <b-modal
        :id="infoModal.id"
        :title="infoModal.title"
        ok-title="Confirmer"
        cancel-title="Annuler"
        @ok="test"
        @cancel="test"
      >
        <pre v-html="infoModal.content"></pre>
        <!-- <pre >{{ infoModal.content }}</pre> -->
      </b-modal>
    </article>
    <Loader v-else />
    <FaBack />
  </section>
</template>

<script>
import Loader from "../Loader/Loader";
import FaBack from "../../svg/FaBack";
export default {
  name: "Relance",
  components: { FaBack, Loader },
  data() {
    return {
      fields: [
        {
          key: "poste",
          sortable: true,
        },
        {
          key: "statut",
          sortable: true,
        },
        {
          key: "IDOffre",
          label: "ID de l'offre",
          sortable: true,
        },
        {
          key: "nomEntreprise",
          label: "Entreprise",
          sortable: true,
        },
        {
          key: "url",
          label: "Lien",
          sortable: false,
        },
      ],
      items: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
        url: "",
      },
      loading: false,
    };
  },
  methods: {
    setItems(data) {
      this.items = data;
      this.loading = false;
    },
    info(item) {
      // info(item, index, button) {
      this.$nextTick(function() {
        console.log(item.id, item.url);
        //window.open("https://www.google.fr", "_targer");
      });
    },
    redirect(item, index, button) {
      this.$nextTick(function() {
        this.infoModal.title = `Redirection`;
        this.infoModal.url = item.url;
        this.infoModal.content = `Souhaitez-vous vraiment vous rediriger vers <br><b style="cursor:pointer;">${item.url}</br>`;
        this.$root.$emit("bv::show::modal", this.infoModal.id, button);
      });
    },
    test(event) {
      if (event.trigger === "ok") {
        window.open(this.infoModal.url);
      }
    },
  },
  mounted() {
    if (!this.$store.getters.tokenChecked) {
      this.loading = true;
      this.$store.dispatch("checkToken");
      setTimeout(() => {
        this.setItems(this.$store.getters.relances);
      }, 100);
    } else {
      this.loading = false;
      this.setItems(this.$store.getters.relances);
    }
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
