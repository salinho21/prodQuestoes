<template>   
     <v-container class="my-5">
       <AppHeader></AppHeader>
        <div>
            <NavDraw></NavDraw>
        </div>
           <v-layout justify-center row wrap>
             <v-flex xs10 sm10 md9 lg9>
                <v-card color="#2A3F54" elevation="10">
                  <v-row >
                    <v-col cols="2" lg="2" xl="1">
                      <v-img src="@/assets/raccoon.png" max-width="80" class="mt-5 ml-5"></v-img>
                    </v-col>
                    <v-col>
                      <v-card-title class="yellow--text text--darken-2 text-h4 mr-5">Produção</v-card-title>
                      <v-card-subtitle class="white--text text-h5">Definição de Domínios</v-card-subtitle>
                    </v-col>
                  </v-row>
                </v-card>

                <v-card class="mt-2" elevation="10" >
                  <v-tabs v-model="tab"  show-arrows>
                    <v-tab v-for="item in items" :key="item.tab">
                     {{ item.tab }}
                    </v-tab>
                  </v-tabs>
                  <v-tabs-items v-model="tab">
                   <v-tab-item eager> 
                      <Dominio ref="dm" @newdataDominio="handleDataDominios($event)"/>
                   </v-tab-item>
                   <v-tab-item eager>
                      <Subdominios ref="sm" @newdataSubdominio="handleDataSubdominios($event)"/>
                   </v-tab-item>
                   <v-tab-item eager>
                      <Comportamento ref="cp" @newdataComportamento="handleDataComportamento($event)"/>
                   </v-tab-item>
                 </v-tabs-items>
              </v-card>
              
              <v-card class="mx-auto" >
                <v-row class="px-2 pb-2 ma-0 py-2" justify="space-between">
                  <v-btn-toggle v-model="formatting" multiple dense class="ml-5 mb-3">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">   
                        <v-btn v-bind="attrs" v-on="on" @click="confirmSubmit" color="#F0B62B" elevation="5" class="mr-2">
                          <v-icon color="white">mdi-checkbox-marked-outline</v-icon>
                        </v-btn>                     
                      </template>
                      <span>Submit</span>
                    </v-tooltip>

                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">    
                        <v-btn v-bind="attrs" v-on="on" color="white" elevation="5" class="mr-2" @click="startImport">
                          <v-icon color="black">mdi-import</v-icon>
                        </v-btn>                    
                      </template>
                      <span>Import</span>
                    </v-tooltip>

                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">    
                        <v-btn v-bind="attrs" v-on="on" color="#29E898" elevation="5" @click="reset">
                          <v-icon color="white">mdi-broom</v-icon>
                        </v-btn>                    
                      </template>
                      <span>Reset</span>
                    </v-tooltip>
                  </v-btn-toggle>

                  <v-btn-toggle v-model="alignment"
                    dense class="mr-5 mb-3">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">    
                        <v-btn v-bind="attrs" v-on="on" color="#2A3F54" class="mr-2" elevation="5" @click="help">
                          <v-icon color="white">mdi-help</v-icon>
                        </v-btn>                    
                      </template>
                      <span>Help</span>
                    </v-tooltip>

                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">    
                         <v-btn v-bind="attrs" v-on="on" to="/dominios" color="#29E898" elevation="5" class="">
                          <v-icon color="white">mdi-door-open</v-icon>
                        </v-btn>                    
                      </template>
                      <span>Sair</span>
                    </v-tooltip>
                  </v-btn-toggle>
                </v-row>
                <!-- Janela para Confirmação da Submissão -->
                <v-dialog v-model="openSubmit" max-width="500px">
                  <v-card>
                    <v-app-bar color="#2A3F54" >
                      <div class="d-flex align-center">
                        <h3 width="40" class="white--text"> Confirmar Submissão</h3>
                      </div>
                    </v-app-bar>
                    <v-container>
                      <v-row>
                        <v-col cols="3">
                          <v-card class="ml-4 mt-1" color="white" flat height="100px" width="110px" >
                              <v-img src="@/assets/questionmark.png"/>
                          </v-card>
                        </v-col>
                        <v-col cols="9">
                          <h3 class="ml-5 mt-5">Pretende confirmar a submissão do domínio?</h3>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-card-actions>
                      <v-container>
                          <v-row >
                            <v-col class="text-right">
                              <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">   
                                  <v-btn v-bind="attrs" v-on="on" color="#F0B62B" @click="submit" elevation="5" class="mt-5 mr-3">
                                    <v-icon color="white">mdi-checkbox-marked-outline</v-icon>
                                  </v-btn>                     
                                </template>
                                <span>Submit</span>
                              </v-tooltip>

                              <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">   
                                  <v-btn v-bind="attrs" v-on="on" color="#29E898" @click="closeSubmit" elevation="5" class="mt-5">
                                    <v-icon color="white">mdi-door-open</v-icon>
                                  </v-btn>                     
                                </template>
                                <span>Sair</span>
                              </v-tooltip>
                            </v-col>
                          </v-row>
                      </v-container>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <!-- Janela de Submissão Bem-Sucedida -->
                 <v-dialog v-model="openConfirmSubmit" max-width="500px">
                  <v-card>
                    <v-app-bar color="#2A3F54" >
                      <div class="d-flex align-center">
                        <h3 width="40" class="white--text"> Submissão de Domínio</h3>
                      </div>
                    </v-app-bar>
                    <v-container>
                      <v-row>
                        <v-col cols="3">
                          <v-card class="ml-4 mt-1" color="white" flat height="100px" width="110px" >
                              <v-img src="@/assets/check.png"/>
                          </v-card>
                        </v-col>
                        <v-col cols="9">
                          <h3 class="ml-5 mt-5">Submissão de Domínio com Sucesso!</h3>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-card-actions>
                      <v-container>
                          <v-row >
                            <v-col class="text-right">
                              <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">   
                                  <v-btn v-bind="attrs" v-on="on" color="#29E898" @click="closeConfirmSubmit" elevation="5" class="mt-5">
                                    <v-icon color="white">mdi-door-open</v-icon>
                                  </v-btn>                     
                                </template>
                                <span>Sair</span>
                              </v-tooltip>
                            </v-col>
                          </v-row>
                      </v-container>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <!-- Janela de Erro na Submissão -->
                <v-dialog v-model="openError" max-width="500px">
                  <v-card>
                    <v-app-bar color="#2A3F54" >
                      <div class="d-flex align-center">
                        <h3 width="40" class="white--text"> Erro na Submissão</h3>
                      </div>
                    </v-app-bar>
                    <v-container>
                      <v-row>
                        <v-col cols="3">
                          <v-card class="ml-4 mt-1" color="white" flat height="100px" width="110px" >
                              <v-img src="@/assets/error.png"/>
                          </v-card>
                        </v-col>
                        <v-col cols="9">
                          <h3 class="ml-5 mt-5">Erro na submissão do domínio!</h3>
                          <h3 class="ml-5">Por favor preencha todos os campos obrigatórios.</h3>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-card-actions>
                      <v-container>
                          <v-row >
                            <v-col class="text-right">
                              <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">   
                                  <v-btn v-bind="attrs" v-on="on" color="#29E898" @click="closeError" elevation="5" class="mt-5">
                                    <v-icon color="white">mdi-door-open</v-icon>
                                  </v-btn>                     
                                </template>
                                <span>Sair</span>
                              </v-tooltip>
                            </v-col>
                          </v-row>
                      </v-container>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <!-- Janela de Import -->
                <v-dialog v-model="openImport" max-width="500px">
                  <v-card>
                    <v-app-bar color="#2A3F54" >
                      <div class="d-flex align-center">
                        <h3 width="40" class="white--text"> Import de Domínio</h3>
                      </div>
                    </v-app-bar>
                    <v-container>
                      <v-row>
                        <v-col cols="9">
                          <h3 class="ml-5 mt-5">Insira o identificador do domínio que pretende importar.</h3>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="9" class="ml-5">
                          <v-text-field v-model="idImport" 
                            :rules="required" 
                            label="Identificador"/>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-card-actions>
                      <v-container>
                          <v-row >
                            <v-col class="text-right">
                              <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">   
                                  <v-btn v-bind="attrs" v-on="on" color="#F0B62B" @click="confirmImport" elevation="5" class="mt-5 mr-3">
                                    <v-icon color="white">mdi-import</v-icon>
                                  </v-btn>                     
                                </template>
                                <span>Import</span>
                              </v-tooltip>
                              <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">   
                                  <v-btn v-bind="attrs" v-on="on" color="#29E898" @click="closeImport" elevation="5" class="mt-5">
                                    <v-icon color="white">mdi-door-open</v-icon>
                                  </v-btn>                     
                                </template>
                                <span>Sair</span>
                              </v-tooltip>
                            </v-col>
                          </v-row>
                      </v-container>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <!-- Janela de Diálogo para Ajuda -->
                <v-dialog v-model="openHelp" max-width="500px">
                  <v-card>
                    <v-app-bar color="#2A3F54" >
                      <div class="d-flex align-center">
                        <h3 width="40" class="white--text"> Ajuda</h3>
                      </div>
                    </v-app-bar>
                    <v-container>
                      <v-row>
                        <v-col cols="3">
                          <v-card class="ml-4 mt-1" color="white" flat height="100px" width="110px" >
                              <v-img src="@/assets/information.png"/>
                          </v-card>
                        </v-col>
                        <v-col cols="9">
                          <h3 class="ml-5 mt-5">Preencha todos os campos que constituem o domínio.</h3>
                          <h3 class="ml-5">Navegue por todas as tabs para garantir que toda a informação se encontra correta.</h3>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-card-actions>
                      <v-container>
                          <v-row >
                            <v-col class="text-right">
                              <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">   
                                  <v-btn v-bind="attrs" v-on="on" color="#29E898" @click="closeHelp" elevation="5" class="mt-5">
                                    <v-icon color="white">mdi-door-open</v-icon>
                                  </v-btn>                     
                                </template>
                                <span>Sair</span>
                              </v-tooltip>
                            </v-col>
                          </v-row>
                      </v-container>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-card>
             </v-flex>
           </v-layout>   
           <Footer class="mt-5"></Footer>   
     </v-container>
</template>

<script>
import axios from 'axios';
import Dominio from '@/components/Dominio';
import Subdominios from '@/components/Subdominios';
import Comportamento from '@/components/Comportamento';
import AppHeader from '@/components/AppHeader'
import NavDraw from '@/components/NavDraw'
import Footer from '@/components/Footer'

export default {
  components: { 
        Dominio, 
        Subdominios,
        Comportamento,
        AppHeader,
        NavDraw,
        Footer
    }, 
  data() {
    return{
      tab: null,
      openHelp: false,
      openImport: false,
      openSubmit: false,
      openConfirmSubmit: false,
      openError: false,
      idImport: '',
      required: [(v) => !!v || "Field is required"],
      items: [
        { tab: 'Caracterizacão'},
        { tab: 'Subdomínios'},
        { tab: 'Comportamento'}
      ],
      domain:{
        id: '',
        description: 'pt',
        scholarity: '',
        responsible: '',
        notes: '',
        access_type: '',
        body: [],
        default_user_level: '',
        high_performance_factor: '',
        low_performance_factor: '',
        high_skill_factor: '',
        low_skill_factor: '',
        min_questions_number: '',
        question_factor: '',
        inserted_by: "User_default",
        inserted_at:new Date().toLocaleString()
      },
      edit:{
        _id:null,
        id: '',
        description: 'pt',
        scholarity: '',
        responsible: '',
        notes: '',
        access_type: '',
        body: [],
        default_user_level: '',
        high_performance_factor: '',
        low_performance_factor: '',
        high_skill_factor: '',
        low_skill_factor: '',
        min_questions_number: '',
        question_factor: '',
        inserted_by: "User_default",
        inserted_at:new Date().toLocaleString()
      }
    }
  },
  methods:{

    handleDataDominios(e) {
      [this.domain.id,this.domain.description,this.domain.scholarity,this.domain.responsible,
      this.domain.notes,this.domain.access_type,this.editing,this.edit._id] = e;
    },

    handleDataSubdominios(e) {
      this.domain.body = e;
    },

    handleDataComportamento(e) {
      [this.domain.default_user_level,this.domain.high_performance_factor,this.domain.low_performance_factor
      ,this.domain.high_skill_factor,this.domain.low_skill_factor,this.domain.min_questions_number,
      this.domain.question_factor] = e;
    },

    confirmSubmit(){
      if(this.$refs.dm.validate() && this.$refs.sm.validate() && this.$refs.cp.validate()){
        this.openSubmit = true
      }
      else{
        this.openError = true   
      }
    },

    submit(){
      console.log(this.editing)
      if(this.editing == false){
        console.log("entrei no true")
        axios.post(`http://localhost:8001/domain`, this.domain)
            .then(function(response){
              console.log(response)
            },(error) =>{
                console.log(error);
          }); 
      }else{
        console.log("entrei no false")
        this.edit.id = this.domain.id
        this.edit.description = this.domain.description
        this.edit.scholarity = this.domain.scholarity
        this.edit.responsible = this.domain.responsible
        this.edit.notes = this.domain.notes
        this.edit.access_type = this.domain.access_type
        this.edit.body = this.domain.body
        this.edit.default_user_level = this.domain.default_user_level
        this.edit.high_performance_factor = this.domain.high_performance_factor
        this.edit.low_performance_factor = this.domain.low_performance_factor
        this.edit.high_skill_factor = this.domain.high_skill_factor
        this.edit.low_skill_factor= this.domain.low_skill_factor
        this.edit.min_questions_number = this.domain.min_questions_number
        this.edit.question_factor = this.domain.question_factor
        this.edit.inserted_by = this.domain.inserted_by
        this.edit.inserted_at = this.domain.inserted_at

        axios.put(`http://localhost:8001/domain`, this.edit)
            .then(function(response){
              console.log(response)
            },(error) =>{
                console.log(error);
          }); 
      } 
      this.openSubmit = false
      this.openConfirmSubmit = true
      this.reset()
    },

    startImport() {
      this.openImport = true
    },

    confirmImport(){
      this.$root.$emit('import', this.idImport)
      this.openImport = false
    },

    closeImport() {
      this.openImport = false
    },

    closeConfirmSubmit() {
      this.openConfirmSubmit = false
    },

    help() {
      this.openHelp = true
    },

    closeHelp() {
      this.openHelp = false
    },

    closeError() {
      this.openError = false
    }
  }
}
</script>