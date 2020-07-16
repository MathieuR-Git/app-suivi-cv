<template>
  <section>
    <h2>Mes relances à effectuer</h2>
    <hr class="solid" />
    <article>
      <b-table
        hover
        head-variant="light"
        :items="items"
        :fields="fields"
        v-bind:on="click"
        :id="items.id"
        :primary-key="items.id"
        :click="info"
      >
        <template v-slot:cell(poste)="row" class="mr-1">
          <span @click="info(row.item, row.index, $event.target)">{{
            row.value
          }}</span>
        </template>
        <template v-slot:cell(url)="row" class="mr-1">
          <span @click="redirect(row.item, $event.target)">{{
            row.value
          }}</span>
        </template>
      </b-table>
      <b-modal
        :id="infoModal.id"
        :title="infoModal.title"
        ok-title="Confirmer"
        cancel-title="Annuler"
        @hide="resetInfoModal"
        @ok="test"
        @cancel="test"
        centered="true"
      >
        <pre v-html="infoModal.content"></pre>
        <!-- <pre >{{ infoModal.content }}</pre> -->
      </b-modal>
    </article>
  </section>

  <!-- 
    
    
    <section>
    <h2>Mes relances à effectuer</h2>
    <hr class="solid" />
    <article>
      <b-table
        hover
        head-variant="light"
        :items="items"
        :fields="fields"
        v-bind:on="click"
        :id="items.id"
        :primary-key="items.id"
      >
      </b-table>
    </article>
  </section>
  
   -->
</template>

<script>
export default {
  name: "Relance",
  data: () => ({
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
    items: [
      {
        id: "97eb48793051342b86ef121e022c037e",
        poste: "Chef des ventes",
        nomEntreprise: "Lejeune",
        IDOffre: "1a71489e9da93bb69fe1d0a84d471627",
        url: "http://www.rolland.fr/",
        statut: "Refusé",
      },

      {
        id: "170730306317311d81b9d16c7aa2b1fe",
        poste: "Plasticien",
        nomEntreprise: "Lefebvre SA",
        url: "https://www.marin.com/commodilaboriosamautetutetmollitiaautnulla",
        IDOffre: "1a71489e9da93bb69fe1d0a84d471628",
        statut: "Refusé",
      },
      {
        id: "742fef19d5d431c2b79475b1289444ce",
        poste: "Testeur informatique",
        nomEntreprise: "Fleury Gilbert SARL",
        url: "http://www.michaud.fr/optiominusetautincidunt",
        IDOffre: "1a71489e9da93bb69fe1d0a84d471629",
        statut: "En attente",
      },
      {
        id: "c6510dff479433b5a38ed0c8b6726466",
        poste: "Jointeur de placage",
        nomEntreprise: "Lefort",
        url: "http://mendes.fr/utilloofficiisutdolorin",
        IDOffre: "1a71489e9da93bb69fe1d0a84d471621",
        statut: "Accepté",
      },
      {
        id: "76cbd453440a35ce897c7d1b5c75a758",
        poste: "Conseiller relooking",
        nomEntreprise: "Lecoq S.A.",
        url: "http://www.leblanc.org/inexpeditaquidemsuscipitquisquamvoluptas",
        IDOffre: "1a71489e9da93bb69fe1d0a84d471111",
        statut: "Refusé",
      },
      {
        id: "e8c25b092da530769aecd00dadbf0a5b",
        poste: "Médiateur judiciaire",
        nomEntreprise: "Couturier",
        url:
          "http://blondel.fr/consecteturexcepturiutaperiamodiomaximerecusandae.html",
        IDOffre: "1a71489e9da93bb69fe1d0a84d471",
        statut: "En attente",
      },
      {
        id: "d6e28e24f24437f2a05460a92cf34171",
        poste: "Vendeur en épicerie",
        nomEntreprise: "Coste",
        url: "https://guyot.com/quiasequiconsequaturrerumasperioresab.html",
        IDOffre: "4c71489e9da93bb69fe1d0a84d471627",
        statut: "Accepté",
      },
    ],
    infoModal: {
      id: "info-modal",
      title: "",
      content: "",
      url: "",
    },
  }),
  methods: {
    info(item, index, button) {
      this.$nextTick(function() {
        console.log(item.id, item.url, index, button.innerText);
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
};
</script>

<style>
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
  border-top: 1px solid #01212C;
}
tr:hover {
  cursor: pointer;
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
