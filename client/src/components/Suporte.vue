<template>
    <v-container>
        <v-form v-model="valid" ref="form">
            <v-row>          
                <v-col cols="8">  
                    <h3 style="color:#2A3F54;padding-bottom:15px;">Escolha os ficheiros de imagem (png/jpg):</h3>
                    <v-file-input
                        show-size
                        counter
                        chips
                        multiple
                        label="Introduzir Imagens"
                    ></v-file-input>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="8">  
                    <h3 style="color:#2A3F54;padding-bottom:15px;">Escolha os ficheiros de video:</h3>
                    <v-file-input
                        show-size
                        counter
                        chips
                        multiple
                        label="Introduzir Videos"
                    ></v-file-input>
                </v-col>
            </v-row>
            
            <v-row class="mt-5">
                <v-col cols="12" md="12">
                    <v-textarea
                        v-model="formData.explanation"
                        label="Explicação"
                        counter
                        outlined
                        auto-grow
                        background-color="#f2f2fc"
                        color="#2A3F54"
                        :rules="rules.required"
                        rows="3"
                        placeholder="Introduza uma explicação sobre a questão"
                    ></v-textarea>
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
                        :rules="rules.required"
                        rows="3"
                        placeholder="Introduza algumas notas sobre a questão"
                    ></v-textarea>
                </v-col>
            </v-row>

            <v-row class="mt-5">
                <v-col cols="12" md="12">
                    <v-textarea
                        v-model="formData.source"
                        label="Fontes"
                        counter
                        outlined
                        auto-grow
                        background-color="#f2f2fc"
                        color="#2A3F54"
                        :rules="rules.required"
                        rows="3"
                        placeholder="Introduza algumas fontes de informação sobre a questão"
                    ></v-textarea>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" sm="6">
                    <v-select v-model="formData.status" clear :rules="rules.required" :items="status" label="Status" dense/>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-select v-model="formData.language" :rules="rules.required" :items="language" label="Language" dense/>
                </v-col>
            </v-row>
        </v-form>
    </v-container>
</template>

<script>

export default ({
    data(){
        return{
            formData:{
                explanation: '',
                notes: '',
                source: '',
                status: '',
                language: ''
                
            },
            rules: {
                required: [(v) => !!v || "Field is required"],
            },
            status: ['E', '?'],
            language: ['Portuguese', 'English', 'Spanish', 'French'],
        }
        
    },
    methods: {
      reset () {
        this.$refs.form.reset()
      },
      validate() {
        return this.$refs.form.validate()
      }
    },
    watch: {
        formData: {
            handler: function() {
              this.$emit('newdataSuporte', [this.formData.explanation,this.formData.notes,
              this.formData.source,this.formData.status,this.formData.language]);            
          },
            deep: true
        }
      }  
    
})
</script>
