<template>
  <section>
    <h2>Créer une candidature</h2>
    <hr class="solid" />
    <article class="container-fluid mt-5">
      <form>
        <div class="row mb-5">
          <div class="col-md-6">
            <div class="card border-left-info shadow h-100 py-2">
              <div class="card-body">
                <div class="row no-gutters align-items-center">
                  <div class="col-11 mr-2">
                    <div
                      class="text-xd font-weight-bold text-info text-uppercase mb-1"
                    >
                      Nom
                    </div>
                    <input
                      type="text"
                      class="h5 mb-0 ml-5 font-weight-bold text-gray-800 col-12"
                      v-model="jobTitle"
                      required
                      today-variant
                      close-button
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card border-left-info shadow h-100 py-2">
              <div class="card-body">
                <div class="row no-gutters align-items-center">
                  <div class="col-11 mr-2">
                    <div
                      class="text-xd font-weight-bold text-info text-uppercase mb-1"
                    >
                      Date de la candidature
                    </div>
                    <b-form-datepicker
                      v-model="date"
                      class="h5 mb-0 ml-5 font-weight-bold text-gray-800 col-12 date-picker"
                      :locale="locale"
                      v-bind="labels"
                      today-button
                      label-today-button="Aujourd'hui"
                    ></b-form-datepicker>
                    <div
                      class="row no-gutters align-items-center"
                      v-if="!this.$store.state.user.delaifixe"
                    >
                      <div class="col-11 mr-2">
                        <div
                          class="text-xd font-weight-bold text-info text-uppercase mb-1"
                        >
                          Délai de relance
                        </div>
                        <input
                          type="number"
                          class="h5 mb-0 ml-5 font-weight-bold text-gray-800 col-12"
                          v-model="relanceTime"
                          min="8"
                          max="16"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row mb-5">
          <div class="col-md-6">
            <div class="card border-left-info shadow h-100 py-2">
              <div class="card-body">
                <div class="row no-gutters align-items-center">
                  <div class="col-11 mr-2">
                    <div
                      class="text-xd font-weight-bold text-info text-uppercase mb-1"
                    >
                      Nom de l'entreprise
                    </div>
                    <input
                      type="text"
                      class="h5 mb-0 ml-5 font-weight-bold text-gray-800 input col-12"
                      v-model="companyName"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card border-left-info shadow h-100 py-2">
              <div class="card-body">
                <div class="row no-gutters align-items-center">
                  <div class="col-11 mr-2">
                    <div
                      class="text-xd font-weight-bold text-info text-uppercase mb-1"
                    >
                      Identifiant de l'offre
                    </div>
                    <input
                      type="text"
                      class="h5 mb-0 ml-5 font-weight-bold text-gray-800 input col-12"
                      v-model="idOffer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row mb-5">
          <div class="col-md-12">
            <div class="card border-left-info shadow h-100 py-2">
              <div class="card-body">
                <div class="row no-gutters align-items-center">
                  <div class="col-11 mr-2">
                    <div
                      class="text-xd font-weight-bold text-info text-uppercase mb-1"
                    >
                      Lien de l'offre
                    </div>
                    <input
                      type="text"
                      class="h5 mb-0 ml-5 font-weight-bold text-gray-800 input col-12"
                      v-model="urlLink"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row pt-5">
          <div class="d-flex justify-content-center">
            <button class="btn btn-job" @click="saveJob">Enregistrer</button>
          </div>
        </div>
        <FaBack />
      </form>
    </article>
  </section>
</template>

<script>
import FaBack from "../../Icons/FaBack";
export default {
  name: "newJob",
  components: { FaBack },
  data() {
    return {
      jobTitle: "",
      date: "",
      companyName: "",
      idOffer: "",
      urlLink: "",
      locale: "fr",
      relanceTime: 10,
      labels: {
        labelPrevYear: "Année précédente",
        labelPrevMonth: "Mois précédent",
        labelCurrentMonth: "Mois actuel",
        labelNextMonth: "Mois suivant",
        labelNextYear: "Année suivante",
        labelSelected: "Date sélectionnée",
        labelNoDateSelected: "Aucune date sélectionnée",
        labelCalendar: "Calendrier",
        labelNav: "Navigation du calendrier",
        labelHelp:
          "Utiliser les touches fléchées pour parcourir les dates du calendrier",
      },
    };
  },
  methods: {
    saveJob: function(e) {
      e.preventDefault();
      let data = {
        poste: this.jobTitle,
        nomEntreprise: this.companyName,
        statut: "En attente",
        url: this.urlLink,
        idOffre: this.idOffer,
        dureeRelance: this.relanceTime,
        dateCandidature: this.date,
        idUtilisateur: this.$store.getters.user.id,
      };
      this.$store
        .dispatch("addJob", data)
        .then(() => this.$router.push("/jobs"));
    },
  },
};
</script>

<style scoped>
/* .container {
  min-width: 1500px !important;
} */
.date-picker {
  text-align: center;
  border-color: -internal-light-dark(rgb(118, 118, 118), rgb(195, 195, 195));
}
input[type="text"] {
  border-radius: 5px;
  border: 1px solid #dfe2e6;
  background: #f8f9fa;
  text-align: center;
  font-style: normal;
  font-weight: initial;
}
input[type="number"] {
  border-radius: 5px;
  border: 1px solid #dfe2e6;
  background: #f8f9fa;
  text-align: center;
  font-style: normal;
  font-weight: initial;
}
.form-control {
  background: #f8f9fa !important;
}
.btn-job {
  background: #0070c0;
  color: white;
}
.btn-job:hover {
  transform: scale(1.1);
  background: #0070c0;
  color: white;
}
</style>
