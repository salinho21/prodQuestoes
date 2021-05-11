<template>
  <v-container>
    <AppHeader></AppHeader>
    <NavDraw></NavDraw>
    <v-card>
      <v-data-table :headers="headers" :items="navQuestoes" :items-per-page="15" :search="search" multi-sort>
        <template v-slot:top>
          <v-toolbar>
            <v-toolbar-title class>Preparação de Domínios</v-toolbar-title>
            <v-spacer></v-spacer>

            <v-text-field v-model="search" append-icon="mdi-magnify" label="Pesquisa" single-line hide-details class="mr-5"></v-text-field>
            <v-btn to="/prodQuestao" color="#2A3F54" class="white--text">
              <v-icon>mdi-text-box-plus-outline</v-icon>
            </v-btn>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="showItem()">mdi-eye</v-icon>
          <router-link to="/prodQuestao">
            <v-icon small class="mr-2">mdi-pencil</v-icon>
          </router-link>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
      <v-dialog v-model="dialogShow" max-width="500px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeShow">Cancel</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
       </v-dialog>
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
                { text: "Identificador", sortable: false, value: "id", class: "white--text"},
                { text: "Domínio",  sortable: false, value: "domain", class: "white--text" },
                { text: "SubDomínio",  sortable: false, value: "subdomain", class: "white--text" },
                { text: "Autor", sortable: false, value: "author", class: "white--text"},
                { text: "Data Criação", sortable: false, value: "inserted_at", class: "white--text"},
                { text: "Opções", sortable: false, value: "actions", class: "white--text"},
            ],
            search:'',
            navQuestoes: [],
        }
    },
    created(){
        axios.get(`http://localhost:8001/question`)
          .then((response)=>{
            this.navQuestoes=response.data
            console.log(this.navQuestoes);
          },(error) =>{
              console.log(error);
          });
    },
    methods: {
      showItem () {
        this.dialogShow = true
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
        background-color:#2A3F54;
        ;
    }
    .v-data-table /deep/ tr{
        color: #73879C;
        font-size: 13px;
    }
    .v-data-table /deep/ tr:nth-child(even){
        background-color: rgb(245, 245, 245);
    }

    a { text-decoration: none; }

</style>