<template>
  <v-form v-model="valid" ref="form">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field v-model="formData.id" required :rules="idRules" :counter="30" label="Identificador"/>
        </v-col>

        <v-col cols="12" md="4" >
          <v-text-field v-model="formData.study_cycle" required :rules="ciclodomsRules" :counter="10" label="Ciclo de Estudos"/>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field v-model="formData.scholarity" required :rules="emailRules" :counter="75" label="Escolaridade"/>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4">
          <v-text-field v-model="formData.domain" required :rules="ciclodomsRules" :counter="100" label="Domínio"/>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field v-model="formData.subdomain" required :rules="ciclodomsRules" :counter="100" label="Subdomínio"/>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field v-model="formData.subsubdomain" required :rules="ciclodomsRules" :counter="100" label="Subsubdomínio"/>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4" class="mt-4">
          <p class="grey--text text--darken-1">Nível de Dificuldade:</p>
        </v-col>
        <v-radio-group v-model="formData.difficulty_level" row mandatory >
          <v-col cols="12" md="4" sm="4" xm="1">
            <v-radio label="1" value="1"/>
          </v-col>
          <v-col cols="12" md="4" sm="4" xm="1">
            <v-radio label="2" value="2"/>
          </v-col>
          <v-col cols="12" md="4" sm="4" xm="1">
            <v-radio label="3" value="3"/>
          </v-col>
          <v-col cols="12" md="4" sm="4" xm="1">
            <v-radio label="4" value="4"/>
          </v-col>
          <v-col cols="12" md="4" sm="4" xm="1">
            <v-radio label="5" value="5"/>
          </v-col>
        </v-radio-group>
      </v-row>
      
      <v-row>
        <v-col xs="12">
          <v-text-field v-model="formData.author" required :rules="ciclodomsRules" :counter="75" label="Autor"/>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4" class="mt-4">
          <p class="grey--text text--darken-1">Modo de Visualização:</p>
        </v-col>
        <v-radio-group v-model="formData.display_mode" row mandatory>
          <v-col cols="12" md="4" sm="4" xm="1">
            <v-radio label="G" value="G"/>
          </v-col>
          <v-col cols="12" md="4" sm="4" xm="1">
            <v-radio label="I" value="I"/>
          </v-col>
        </v-radio-group>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6">
          <v-select v-model="formData.answering_time" :items="tempos" label="Tempo de Resposta" dense/>
        </v-col>
        <v-col cols="12" sm="6">
          <v-select v-model="formData.type" :items="tipos" outlined label="Tipo de Questão" dense/>
        </v-col>
        <v-col cols="12" sm="6">
          <v-select v-model="formData.repetitions" :items="repeticoes" solo label="Repetições" dense/>
        </v-col>
      </v-row>
        
      <v-row>
        <v-col cols="8" >
          <v-autocomplete v-model="formData.precedencias" :items="items" dense label="Precedências" multiple/>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>


<script>
  export default {
    data() {
      return{
        valid: false,
        formData:{
            id: '',
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
            repetitions: ''
          },
        nameRules: [
          v => !!v || 'Name is required',
          v => v.length <= 10 || 'Name must be less than 10 characters',
        ],
        email: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid',
        ],
        tempos: ['30', '45', '60'],
        tipos: ['1', '2', '3'],
        repeticoes: ['1', '2', '3']
      }  
    },
    methods: {
      reset () {
        this.$refs.form.reset()
      }
    },
    watch: {
        formData: {
            handler: function() {
              this.$emit('newdataCaracterizacao', [this.formData.id,this.formData.study_cycle,this.formData.scholarity,this.formData.domain,
              this.formData.subdomain,this.formData.subsubdomain,this.formData.difficulty_level,this.formData.author,this.formData.display_mode,
              this.formData.answering_time,this.formData.type,this.formData.precedence,this.formData.repetitions]);
             
          },
            deep: true
        }
      }   
  }
</script>
