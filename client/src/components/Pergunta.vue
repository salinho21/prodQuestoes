<template>
    <v-form v-model="valid" ref="form">
        <v-container>
            <h4 style="color:#2A3F54;padding-bottom:15px;">Pergunta:</h4>
            <v-textarea
                v-model="formData.header"
                counter
                name="input-7-1"
                outlined
                auto-grow
                background-color="#f2f2fc"
                color="#2A3F54"
                value=""
                placeholder="Insira a Pergunta"
                :rules="rules"
            ></v-textarea>
        </v-container> 
    </v-form>
</template>

<script>

export default {
    data(){
        return{
            rules: [v => v.length <= 1000 || 'Max 1000 characters'],
            formData:{
                header: ''
            }
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
              this.$emit('newdataPergunta', this.formData.header);
          },
            deep: true
        }
      },
}
</script>