import { createRouter, createWebHistory } from 'vue-router'
import { session } from './data/session'
import { userResource } from '@/data/user'

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: { name: 'ProductsListPage' },
  },
  {
    path: '/products',
    name: 'ProductsListPage',
    component: () => import('@/pages/Products.vue'),
  },
  {
    path: '/products/:name',
    name: 'ProductDetailsPage',
    component: () => import('@/pages/ProductDetails.vue'),
  },
  {
    name: 'Login',
    path: '/account/login',
    component: () => import('@/pages/Login.vue'),
  },
  {
    name: 'CheckoutPage',
    path: '/checkout',
    component: () => import('@/pages/Checkout.vue'),
    meta: {
      requiresLogin: true,
    },
  },
]

let router = createRouter({
  history: createWebHistory('/frontend-starecom'),
  routes,
})

router.beforeEach(async (to, from, next) => {
  let isLoggedIn = session.isLoggedIn
  try {
    await userResource.promise
  } catch (error) {
    isLoggedIn = false
  }

  if (to.name === 'Login' && isLoggedIn) {
    next({ name: 'Home' })
  } else if (to.name !== 'Login' && !isLoggedIn) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
