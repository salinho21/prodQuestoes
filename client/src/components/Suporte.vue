<template>
    <v-container>
        <h3 style="color:#2A3F54;padding-bottom:15px;">Escolha os ficheiros de imagem (png/jpg):</h3>
        <v-col cols="8">  
            <v-file-input
                show-size
                counter
                chips
                multiple
                label="Introduzir Imagens"
            ></v-file-input>
        </v-col>
        <h3 style="color:#2A3F54;padding-bottom:15px;">Escolha os ficheiros de video:</h3>
        <v-col cols="8">  
            <v-file-input
                show-size
                counter
                chips
                multiple
                label="Introduzir Videos"
            ></v-file-input>
        </v-col>
    </v-container>
</template>

<script>

export default ({
    data(){
        return{
            
        }
        
    }
    
})
</script>
