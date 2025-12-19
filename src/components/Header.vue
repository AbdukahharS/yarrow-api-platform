<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useTheme } from '../composables/useTheme'

import Bell from '../assets/icons/bell.svg?component'
import User from '../assets/icons/user.svg?component'
import Moon from '../assets/icons/moon.svg?component'
import Sun from '../assets/icons/sun.svg?component'

const { theme, toggleTheme } = useTheme()

const route = useRoute()
</script>

<template>
  <header>
    <h2 class="title">{{ route.name }}</h2>

    <div class="actions">
      <button class="notification-btn">
        <Bell class="icon" />
        <span class="badge">3</span>
      </button>
      <button><User class="icon" /></button>
      <button
        @click="toggleTheme"
        class="theme-toggle"
        :aria-label="`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`"
      >
        <Moon class="icon" v-if="theme === 'light'" />
        <Sun class="icon" v-else />
      </button>
    </div>
  </header>
</template>

<style scoped>
header {
  background: var(--bg-primary);
  padding: 16px 24px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  border: 1px solid var(--border-color);
  border-top: none;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 600;
    color: var(--primary-color);
  }

  .actions {
    display: flex;
    gap: 8px;

    button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 10px;
      border-radius: 8px;
      transition: background 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      &:hover {
        background: var(--bg-secondary);
      }

      .icon {
        width: 20px;
        height: 20px;
        color: var(--text-primary);
      }
    }

    .notification-btn {
      .badge {
        position: absolute;
        top: -4px;
        right: -4px;
        background: var(--primary-color);
        color: white;
        font-size: 12px;
        font-weight: 500;
        min-width: 20px;
        height: 20px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 4px;
      }
    }
  }
}
</style>
