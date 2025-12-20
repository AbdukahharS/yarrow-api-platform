<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

import User from '../assets/icons/user.svg?component'
import Logout from '../assets/icons/logout.svg?component'
import CreditCard from '../assets/icons/credit-card.svg?component'

const { logout, getCurrentUser } = useAuth()
const router = useRouter()

const isOpen = ref(false)
const menuRef = ref<HTMLElement | null>(null)

const currentUser = computed(() => getCurrentUser())

const truncatedEmail = computed(() => {
  const email = currentUser.value?.email || ''
  if (email.length <= 32) return email
  const [local, domain] = email.split('@')
  if (!domain) return email.slice(0, 21) + '...'
  const maxLocal = 32 - domain.length - 4 // 4 for "...@"
  if (maxLocal < 3) return email.slice(0, 21) + '...'
  return local.slice(0, maxLocal) + '...@' + domain
})

const formattedBalance = computed(() => {
  const balance = currentUser.value?.balance ?? 30.5
  return '$' + balance.toFixed(2)
})

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
          <!-- User Info Section -->
          <div class="user-info">
            <div class="company-name">
              {{ currentUser?.company || 'Company' }}
            </div>
            <div class="user-email" :title="currentUser?.email">
              {{ truncatedEmail }}
            </div>
            <div class="user-details">
              <span
                class="plan-badge"
                :class="currentUser?.plan?.toLowerCase()"
              >
                {{ currentUser?.plan || 'Pro' }}
              </span>
              <span class="balance">
                <CreditCard class="balance-icon" />
                {{ formattedBalance }}
              </span>
            </div>
          </div>

          <div class="menu-divider"></div>

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
  transform: translateX(25%);
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 240px;
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

/* User Info Section */
.user-info {
  padding: 12px;

  .company-name {
    font-size: 14px;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 2px;
  }

  .user-email {
    font-size: 12px;
    color: var(--text-tertiary);
    margin-bottom: 12px;
  }

  .user-details {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }

  .plan-badge {
    font-size: 11px;
    font-weight: 600;
    padding: 3px 8px;
    border-radius: 6px;
    text-transform: uppercase;
    letter-spacing: 0.3px;

    &.starter {
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      color: white;
    }

    &.pro {
      background: linear-gradient(135deg, #ff6900 0%, #ff8533 100%);
      color: white;
    }

    &.enterprise {
      background: linear-gradient(135deg, #0f172a 0%, #334155 100%);
      color: white;
    }

    &.free {
      background: var(--bg-secondary);
      color: var(--text-secondary);
    }
  }

  .balance {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 12px;
    color: var(--text-secondary);

    .balance-icon {
      width: 14px;
      height: 14px;
      color: var(--text-tertiary);
    }
  }
}

.menu-divider {
  height: 1px;
  background: var(--border-color);
  margin: 4px 6px;
}
/* Menu transition */
.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.95) translateX(25%);
}

.menu-enter-to,
.menu-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1) translateX(25%);
}
</style>
