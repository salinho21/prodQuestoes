import Vue from 'vue'
import VueRouter from 'vue-router'
import Questao from '../views/prodQuestao.vue'
import Dominios from '../views/prodDominios.vue'
import Listagem from '../views/Listagem.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Listagem',
    component: Listagem
  },
  {
    path: '/questao',
    name: 'Questao',
    component: Questao
  },
  {
    path: '/dominios',
    name: 'Dominios',
    component: Dominios
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
