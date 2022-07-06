import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Lista from '../views/Lista.vue'
import Reserva from '../views/Reserva.vue'
import Perfil from '../views/UserPerfil.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/lista',
    name: 'ListaLivros',
    component: Lista
  },
  {
    path: '/reserva',
    name: 'ReservaLivros',
    component: Reserva
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: Perfil
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
