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
  <div class="dashboard">
    <div class="header">
      <h1>Dashboard</h1>
    </div>
    <p>This is a protected route. You must be authenticated to see this.</p>
    <button @click="handleLogout">Logout</button>
  </div>
</template>

<style scoped>
.dashboard {
  padding: 2rem;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

h1 {
  margin: 0;
  color: var(--text-primary);
}

p {
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.2);
  }
}
</style>
