<template>
    <v-container>
        <AppHeader></AppHeader>
        <NavDraw></NavDraw>
        <v-card>
            <v-data-table
                :headers="headers"
                :items="navQuestoes"
                :items-per-page="15"
                :search="search"
                multi-sort       
            >
                <template v-slot:top>
                    <v-toolbar>
                        <v-toolbar-title class>Preparação de Questões</v-toolbar-title>
                        <v-spacer></v-spacer>

                        <!-- Barra de Pesquisa -->
                        <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Pesquisa"
                        single-line
                        hide-details
                        class="mr-5"
                        ></v-text-field>
                        <v-btn to="/prodQuestao" color="#2A3F54" class="white--text">
                            <v-icon>mdi-text-box-plus-outline</v-icon>
                        </v-btn>
                    </v-toolbar>
                </template>
            <!-- Definição dos headers -->

                <template v-slot:[`item.options`]="{ }">
                    <v-icon
                        small
                        class="mr-2"
                        
                    >
                        icon MDI
                    </v-icon>
                </template>

                <template v-slot:[`item.actions`]="{ item }">
                    <v-icon small class="mr-2" @click="editItem(item)">mdi-eye</v-icon>
                    <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
                    <v-icon small to="/prodQuestao" @click="deleteItem(item)">mdi-delete</v-icon>
                </template> 
            </v-data-table>
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
            headers: [
                { text: "Identificador", sortable: false, value: "id", class: "white--text"},
                { text: "Domínio",  sortable: false, value: "domain", class: "white--text" },
                { text: "SubDomínio",  sortable: false, value: "subdomain", class: "white--text" },
                { text: "Autor", sortable: false, value: "author", class: "white--text"},
                { text: "Data Criação", sortable: false, value: "inserted_at", class: "white--text"},
                { text: "Opções", sortable: false, value: "actions", class: "white--text"},
            ],
            desserts: [
                {
                    name: 'Frozen Yogurt',
                    calories: 159,
                    fat: 6.0,
                    carbs: 24,
                    protein: 4.0,
                    iron: '1%',
                }
            ],
            search:'',
            navArray: [],
            navQuestoes: [],
        }
    },
    mounted(){
        axios.get(`http://localhost:8001/question`)
          .then((response)=>{
            this.navQuestoes=response.data
            console.log(this.navQuestoes);
          },(error) =>{
              console.log(error);
          });
        ////console.log(value);
           /* const navObj ={
                id = arrayItem.id,
                Dominio = arrayItem.domain,
                SubDominio = arrayItem.subdomain,
                Autor = arrayItem.author,
                DataCriacao = arrayItem.inserted_at
            }
            this.navArray.push(navObj);
        */

        //}); 

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

</style>