<template>
    <v-container>
        <v-form v-model="valid" ref="form" >
            <v-card elevation="3">
                <h2 class="titulo mb-4 ml-3">Domínio {{this.idDominio}}</h2>
                <p class="field ml-5">Descrição: <span class="fieldtext">{{this.description}}</span></p>
                <v-divider></v-divider>
            </v-card>
                    
                <v-row>
                    <v-col cols="8">
                        <v-text-field
                        class="mt-4"
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
                        <v-btn @click="addSubdominio" class="mr-5" color="#2A3F54">
                            <v-icon color="white">mdi-plus</v-icon>
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
                    fixed-header
                    class="mb-5"
                    >   
                        
                            
                        
                        <template v-slot:[`item.index`]="props">
                            {{ props.index+1 }}
                        </template>

                        <template v-slot:[`item.designation`]="{ item }">
                                {{ item.designation.length > 15 ? item.designation.slice(0, 15) + '...' : item.designation }}              
                        </template>

                        <template v-slot:[`item.description`]="{ item }">
                                {{ item.description.length > 15 ? item.description.slice(0, 15) + '...' : item.description }}              
                        </template>

                        <template v-slot:[`item.actions`]="{ item }">
                            <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
                            <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
                        </template>         
                    </v-data-table>   

                    <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card>
                            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                                <v-btn color="blue darken-1" text @click="deleteConfirm">OK</v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>

                    <v-dialog v-model="dialogEdit" max-width="500px">
                        <v-card>
                            <v-card-title class="headline">Edit</v-card-title>
                            <v-card-text>
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
                            </v-card-text>
                            <v-card-actions>                               
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="closeEdit">Cancel</v-btn>
                                <v-btn color="blue darken-1" text @click="editConfirm">OK</v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>

                </v-card>
        </v-form>
    </v-container>
</template>

<script>

export default {
    data() {
        return {
            idDominio: '',
            description: '',
            editedIndex: -1,
            editing: false,
            dialogEdit: false,
            dialogDelete: false,
            formData: {
                body: [],
            },

            subdominio: {
                designation: "",
                description: "",
            },
            
            defaultSub: {
                designation: "",
                description: "",
            },
            
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
      this.$root.$on('change', data => {
            this.idDominio = data.sendId
            this.description = data.sendDescription
      })
    },

    methods: {

      reset () {
        this.$refs.form.reset()
      },

      validate() {
        return this.$refs.form.validate()
      },

      addSubdominio(){
        this.formData.body.push(this.subdominio);
        this.subdominio = Object.assign({}, this.defaultSub)
      },

      editItem (item) {
        this.editedIndex = this.formData.body.indexOf(item)
        this.subdominio = Object.assign({}, item)
        this.dialogEdit = true
      },

      deleteItem (item) {
        this.editedIndex = this.formData.body.indexOf(item)
        this.dialogDelete = true
      },     

      editConfirm() {
        this.$set(this.formData.body, this.editedIndex, this.subdominio)
        this.subdominio = Object.assign({}, this.defaultSub)
        this.dialogEdit = false
      },

      deleteConfirm () {
        this.formData.body.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.subdominio = Object.assign({}, this.defaultSub)
        this.editedIndex = -1
      },

      closeEdit () {
        this.dialogEdit = false
        this.editedIndex = -1
      },

      closeDelete () {
        this.dialogDelete = false
        this.editedIndex = -1
      },
      
    },
    watch: {
        formData: {
            handler: function() {
              this.$emit('newdataSubdominio', this.formData.body);
            },
            deep: true
        },
        dialogDelete (val) {
            val || this.closeDelete()
        },
      },
}
</script>

<style scoped>
  h2.titulo{
    color:#2A3F54;
  }
  p.field{
    color:#2A3F54;
  }
  span.fieldtext{
    color:black;
  }
</style>
