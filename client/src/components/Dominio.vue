<template>
  <v-form v-model="valid" ref="form">
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-text-field v-model="formData.id" 
            :rules="[...rules.required,...rules.length100]" 
            :counter="100" label="Identificador"
            :input="onChange()"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-textarea
                    v-model="formData.description"
                    label="Descricao"
                    counter
                    outlined
                    auto-grow
                    background-color="#f2f2fc"
                    color="#2A3F54"
                    rows="3"
                    :rules="rules.required"
                    placeholder="Insira uma Descrição"
                    :input="onChange()"
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-text-field v-model="formData.scholarity" :rules="[...rules.required,...rules.length75]" :counter="75" label="Escolaridade"/>
        </v-col>
        <v-col cols="6">
          <v-text-field v-model="formData.responsavel" :rules="[...rules.required,...rules.length75]" :counter="75" label="Responsável"/>
        </v-col>
      </v-row>

      <v-row class="mt-5">
        <v-col cols="12" md="12">
          <v-textarea
                    v-model="formData.notes"
                    label="Notas"
                    counter
                    outlined
                    auto-grow
                    background-color="#f2f2fc"
                    color="#2A3F54"
                    rows="3"
                    :rules="rules.required"
                    placeholder="Introduza algumas notas sobre o Domínio"
          ></v-textarea>
        </v-col>
      </v-row>

      <v-row>
        <v-col sm="3" md="3" lg="2" xl="2" class="mt-4">
          <p class="grey--text text--darken-1">Tipo de Acesso:</p>
        </v-col>
        <v-radio-group v-model="formData.access_type" row mandatory>
          <v-col xm="1" sm="5" md="5" lg="5" xl="5">
            <v-radio label="Público" value="publico"/>
          </v-col>
          <v-col xm="1" sm="4" md="4" lg="4" xl="5"> 
            <v-radio label="Privado" value="privado"/>
          </v-col>
        </v-radio-group>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
  export default {
    data() {
      return{
        sendObject:{
          sendId:'',
          sendDescription: '',
        },
        valid: false,
        formData:{
            id: '',
            description: '',
            scholarity: '',
            responsavel: '',
            notes: '',
            access_type: '',
          },

        rules: {
            required: [(v) => !!v || "Field is required"],
            length30: [v => (v && v.length <= 30) || "Field must be less or equal than 30 characters"],
            length75: [v => (v && v.length <= 75) || "Field must be less or equal than 75 characters"],
            length100: [v => (v && v.length <= 100) || "Field must be less or equal than 100 characters"],
        },
      }  
    },
    methods: {
      reset () {
        this.$refs.form.reset()
      },
      validate() {
        return this.$refs.form.validate()
      },
      onChange(){
        this.sendObject.sendId = this.formData.id
        this.sendObject.sendDescription = this.formData.description
        this.$root.$emit('change',this.sendObject)
      }
    },
    watch: {
        formData: {
            handler: function() {
              this.$emit('newdataCaracterizacao', [this.formData.id,this.formData.description,this.formData.scholarity,
              this.formData.responsavel,this.formData.notes,this.formData.access_type]);         
          },
            deep: true
        }
      }   
  }
</script>