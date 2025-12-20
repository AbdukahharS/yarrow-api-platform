<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

import User from '../assets/icons/user.svg?component'
import Logout from '../assets/icons/logout.svg?component'

const { logout } = useAuth()
const router = useRouter()

const isOpen = ref(false)
const menuRef = ref<HTMLElement | null>(null)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const closeMenu = () => {
  isOpen.value = false
}

const handleLogout = () => {
  logout()
  closeMenu()
  router.push('/signin')
}

const handleClickOutside = (event: MouseEvent) => {
  if (menuRef.value && !menuRef.value.contains(event.target as Node)) {
    closeMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div ref="menuRef" class="user-menu">
    <button 
      class="user-btn" 
      :class="{ 'is-active': isOpen }"
      @click="toggleMenu"
      aria-label="User menu"
      aria-haspopup="true"
      :aria-expanded="isOpen"
    >
      <User class="icon" />
    </button>

    <Transition name="menu">
      <div v-if="isOpen" class="menu-dropdown">
        <div class="menu-content">
          <button class="menu-item logout" @click="handleLogout">
            <Logout class="menu-icon" />
            <span>Log out</span>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.user-menu {
  position: relative;
}

.user-btn {
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

  &:hover,
  &.is-active {
    background: var(--bg-secondary);
  }

  .icon {
    width: 20px;
    height: 20px;
    color: var(--text-primary);
  }
}

.menu-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 180px;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.2), 
              0 4px 6px -2px rgba(0, 0, 0, 0.05);
  z-index: 1000;
  overflow: hidden;
}

:root.dark .menu-dropdown {
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.5), 
              0 4px 6px -2px rgba(0, 0, 0, 0.3);
}

.menu-content {
  padding: 6px;
}

.menu-item {
  width: 100%;
  padding: 10px 12px;
  font-size: 14px;
  color: var(--text-primary);
  background: none;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s ease;
  font-family: inherit;
  display: flex;
  align-items: center;
  gap: 10px;
  text-align: left;

  &:hover {
    background: var(--bg-secondary);
  }

  .menu-icon {
    width: 18px;
    height: 18px;
    color: var(--text-tertiary);
    flex-shrink: 0;
  }
}

.menu-item.logout {
  &:hover {
    background: color-mix(in srgb, var(--error-color) 10%, transparent);
    color: var(--error-color);

    .menu-icon {
      color: var(--error-color);
    }
  }
}

/* Menu transition */
.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.95);
}

.menu-enter-to,
.menu-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
</style>
