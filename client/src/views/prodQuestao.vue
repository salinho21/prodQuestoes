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
                      <v-card-subtitle class="white--text text-h5">Preparação de Questões</v-card-subtitle>
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
                      <Caracterizacao ref="ct" @newdataCaracterizacao="handleDataCaracterizacao($event)"/>
                   </v-tab-item>
                   <v-tab-item eager>
                      <Respostas ref="rp" @newdataRespostas="handleDataRespostas($event)"/>
                   </v-tab-item>
                   <v-tab-item eager>
                      <Suporte ref="sp" @newdataSuporte="handleDataSuporte($event)"/>
                   </v-tab-item>
                 </v-tabs-items>
              </v-card>
              
              <v-card class="mx-auto" >
                <v-row class="px-2 pb-2 ma-0 py-2" justify="space-between">
                  <v-btn-toggle v-model="formatting" multiple dense class="ml-5 mb-3">
                    <v-btn @click="submit" color="#F0B62B" elevation="5" class="mr-2">
                      <v-icon color="white">mdi-checkbox-marked-outline</v-icon>
                      
                    </v-btn>

                    <v-btn color="white" elevation="5" class="mr-2">
                      <v-icon color="black">mdi-import</v-icon>
                    </v-btn>

                    <v-btn color="#29E898" elevation="5" @click="reset">
                      <v-icon color="white">mdi-broom</v-icon>
                    </v-btn>
                  </v-btn-toggle>

                  <v-btn-toggle v-model="alignment"
                    dense class="mr-5 mb-3">
                    <v-btn color="#2A3F54" class="mr-2" elevation="5" @click="help">
                      <v-icon color="white">mdi-help</v-icon>
                    </v-btn>

                    <v-btn to="/questoes" color="#29E898" elevation="5" class="">
                      <v-icon color="white">mdi-door-open</v-icon>
                    </v-btn>

                    <v-dialog v-model="openHelp" max-width="500px">
                      <v-card color="white">
                        <v-card-title >
                          <p>
                            Gestão de Questões
                          </p>
                        </v-card-title>
                        <v-card-text>
                          asdasdas
                        </v-card-text>
                        <v-card-actions>
                          <v-btn @click="closeHelp" color="#2A3F54">
                            <v-icon color="white">mdi-close</v-icon>
                          </v-btn>  
                        </v-card-actions>

                      </v-card>
                        
                    </v-dialog>
                  </v-btn-toggle>
                </v-row>
              </v-card>

             </v-flex>
           </v-layout>   
           <Footer class="mt-5"></Footer>   
     </v-container>
</template>

<script>
import axios from 'axios';
import Caracterizacao from '@/components/Caracterizacao'
import Respostas from '@/components/Respostas'
import Suporte from '@/components/Suporte'
import AppHeader from '@/components/AppHeader'
import NavDraw from '@/components/NavDraw'
import Footer from '@/components/Footer'

export default {
  components: { 
        Caracterizacao, 
        Respostas,
        Suporte,
        AppHeader,
        NavDraw,
        Footer
    }, 
  data() {
    return{
      tab: null,
      openHelp: false,
      items: [
        { tab: 'Caracterizacão'},
        { tab: 'Respostas'},
        { tab: 'Suporte'}
      ],
      questao:{
        id: '',
        language: "pt",
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
        explanation: "",
        images: "",
        videos: "",
        source: "",
        notes: "",
        status:"E",
        inserted_by: "User_default",
        inserted_at:new Date().toLocaleString(),
        validated_by:"",
        validated_at:""
      }
    }
  },
  methods:{

    handleDataCaracterizacao(e) {
      [this.questao.id,this.questao.study_cycle,this.questao.scholarity,this.questao.domain,this.questao.subdomain,
      this.questao.subsubdomain, this.questao.header, this.questao.difficulty_level,this.questao.author,this.questao.display_mode,
      this.questao.answering_time,this.questao.type,this.questao.precedence,this.questao.repetitions] = e;
    },

    handleDataRespostas(e) {
      this.questao.body = e;
    },

    handleDataSuporte(e) {
      [this.questao.explanation,this.questao.notes,this.questao.source,this.questao.status,this.questao.language] = e;
    },

    submit(){
      if(this.$refs.ct.validate() && this.$refs.rp.validate() && this.$refs.sp.validate()){
        axios.post(`http://localhost:8001/question`, this.questao)
          .then(function(response){
            console.log(response)
          });
          /*axios.get(`http://localhost:8001/question`)
          .then(function(response){
            console.log(response)
          });*/
        //console.log("Formulários Validados!")
      }
      else{
        console.log('Nao e valido!')   
      }  
    },

    reset() {
      this.$refs.ct.reset()
      this.$refs.rp.reset()
      this.$refs.sp.reset()
    },

    help() {
      this.openHelp = true
    },

    closeHelp() {
      this.openHelp = false
    }
  }
}
</script>



