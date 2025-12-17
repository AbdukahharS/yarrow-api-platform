import { ref } from 'vue'

const isAuthenticated = ref(false)

export function useAuth() {
  const login = () => {
    isAuthenticated.value = true
    // Add your login logic here (e.g., store token)
  }

  const logout = () => {
    isAuthenticated.value = false
    // Add your logout logic here (e.g., remove token)
  }

  const checkAuth = (): boolean => {
    // Add your authentication check logic here
    // For example, check if token exists in localStorage
    // const token = localStorage.getItem('auth-token')
    // isAuthenticated.value = !!token
    return isAuthenticated.value
  }

  return {
    isAuthenticated,
    login,
    logout,
    checkAuth
  }
}
