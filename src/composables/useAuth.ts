import { ref } from 'vue'

const isAuthenticated = ref(false)

// Initialize auth state from localStorage
const initializeAuth = () => {
  const authUser = localStorage.getItem('authUser')
  isAuthenticated.value = !!authUser
}

// Initialize on module load
initializeAuth()

export function useAuth() {
  const login = () => {
    isAuthenticated.value = true
  }

  const logout = () => {
    isAuthenticated.value = false
    localStorage.removeItem('authUser')
  }

  const checkAuth = (): boolean => {
    const authUser = localStorage.getItem('authUser')
    isAuthenticated.value = !!authUser
    return isAuthenticated.value
  }

  const getCurrentUser = () => {
    const authUser = localStorage.getItem('authUser')
    return authUser ? JSON.parse(authUser) : null
  }

  return {
    isAuthenticated,
    login,
    logout,
    checkAuth,
    getCurrentUser
  }
}
