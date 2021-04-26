<template>
    <v-container>
        <p>sadads</p>
        <v-form v-model="valid" ref="form" >
                <v-row>
                    <v-col cols="8">
                        <v-text-field
                        v-model="resposta.answer"
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
                        <v-radio-group
                            v-model="resposta.correction"
                            row
                            mandatory     
                        >
                                <v-radio
                                label="0"
                                value="0"
                                ></v-radio>
                            
                                <v-radio
                                label="1"
                                value="1"
                                ></v-radio>
                            
                        </v-radio-group>
                    </v-col>
                    <v-col xl="2" lg="3" md="3" sm="6" class="mt-4">
                        <p class="grey--text text--darken-1">Resposta Obrigatória:</p>
                    </v-col>
                    <v-col lg="3" md="3" sm="6">
                        <v-radio-group
                            v-model="resposta.mandatory"
                            row
                            mandatory     
                        >
                        
                                <v-radio
                                label="0"
                                value="0"
                                ></v-radio>
                            
                            
                                <v-radio
                                label="1"
                                value="1"
                                ></v-radio> 
                        
                        </v-radio-group>
                    </v-col>
                </v-row>
                    
                <v-row>
                    <v-col xl="2" lg="3" md="3" sm="4" class="mt-4">
                        <p class="grey--text text--darken-1">Resposta Eliminatória:</p>
                    </v-col>
                    <v-col lg="3" md="3" sm="6">
                        <v-radio-group
                            v-model="resposta.eliminative"
                            row
                            mandatory     
                        >
                            
                                <v-radio
                                label="0"
                                value="0"
                                ></v-radio>
                            
                                <v-radio
                                label="1"
                                value="1"
                                ></v-radio>
                        </v-radio-group>
                    </v-col>
                    <v-col cols="6">
                        <v-select :items="pontos"
                            v-model="resposta.point"
                            label="Pontos"
                            dense
                        ></v-select>
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

            <v-data-table
            :headers="headers"
            :items="formData.body"
            disable-pagination
            :hide-default-footer="true"
            class="mb-5"
            >
                <template v-slot:[`item.index`]="props">{{ props.index+1 }}</template>
                <template v-slot:[`item.answer`]="{ item }">
                        {{ item.answer.length > 10 ? item.answer.slice(0, 10) + '...' : item.answer }}              
            </template>
                <template v-slot:[`item.actions`]="{ item }">
                    <v-icon small class="mr-2" >mdi-pencil</v-icon>
                    <v-icon small @click="deleteTutorial(item.id)">mdi-delete</v-icon>
                </template>

            </v-data-table>

            
        </v-card>
        </v-form>
    </v-container>
</template>

<script>

export default {
    data() {
        return {
            pontos: ['1', '2', '3'],
            formData: {
                body: [],
            },
            resposta: {},
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
                { text: "Pontos", sortable: false, value: "point" },
                { text: "Actions", sortable: false, value: "actions"},
            ],
        }
    },
    mounted() {
      this.addAnswer()
    },
    methods: {
      reset () {
        this.$refs.form.reset()
      },
      validate() {
        return this.$refs.form.validate()
      },
      addAnswer(){
          const resposta = {
            answer: "",
            correction: "",
            mandatory: "",
            eliminative: "",
            point: "",
        };
        this.formData.body.push(resposta);
        this.resposta = resposta;
      }
    },
    watch: {
        formData: {
            handler: function() {
              this.$emit('newdataRespostas', this.formData.body);
          },
            deep: true
        }
      },
}
</script>

