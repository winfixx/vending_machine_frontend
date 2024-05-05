import { ADMIN_ROUTE, DRINK_ROUTE, HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, VENDING_MACHINE_ROUTE } from '@/consts/routes'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: HOME_ROUTE,
      name: 'home',
      component: HomeView
    },
    {
      path: ADMIN_ROUTE,
      name: 'admin',
      component: () => import('../views/AdminView.vue')
    },
    {
      path: ADMIN_ROUTE + '/:id',
      name: 'admin update',
      component: () => import('../views/UpdateVending/UpdateVendingView.vue')
    },
    {
      path: REGISTRATION_ROUTE,
      name: 'registration',
      component: () => import('../views/RegistrationView.vue')
    },
    {
      path: LOGIN_ROUTE,
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: VENDING_MACHINE_ROUTE + '/:id',
      name: 'drink',
      component: () => import('../views/VendingMachineView.vue')
    }
  ]
})

export default router
