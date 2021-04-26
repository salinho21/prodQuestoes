<template>
    <v-container>
        <AppHeader></AppHeader>
        <div>
            <NavDraw></NavDraw>
        </div>
        <v-row align="center" justify="space-around" class="mt-5">
            <v-btn to="/dominios" color="#2A3F54" class="white--text">
            Domínios
            </v-btn>
            <v-btn to="/questao" color="#2A3F54" class="white--text">
            Questões
            </v-btn>
        </v-row>
        
        <Footer class="mt-5"></Footer>
    </v-container>
</template>

<script>
//imports dos outros componentes e axios para os pedidos
//import axios from 'axios'
import AppHeader from '@/components/AppHeader'
import NavDraw from '@/components/NavDraw'
import Footer from '@/components/Footer'
export default {

    components: { 
        AppHeader,
        NavDraw,
        Footer
    }, 

    data(){
        return{
            headers:[
                {
                    text: "Identificador",
                    value: "valor"
                },
                {
                    text:`Dominio`,
                    value:'options',
                    sortable: false
                },
                {
                    text:`SubDominio`,
                    value:'options',
                    sortable: false
                },
                {
                    text:`Autor`,
                    value:'options',
                    sortable: false
                },
                {
                    text:`Data Criação`,
                    value:'options',
                    sortable: false
                },
                {
                    text:`Opções`,
                    value:'options',
                    sortable: false
                }
            ],
            search:'',
        }
    }
}
</script>
<style scoped>
    /* css para tornar a aparência mais similar ao template */
    .v-data-table /deep/ th{
        background-color:#4b779e;
    }
    .v-data-table /deep/ tr{
        color: #73879C;
        font-size: 13px;
    }
    .v-data-table /deep/ tr:nth-child(even){
        background-color: rgb(245, 245, 245);
    }
    #docs *{
        box-sizing: border-box;
    }
    #docs{
        margin: 20px auto;
        max-width: 1100px;
        margin-bottom: 80px;
    }
    label {
        color: white;
        padding: 8px;
        font-family: Arial, sans-serif;
        font-weight: bold;
        font-size: 15px;
    }
</style>