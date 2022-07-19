import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Lista from '../views/Lista.vue'
import Reserva from '../views/Reserva.vue'
import PerfilUser from '../views/UserPerfil.vue'
import PerfilAdmin from '../views/AdminPerfil.vue'

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
    path: '/perfilUser',
    name: 'PerfilUser',
    component: PerfilUser
  },
  {
    path: '/perfilAdmin',
    name: 'PerfilAdmin',
    component: PerfilAdmin
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
