<template>
  <v-container>
    <AppHeader></AppHeader>
    <NavDraw></NavDraw>
    <v-card>
      <v-data-table :headers="headers" 
        :items="navQuestoes" 
        :items-per-page="15" 
        :search="search" 
        :sort-by="[]"
        multi-sort>
        <template v-slot:top>
          <v-toolbar>
            <v-toolbar-title class>Preparação de Questões</v-toolbar-title>
            <v-spacer></v-spacer>

            <v-text-field v-model="search" append-icon="mdi-magnify" label="Pesquisa" single-line hide-details class="mr-5"></v-text-field>
            <v-btn to="/prodQuestao" color="#2A3F54" class="white--text">
              <v-icon>mdi-text-box-plus-outline</v-icon>
            </v-btn>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="showItem(item)">mdi-eye</v-icon>

            <v-icon small class="mr-2" @click="sendItem(item)">mdi-pencil</v-icon>

          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
      <v-dialog v-model="dialogShow" max-width="700px">
          <v-card>
            <v-app-bar color="#2A3F54" >
              <div class="d-flex align-center">
                <h3 width="40" class="white--text"> QUESTÃO - {{this.questao.id}} </h3>
              </div>
            </v-app-bar>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <dl>
                    <dt class="title">Pergunta</dt>
                    <dd class="ml-5">{{this.questao.header}}</dd>
                  </dl>
                </v-col>
                
              </v-row>
              <v-row>
                <v-col cols="4">
                  <dl>
                    <dt class="title">Domínio</dt>
                    <dd class="ml-5">{{this.questao.domain}}</dd>
                  </dl>
                </v-col>
                 <v-col cols="4">
                  <dl>
                    <dt class="title">Subdomínio</dt>
                    <dd class="ml-5">{{this.questao.subdomain}}</dd>
                  </dl>
                </v-col>
                 <v-col cols="4">
                   <dl>
                    <dt class="title">Subsubdomínio</dt>
                    <dd class="ml-5">{{this.questao.subsubdomain}}</dd>
                   </dl>
                </v-col>
              </v-row>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="#2A3F54" text @click="closeShow">Cancel</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
       </v-dialog>
      <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="#2A3F54" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="#2A3F54" text @click="deleteConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
       </v-dialog>
    </v-card>
    <v-btn to="/prodDominio" color="#2A3F54" class="white--text">
      Domínios
    </v-btn>
    <v-btn to="/prodQuestao" color="#2A3F54" class="white--text">
      Questões
    </v-btn>

    <Footer class="mt-5"></Footer>
  </v-container>
</template>

<script>
//imports dos outros componentes e axios para os pedidos
import axios from 'axios'
import AppHeader from '@/components/AppHeader'
import NavDraw from '@/components/NavDraw'
import Footer from '@/components/Footer'
export default {
    components: { 
        AppHeader,
        NavDraw,
        Footer
    }, 
    data(){
        return{
            itemIndex: -1,
            dialogShow: false,
            dialogDelete: false,
            headers: [
                { text: "Identificador", sortable: true, value: "id", class: "white--text"},
                { text: "Domínio",  sortable: true, value: "domain", class: "white--text" },
                { text: "SubDomínio",  sortable: true, value: "subdomain", class: "white--text" },
                { text: "Autor", sortable: true, value: "author", class: "white--text"},
                { text: "Data Criação", sortable: true, value: "inserted_at", class: "white--text"},
                { text: "Opções", sortable: false, value: "actions", class: "white--text"},
            ],
            questao:{
              id: '',
              language: '',
              study_cycle: '',
              scholarity: '',
              domain: '',
              subdomain: '',
              subsubdomain: '',
              difficulty_level: '',
              author: '',
              display_mode: '',
              answering_time: '',
              type: '',
              precedence: [],
              repetitions: '',
              header:'',
              body: [],
              explanation: '',
              images: '',
              videos: '',
              source: '',
              notes: '',
              status: '',
              inserted_by: '',
              inserted_at: '',
              validated_by: '',
              validated_at: ''
            },
            search:'',
            navQuestoes: [],
        }
    },
    created(){
        axios.get(`http://localhost:8001/question`)
          .then((response)=>{
            this.navQuestoes=response.data
          },(error) =>{
              console.log(error);
          });
    },
    methods: {
      showItem (item) {
        this.itemIndex = this.navQuestoes.indexOf(item)
        this.questao = Object.assign({}, item)
        console.log(this.questao.id)
        this.dialogShow = true
      },

      sendItem(data){
        this.$router.push({
          name: "ProdQuestao", 
          params: { data }
        });
      },

      closeShow(){
        this.dialogShow = false
      },

      deleteItem(item){
        this.itemIndex = this.navQuestoes.indexOf(item)
        this.dialogDelete = true
      },     

      deleteConfirm(){
        this.navQuestoes.splice(this.itemIndex, 1)
        this.closeDelete()
      },

      closeDelete(){
        this.dialogDelete = false
        this.itemIndex = -1
      }
    },

}
</script>
<style scoped>
    /* css para tornar a aparência mais similar ao template */
    .v-data-table /deep/ th{
        background-color:#4b779e;
        ;
    }
    .v-data-table /deep/ tr{
        color: #73879C;
        font-size: 13px;
    }
    .v-data-table /deep/ tr:nth-child(even){
        background-color: rgb(245, 245, 245);
    }

    a { 
      text-decoration: none; 
    }

    .title {
      color: #2A3F54
    }


</style>