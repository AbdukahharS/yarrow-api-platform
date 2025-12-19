import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useAuth } from './composables/useAuth'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('./pages/Dashboard.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/api-keys',
    name: 'API Keys',
    component: () => import('./pages/APIKeys.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/usage-analytics',
    name: 'Usage / Analytics',
    component: () => import('./pages/UsageAndAnalytics.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/billing',
    name: 'Billing',
    component: () => import('./pages/Billing.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/support',
    name: 'Support',
    component: () => import('./pages/Support.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: () => import('./pages/auth/SignIn.vue'),
    meta: { requiresAuth: false, hideLayout: true },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('./pages/auth/Register.vue'),
    meta: { requiresAuth: false, hideLayout: true },
  },
  {
    path: '/forgot-password',
    name: 'Forgot Password',
    component: () => import('./pages/auth/ForgotPassword.vue'),
    meta: { requiresAuth: false, hideLayout: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Navigation guard for protected routes
router.beforeEach((to, _from, next) => {
  const { checkAuth } = useAuth()
  const isAuthenticated = checkAuth()

  // Check if route requires authentication
  if (to.meta.requiresAuth && !isAuthenticated) {
    // Redirect to sign in page if not authenticated
    next({ name: 'SignIn', query: { redirect: to.fullPath } })
  } else if (to.name === 'SignIn' && isAuthenticated) {
    // Redirect to dashboard if already authenticated and trying to access sign in
    next({ name: 'Dashboard' })
  } else {
    next()
  }
})

export default router
