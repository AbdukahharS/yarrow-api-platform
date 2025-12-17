<script setup lang="ts">
import { useAuth } from '../composables/useAuth'
import { useRouter } from 'vue-router'

const { logout } = useAuth()
const router = useRouter()

const handleLogout = () => {
  logout()
  router.push('/signin')
}
</script>

<template>
  <div>
    <h1>Dashboard</h1>
    <p>This is a protected route. You must be authenticated to see this.</p>
    <button @click="handleLogout">Logout</button>
  </div>
</template>

<style scoped>
div {
  padding: 2rem;
}

h1 {
  margin-bottom: 1rem;
}

button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
}
</style>
