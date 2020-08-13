<template>
  <!-- <div class="row"> -->
  <div class="col-md-12">
    <div class="card border-left-info shadow h-100 py-2">
      <div class="row">
        <div class="col-6 mb-n3 pt-2 ml-5">
          <h3><u>Nombre d'offres postulées :</u> <span>XXX</span></h3>
        </div>

        <div class="col mb-n3 pt-2 ml-5">
          <h3>
            <u>Délai de relance :</u>
            <span>
              <input type="radio" id="two" value="flexible" v-model="delai" />
              <label for="two">Flexible</label>
            </span>
            <span>
              <input type="radio" id="one" value="fixe" v-model="delai" />
              <label for="one">Fixe</label>
              <select v-if="delai === 'fixe'" v-model="timeDelai">
                <option value="7">7 jours</option>
                <option value="10">10 jours</option>
                <option value="12">12 jours</option>
                <option value="14">14 jours</option>
              </select>
            </span>
          </h3>
        </div>
        <div class="col-12">
          <div class="d-flex justify-content-center">
            <ul class="list-group list-group-flush ">
              <li
                class="list-group-item d-flex justify-content-between align-items-center"
              >
                Candidatures acceptées :
                <router-link
                  :to="{ path: 'jobs', query: { filter: 'success' } }"
                  class="badge badge-success badge-pill"
                  >{{ getSuccessJobs }}</router-link
                >
              </li>
              <li
                class="list-group-item d-flex justify-content-between align-items-center"
              >
                Candidatures en attente :
                <router-link
                  :to="{ path: 'jobs', query: { filter: 'waiting' } }"
                  class="badge badge-info badge-pill"
                  >{{ getWaitingJobs }}</router-link
                >
              </li>
              <li
                class="list-group-item d-flex justify-content-between align-items-center"
              >
                Candidatures refusées :
                <router-link
                  :to="{ path: 'jobs', query: { filter: 'rejected' } }"
                  id="rejected"
                  class="badge badge-danger badge-pill"
                  >{{ getRejectedJobs }}</router-link
                >
              </li>
              <li
                class="list-group-item d-flex justify-content-between align-items-center"
              >
                Candidatures à relancer :
                <router-link
                  to="/relance"
                  class="badge badge-warning badge-pill"
                  >{{ relanceLength }}</router-link
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- </div>-->
  </div>
</template>

<script>
export default {
  name: "OffersAccount",
  data() {
    return {
      delai: "fixe",
      timeDelai: "14",
    };
  },
  computed: {
    relanceLength: function() {
      return this.$store.state.relances.length;
    },
    getSuccessJobs() {
      console.log(this.$store.getters.success);
      return this.$store.getters.success;
    },
    getWaitingJobs() {
      return this.$store.getters.waiting;
    },
    getRejectedJobs() {
      return this.$store.getters.rejected;
    },
  },
};
</script>

<style scoped>
.border-left-info {
  border-left: 0.25rem solid #a6cfd5 !important;
  margin-top: 4em;
}

h3 span {
  padding: 15px;
}
span label,
span select {
  padding-left: 10px;
}

span select {
  margin-left: 0.75em;
}

ul.list-group {
  width: 35em;
  margin-top: 3.5em;
}
li {
  font-size: 24px;
}
.radio {
  margin-left: 40%;
}
select {
  background: #01212c;
  color: white;
  border-radius: 8px;
}
option:checked {
  background: #01212c;
  color: white;
}
option:not(:checked) {
  background: white;
  color: black;
}

.badge:hover {
  transform: scale(1.1);
}
</style>
