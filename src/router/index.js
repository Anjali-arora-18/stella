import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/:restName/:restId',
      name: 'menu',
      component: HomeView,
    },
    {
      path: '/product/:id',
      name: 'ProductDescription',
      component: () => import('@/components/ProductDescription.vue'),
      props: true,
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../components/CartView.vue'),
    },
    {
      path: '/404',
      name: '404',
      component: () => import('../views/404.vue'),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // If this is a back/forward navigation, restore the saved scroll position
    if (savedPosition) {
      return savedPosition
    }

    // Otherwise, scroll to top
    return { top: 0 }
  },
})

export default router
