import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import ProfileView from '../views/ProfileView.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        title:'Home',
        component: Home
      },
      {
        path: "/profile/:username",
        name: "profile",
        component: ProfileView,
      },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
  })
  
  export default router