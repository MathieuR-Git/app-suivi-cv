<template>
   <section>
       <div class="row  align-items-center">
           <div class="col-11">
    <h2>
      Détail de l'offre : <span id="idOffre">{{ job.idOffre }}</span>
    </h2>
           </div>
           <div v-if="!editable" v-on:click="setEditable()">
           <i class="fas fa-edit  fa-2x mx-2 pointer" ></i>
           </div>
       </div>
    <hr class="solid" />
 <form >
        <div class="row ">
          <div class="col-md-6 mt-2">
            <div class="card border-left-info shadow h-100 py-2">
              
              <div class="card-body">
                <div class="row no-gutters align-items-center">
                  <div class="col-11 mr-2">
                    <div
                      class="text-xd font-weight-bold text-info text-uppercase mb-1"
                    >
                     Poste
                    </div>
                    <input
                      type="text"
                      class="h5 mb-0 ml-3 col-11 font-weight-bold text-gray-800 input"
                      v-model="job.Offre.poste"
                      :disabled="!editable"
                      id="poste"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
           <div class="col-md-6 mt-2">
            <div class="card border-left-info shadow h-100 py-2">
              
              <div class="card-body">
                <div class="row no-gutters align-items-center">
                  <div class="col-11 mr-2">
                    <div
                      class="text-xd font-weight-bold text-info text-uppercase mb-1"
                    >
                    Statut
                    </div>
                   <b-form-select v-model="selected" :options="options" :disabled="!editable" size="sm" class="ml-3 col-11">
                   </b-form-select>
                  </div>
                </div>
              </div>
            </div>
           </div>
         
         
          <div class="col-md-6 mt-2">
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
                      v-model="job.dateCandidature"
                      class="h5 ml-3 align-middle font-weight-bold text-gray-800 col-11 date-picker"
                      :locale="locale"
                      v-bind="labels"
                      id="dateCandidature"
                      today-button
                      :disabled="!editable"
                      label-today-button="Aujourd'hui"
                      @input="changeDateRelance()"
                    ></b-form-datepicker>
                  </div>
                </div>
              </div>
            </div>
          </div>
           <div class="col-md-6 mt-2">
            <div class="card border-left-info shadow h-100 py-2">
              
              <div class="card-body">
                <div class="row no-gutters align-items-center">
                  <div class="col-11 mr-2">
                    <div
                      class="text-xd font-weight-bold text-info text-uppercase mb-1"
                    >
                     Relance tous les (durée en jours)
                    </div>
                    <input
                      type="text"
                      class="h5 mb-0 ml-3 col-11 font-weight-bold text-gray-800 input"
                      v-model="job.dureeRelance"
                      :disabled="!editable || delaiFixe"
                      id="dureeRelance"
                      @selected="changeDateRelance()"
                    />
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
           <div class="col-md-6 mt-2">
            <div class="card border-left-info shadow h-100 py-2">
              
              <div class="card-body">
                <div class="row no-gutters align-items-center">
                  <div class="col-11 mr-2">
                    <div
                      class="text-xd font-weight-bold text-info text-uppercase mb-1"
                    >
                    Date de la relance
                    </div>
                   <b-form-datepicker
                      v-model="job.dateRelance"
                      class="h5 ml-3 align-middle font-weight-bold text-gray-800 col-11 date-picker"
                      :locale="locale"
                      v-bind="labels"
                      today-button
                      :disabled=true
                      label-today-button="Aujourd'hui"
                    ></b-form-datepicker>
                  </div>
                </div>
              </div>
            </div>
          </div>
         
          <div class="col-md-6 mt-2">
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
                      class="h5 mb-0 ml-3 font-weight-bold col-11 text-gray-800 input"
                      v-model="job.Offre.nomEntreprise"
                      :disabled="!editable"
                      id="nomEntreprise"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
           <div class="col-12 mt-2">
            <div class="card border-left-info shadow h-100 py-2">
              
              <div class="card-body">
                <div class="row no-gutters align-items-center">
                  <div class="col-12 mr-2">
                    <div
                      class="text-xd font-weight-bold text-info text-uppercase mb-1"
                    >
                    Lien de l'annonce
                    </div>
                    <input
                      type="text"
                      class="h5  font-weight-bold text-gray col-11 ml-3  input"
                      v-model="job.Offre.url"
                      :disabled="!editable"
                      id="url"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
 </form>
  </section>
</template>

<script>
    export default {
        name:"JobInfo",
        props:['job'],
        data(){
            return{
                editable:false,
                locale:"fr",
                delaiFixe:false,
                selected:null,
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
      options:[
        {value:"En attente",text:"En attente"},
        {value:"A relancer",text:"À relancer"},
        {value:"Refusé",text:"Refusée"},
        {value:"Accepté", text:"Acceptée"}
      ]
            }
        },
        components:{
        },
        methods:{
            setEditable(){
                this.editable=true;
                this.$bvToast.toast('Vous pouvez maintenant éditer toutes les caractéristiques de cette candidature.',{
                    autoHideDelay:3000,
                    variant:"info",
                    width:"55%",
                    title:"Modification de la candidature"
                });
                console.log(this.editable,this.job)
            },
            setSelected(){
              let statut= this.job.statut;
              switch(true){
                case statut.toLowerCase()=="en attente":
                  this.selected="En attente";
                  break;
                  case statut.toLowerCase()=="a relancer":
                  this.selected="A relancer";
                  break;
                  case statut.toLowerCase()=="accepté":
                  this.selected="Accepté";
                  break;
                  case statut.toLowerCase()=="refusé":
                    this.selected="Refusé";
                    break;
              }
        },
        changeDateRelance(){
          let dateCandidature=new Date(this.job.dateCandidature);
          dateCandidature.setDate(dateCandidature.getDate()+this.job.dureeRelance);
          this.job.dateRelance=dateCandidature;
        }
        },
        mounted(){
          this.setSelected();
          let dureeDelaiFixe= this.$store.getters.user.dureeDelaiFixe;
          if (dureeDelaiFixe!= undefined && dureeDelaiFixe!= null)
         this.delaiFixe=true;
        },
    }
</script>
<style scoped>
#idOffre {
  text-decoration: underline;
  font-style: italic;
   text-transform: uppercase; 
}
.card {
  border-radius: 5px;
}
.date-picker,select{
  text-align: center;
  text-align-last: center;
}
.border-left-info {
  border-left: 0.25rem solid #36b9cc !important;
}
.input,.input:focus{
  text-align: center;
  text-transform: capitalize;
}
.input[disabled]{
border: none;
}

.pointer{
    cursor: pointer;
    }

h2,input{
  overflow:auto;
}
</style>