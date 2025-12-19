<script setup lang="ts">
import { useTheme } from '../composables/useTheme'
import Moon from '../assets/icons/moon.svg?component'
import Sun from '../assets/icons/sun.svg?component'

const { theme, toggleTheme } = useTheme()
</script>

<template>
  <button
    @click="toggleTheme"
    class="theme-toggle"
    :aria-label="`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`"
  >
    <Moon class="icon" v-if="theme === 'light'" />
    <Sun class="icon" v-else />
  </button>
</template>

<style scoped>
.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background: var(--bg-secondary);
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--input-border);
  }

  .icon {
    width: 20px;
    height: 20px;
    min-width: 20px;
    color: var(--text-primary);
  }
}
</style>
