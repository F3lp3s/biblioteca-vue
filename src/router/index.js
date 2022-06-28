import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Lista from '../views/Lista.vue'
import Reserva from '../views/Reserva.vue'

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
    path: '/home/lista',
    name: 'ListaLivros',
    component: Lista
  },
  {
    path: '/home/reserva',
    name: 'ReservaLivros',
    component: Reserva
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
