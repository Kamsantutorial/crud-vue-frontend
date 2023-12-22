import { createRouter, createWebHistory } from 'vue-router'
import UserView from '../views/UserView.vue'

// KAMSAN TUTORIAL
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: UserView
    }
  ]
})

export default router
