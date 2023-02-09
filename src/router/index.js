import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeComponent.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        title:'Home',
        component: Home
      },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
  })
  
  export default router