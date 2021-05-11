<template>
  <v-container>
    <v-form v-model="valid" ref="form">
      <v-card elevation="3">
        <h2 class="titulo mb-4 ml-3">Questão {{this.idQuestao}}</h2>
        <p class="field ml-5">Domínio: <span class="fieldtext">{{this.domain}}</span></p>
        <p class="field ml-5">Pergunta: <span class="fieldtext">{{this.header}}</span></p>
        <v-divider></v-divider>
      </v-card>
      <v-row>
        <v-col cols="8">
          <v-text-field class="mt-4" v-model="resposta.answer" :rules="rules.required" :counter="200" label="Texto da Resposta"></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="6" xl="2" lg="3" md="3" sm="6" class="mt-4">
          <p class="grey--text text--darken-1">Resposta Correta:</p>
        </v-col>
        <v-col cols="6" lg="3" md="3" sm="6">
          <v-radio-group v-model="resposta.correction" row mandatory>
            <v-radio label="0" value="0"></v-radio>

            <v-radio label="1" value="1"></v-radio>

          </v-radio-group>
        </v-col>
        <v-col xl="2" lg="3" md="3" sm="6" class="mt-4">
          <p class="grey--text text--darken-1">Resposta Obrigatória:</p>
        </v-col>
        <v-col lg="3" md="3" sm="6">
          <v-radio-group v-model="resposta.mandatory" row mandatory>

            <v-radio label="0" value="0"></v-radio>

            <v-radio label="1" value="1"></v-radio>

          </v-radio-group>
        </v-col>
      </v-row>

      <v-row>
        <v-col xl="2" lg="3" md="3" sm="4" class="mt-4">
          <p class="grey--text text--darken-1">Resposta Eliminatória:</p>
        </v-col>
        <v-col lg="3" md="3" sm="6">
          <v-radio-group v-model="resposta.eliminative" row mandatory>

            <v-radio label="0" value="0"></v-radio>

            <v-radio label="1" value="1"></v-radio>
          </v-radio-group>
        </v-col>
        <v-col cols="6">
          <v-select :items="pontos" v-model="resposta.points" label="Pontos" dense></v-select>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" align="right" class="mb-5">
          <v-btn @click="addAnswer" class="mr-5" color="#2A3F54">
            <v-icon color="white">mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-card class="mx-auto" tile>
        <v-card-title>Respostas</v-card-title>

        <v-data-table :headers="headers" :items="formData.body" disable-pagination :hide-default-footer="true" class="mb-5">
          <template v-slot:[`item.index`]="props">{{ props.index+1 }}</template>
          <template v-slot:[`item.answer`]="{ item }">
            {{ item.answer.length > 10 ? item.answer.slice(0, 10) + '...' : item.answer }}
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
          </template>
        </v-data-table>

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogEdit" max-width="600px">
          <v-card>
            <v-card-title class="headline">Edit</v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="8">
                  <v-text-field v-model="resposta.answer" 
                    class="mt-4"
                    :rules="rules.required" 
                    :counter="200" 
                    label="Texto da Resposta"
                 ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="6" xl="2" lg="3" md="3" sm="6" class="mt-4">
                  <p class="grey--text text--darken-1">Resposta Correta:</p>
                </v-col>
                <v-col cols="6" lg="3" md="3" sm="6">
                  <v-radio-group v-model="resposta.correction" row mandatory>
                    <v-radio label="0" value="0"></v-radio>

                    <v-radio label="1" value="1"></v-radio>

                  </v-radio-group>
                </v-col>
                <v-col xl="2" lg="3" md="3" sm="6" class="mt-4">
                  <p class="grey--text text--darken-1">Resposta Obrigatória:</p>
                </v-col>
                <v-col lg="3" md="3" sm="6">
                  <v-radio-group v-model="resposta.mandatory" row mandatory>

                    <v-radio label="0" value="0"></v-radio>

                    <v-radio label="1" value="1"></v-radio>

                  </v-radio-group>
                </v-col>
              </v-row>

              <v-row>
                <v-col xl="2" lg="3" md="3" sm="4" class="mt-4">
                  <p class="grey--text text--darken-1">Resposta Eliminatória:</p>
                </v-col>
                <v-col lg="3" md="3" sm="6">
                  <v-radio-group v-model="resposta.eliminative" row mandatory>

                    <v-radio label="0" value="0"></v-radio>

                    <v-radio label="1" value="1"></v-radio>
                  </v-radio-group>
                </v-col>
                <v-col cols="6">
                  <v-select :items="pontos" v-model="resposta.points" label="Pontos" dense></v-select>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>                               
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeEdit">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="editConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </v-card>
    </v-form>
  </v-container>
</template>

<script>

export default {
    data() {
        return {
            idQuestao: '',
            domain: '',
            header: '',
            editedIndex: -1,
            editing: false,
            dialogEdit: false,
            dialogDelete: false,
            pontos: ['1', '2', '3'],
            formData: {
                body: [],
            },
            resposta: {
                answer: "",
                correction: "",
                mandatory: "",
                eliminative: "",
                points: "",

            },
            
            defaultResp: {
                designation: "",
                description: "",
            },
            rules: {
                required: [(v) => !!v || "Field is required"],
                length30: [v => (v && v.length <= 30) || "Field must be less or equal than 30 characters"],
                length75: [v => (v && v.length <= 75) || "Field must be less or equal than 75 characters"],
                length100: [v => (v && v.length <= 100) || "Field must be less or equal than 100 characters"],
            },
            headers: [
                { text: "Número", align: "start", sortable: false, value: "index" },
                { text: "Texto",  sortable: false, value: "answer" },
                { text: "Correta",  sortable: false, value: "correction" },
                { text: "Obrigatória", sortable: false, value: "mandatory" },
                { text: "Eliminatória", sortable: false, value: "eliminative" },
                { text: "Pontos", sortable: false, value: "points" },
                { text: "Actions", sortable: false, value: "actions"},
            ],
        }
    },
    created() {
      if(this.$route.params.data!=null){
        console.log("Edição de questão")
        console.log(this.$route.params.data)
        let data = this.$route.params.data
            this.formData.body = data.body         
      }else{
        console.log("Nova questão")
      }
        
    },
    mounted() {
      this.$root.$on('change', data => {
            this.idQuestao = data.sendId
            this.domain = data.sendDomain
            this.header = data.sendHeader
      })
    },

    methods: {

      reset () {
        this.$refs.form.reset()
      },

      validate() {
        return this.$refs.form.validate()
      },

      addAnswer(){
        this.formData.body.push(this.resposta);
        this.resposta = Object.assign({}, this.defaultResp)
      },
       editItem (item) {
        this.editedIndex = this.formData.body.indexOf(item)
        this.resposta = Object.assign({}, item)
        this.dialogEdit = true
      },

      editConfirm() {
        this.$set(this.formData.body, this.editedIndex, this.resposta)
        this.resposta = Object.assign({}, this.defaultResp)
        this.dialogEdit = false
      },

      deleteItem (item) {
        this.editedIndex = this.formData.body.indexOf(item)
        this.dialogDelete = true
      },     

      deleteConfirm () {
        this.formData.body.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.resposta = Object.assign({}, this.defaultResp)
        this.editedIndex = -1
      },

      closeEdit () {
        this.dialogEdit = false
        this.editedIndex = -1
      },

      closeDelete () {
        this.dialogDelete = false
        this.editedIndex = -1
      },
    },

    watch: {
        formData: {
            handler: function() {
              this.$emit('newdataRespostas', this.formData.body);
          },
            deep: true
        },
        dialogDelete (val) {
            val || this.closeDelete()
        },
      },
}
</script>

<style scoped>
  h2.titulo{
    color:#2A3F54;
  }
  p.field{
    color:#2A3F54;
  }
  span.fieldtext{
    color:black;
  }
</style>