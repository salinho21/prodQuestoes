<template>
    <v-container>
    <v-form v-model="valid" ref="form" >
            <v-row>
                <v-col cols="8">
                    <v-text-field
                    v-model="resposta.answer"
                    :rules="idRules"
                    :counter="200"
                    label="Texto da Resposta"
                    required
                ></v-text-field>
                </v-col>
            </v-row>

            <v-row>
                <v-col xl="2" lg="3" md="3" sm="4" class="mt-4">
                    <p class="grey--text text--darken-1">Resposta Correta:</p>
                 </v-col>
                <v-radio-group
                    v-model="resposta.correction"
                    row
                    mandatory     
                >
                    <v-col md="4" sm="4">
                        <v-radio
                        label="0"
                        value="0"
                        ></v-radio>
                    </v-col>
                    <v-col md="4" sm="4">
                        <v-radio
                        label="1"
                        value="1"
                        ></v-radio>
                    </v-col>
                </v-radio-group>
            </v-row>
                
            <v-row>
                <v-col xl="2" lg="3" md="3" sm="4" class="mt-4">
                    <p class="grey--text text--darken-1">Resposta Obrigatória:</p>
                 </v-col>
                <v-radio-group
                    v-model="resposta.mandatory"
                    row
                    mandatory     
                >
                    <v-col md="4" sm="4">
                        <v-radio
                        label="0"
                        value="0"
                        ></v-radio>
                    </v-col>
                    <v-col md="4" sm="4">
                        <v-radio
                        label="1"
                        value="1"
                        ></v-radio>
                    </v-col>
                </v-radio-group>
            </v-row>

            <v-row>
                <v-col xl="2" lg="3" md="3" sm="4" class="mt-4">
                    <p class="grey--text text--darken-1">Resposta Eliminatória:</p>
                 </v-col>
                <v-radio-group
                    v-model="resposta.eliminative"
                    row
                    mandatory     
                >
                    <v-col md="4" sm="4">
                        <v-radio
                        label="0"
                        value="0"
                        ></v-radio>
                    </v-col>
                    <v-col md="4" sm="4">
                        <v-radio
                        label="1"
                        value="1"
                        ></v-radio>
                    </v-col>
                </v-radio-group>
            </v-row>

            <v-row>
                <v-col cols="5">
                    <v-select :items="pontos"
                        v-model="resposta.point"
                        label="Pontos"
                        dense
                    ></v-select>
                </v-col>
                <v-col cols="7" align="center">
                    <v-btn @click="addAnswer" class="white--text" color="#2A3F54" grey--text>
                        Adicionar Resposta
                    </v-btn> {{formData.body}}
                </v-col>
            </v-row>
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
            }
    },
    mounted() {
      this.addAnswer();
    },
    methods: {
      reset () {
        this.$refs.form.reset()
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