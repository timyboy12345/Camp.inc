import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TentsView from '../views/AccommodationsView.vue'
import MainView from '../views/BookingsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/accommodations',
      name: 'accommodations',
      component: () => import('../views/AccommodationsView.vue')
    },
    {
      path: '/accommodations/:id',
      name: 'accommodation',
      component: () => import('../views/AccommodationView.vue')
    },
    {
      path: '/bookings',
      name: 'bookings',
      component: MainView
    },
    {
      path: '/demo',
      name: 'demo',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/DemoView.vue')
    }
  ]
})

export default router
