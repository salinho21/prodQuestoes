import Vue from 'vue'
import VueRouter from 'vue-router'
import Dominios from '../views/Dominios.vue'
import ProdQuestao from '../views/ProdQuestao.vue'
import ProdDominio from '../views/ProdDominio.vue'
import Questoes from '../views/Questoes.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/dominios',
    name: 'Dominios',
    component: Dominios
  },
  {
    path: '/prodQuestao',
    name: 'ProdQuestao',
    component: ProdQuestao
  },
  {
    path: '/prodDominio',
    name: 'ProdDominio',
    component: ProdDominio
  },
  {
    path: '/questoes',
    name: 'Questoes',
    component: Questoes
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
