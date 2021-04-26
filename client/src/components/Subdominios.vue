<template>
    <v-container>
        <v-form v-model="valid" ref="form" >
                <v-row>
                    <v-col cols="8">
                        <v-text-field
                        v-model="subdominio.designation"
                        :rules="rules.required"
                        :counter="200"
                        label="Subdomínio"
                    ></v-text-field>
                    </v-col>
                </v-row>

                <v-row class="mt-5">
                    <v-col cols="12" md="12">
                        <v-textarea
                            v-model="subdominio.description"
                            label="Descrição"
                            counter
                            outlined
                            auto-grow
                            background-color="#f2f2fc"
                            color="#2A3F54"
                            rows="3"
                            :rules="rules.required"
                            placeholder="Introduza uma Descrição para o Subdomínio"
                        ></v-textarea>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12" align="right" class="mb-5">
                        <v-btn @click="addAnswer" class="white--text" color="#2A3F54" grey--text>
                            Adicionar Resposta 
                        </v-btn> 
                    </v-col>
                </v-row>
                <v-card class="mx-auto" tile>
                <v-card-title>Lista de Subdomínios</v-card-title>

                    <v-data-table
                    :headers="headers"
                    :items="formData.body"
                    disable-pagination
                    :hide-default-footer="true"
                    class="mb-5"
                    >
                        <template v-slot:[`item.index`]="props">
                            {{ props.index+1 }}
                        </template>

                        <template v-slot:[`item.answer`]="{ item }">
                                {{ item.answer.slice(0, 10) + '...' }}              
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
            formData: {
                body: [],
            },
            subdominio: {},
            rules: {
                required: [(v) => !!v || "Field is required"],
                length30: [v => (v && v.length <= 30) || "Field must be less or equal than 30 characters"],
                length75: [v => (v && v.length <= 75) || "Field must be less or equal than 75 characters"],
                length100: [v => (v && v.length <= 100) || "Field must be less or equal than 100 characters"],
            },
            headers: [
                { text: "Número", align: "start", sortable: false, value: "index" },
                { text: "Designação",  sortable: false, value: "designation" },
                { text: "Descrição",  sortable: false, value: "description" },
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
          const subdominio = {
            designation: "",
            description: "",
        };
        this.formData.body.push(subdominio);
        this.subdominio = subdominio;
      }
    },
    watch: {
        formData: {
            handler: function() {
              this.$emit('newdataSubdominio', this.formData.body);
            },
            deep: true
        }
      },
}
</script>
